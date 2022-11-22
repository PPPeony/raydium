import {
  AmmV3,
  AmmV3PoolInfo,
  AmmV3PoolPersonalPosition,
  ApiAmmV3PoolInfo,
  Currency,
  CurrencyAmount,
  LiquidityPoolsJsonFile,
  PublicKeyish,
  ReturnTypeFetchMultiplePoolTickArrays,
  ReturnTypeGetAllRouteComputeAmountOut,
  Token,
  TokenAmount,
  TradeV2,
} from '@raydium-io/raydium-sdk';
import { Connection, PublicKey } from '@solana/web3.js';
import { toPercent } from './utils';

type SimulatePoolCacheType = Promise<
  Awaited<ReturnType<typeof TradeV2['fetchMultipleInfo']>> | undefined
>;

type TickCache = Promise<ReturnTypeFetchMultiplePoolTickArrays | undefined>;

// TODO: timeout-map
const sdkCaches: Map<
  string,
  {
    routes: ReturnType<typeof TradeV2['getAllRoute']>;
    tickCache: TickCache;
    poolInfosCache: SimulatePoolCacheType;
  }
> = new Map();

const parsedAmmV3PoolInfoCache = new Map<
  string,
  {
    state: AmmV3PoolInfo;
    positionAccount?: AmmV3PoolPersonalPosition[] | undefined;
  }
>();

async function getParsedAmmV3PoolInfo({
  connection,
  apiAmmPools,
  chainTimeOffset = 0,
}: {
  connection: Connection;
  apiAmmPools: ApiAmmV3PoolInfo[];
  chainTimeOffset?: number;
}) {
  const needRefetchApiAmmPools = apiAmmPools.filter(
    ({ id }) => !parsedAmmV3PoolInfoCache.has(toPubString(id)),
  );

  if (needRefetchApiAmmPools.length) {
    const sdkParsed = await AmmV3.fetchMultiplePoolInfos({
      poolKeys: needRefetchApiAmmPools,
      connection,
      batchRequest: true,
      chainTime: (Date.now() + chainTimeOffset) / 1000,
    });
    Object.values(sdkParsed).forEach((sdk) => {
      parsedAmmV3PoolInfoCache.set(toPubString(sdk.state.id), sdk);
    });
  }

  const apiAmmPoolsArray = apiAmmPools.map(
    ({ id }) => parsedAmmV3PoolInfoCache.get(toPubString(id))!,
  );
  const map = listToMap(apiAmmPoolsArray, (i) => toPubString(i.state.id));
  return map;
}

function getSDKCacheInfos({
  connection,
  inputMint,
  outputMint,

  apiPoolList,
  sdkParsedAmmV3PoolInfo,
}: {
  connection: Connection;
  inputMint: PublicKey;
  outputMint: PublicKey;

  apiPoolList: LiquidityPoolsJsonFile;
  sdkParsedAmmV3PoolInfo: Awaited<
    ReturnType<typeof AmmV3['fetchMultiplePoolInfos']>
  >;
}) {
  const key = toPubString(inputMint) + toPubString(outputMint);
  if (!sdkCaches.has(key)) {
    const routes = TradeV2.getAllRoute({
      inputMint,
      outputMint,
      apiPoolList: apiPoolList,
      ammV3List: Object.values(sdkParsedAmmV3PoolInfo).map((i) => i.state),
    });
    const tickCache = AmmV3.fetchMultiplePoolTickArrays({
      connection,
      poolKeys: routes.needTickArray,
      batchRequest: true,
    }).catch((err) => {
      sdkCaches.delete(key);
      return undefined;
    });
    const poolInfosCache = TradeV2.fetchMultipleInfo({
      connection,
      pools: routes.needSimulate,
      batchRequest: true,
    }).catch((err) => {
      sdkCaches.delete(key);
      return undefined;
    });

    sdkCaches.set(key, { routes, tickCache, poolInfosCache });
  }
  return sdkCaches.get(key)!;
}

function toPubString(mint: PublicKeyish | undefined): string {
  if (!mint) return '';
  if (typeof mint === 'string') return mint;
  return mint.toBase58();
}

function getBestCalcResult(
  routeList: ReturnTypeGetAllRouteComputeAmountOut,
): ReturnTypeGetAllRouteComputeAmountOut[number] | undefined {
  if (!routeList.length) return undefined;
  const isReadyRoutes = routeList.filter((i) => i.poolReady);
  if (!isReadyRoutes.length) return routeList[0];
  return isReadyRoutes[0];
}

const listToMap = <T, S extends string, V = T>(
  source: T[],
  getKey: (item: T, index: number) => S,
  getValue?: (item: T, index: number) => V,
): Record<S, V> => {
  // @ts-expect-error force
  return Object.fromEntries(
    source.map((item, idx) => [
      getKey(item, idx),
      getValue ? getValue(item, idx) : item,
    ]),
  );
};

export async function getAllSwapRouteInfos(
  poolInfo,
  {
    connection,
    slippageTolerance,
    input,
    output,
    inputAmount,
  }: {
    connection: Connection;
    slippageTolerance?: number;
    input: Token;
    output: Token;
    inputAmount: number;
  },
) {
  const { ammV3, liquidity: apiPoolList } = poolInfo;

  const chainTime = Date.now() / 1000;

  const sdkParsedAmmV3PoolInfo = await getParsedAmmV3PoolInfo({
    connection,
    apiAmmPools: ammV3,
  });
  const { routes, poolInfosCache, tickCache } = getSDKCacheInfos({
    connection,
    inputMint: input.mint,
    outputMint: output.mint,
    apiPoolList: apiPoolList as any,
    sdkParsedAmmV3PoolInfo: sdkParsedAmmV3PoolInfo,
  });
  const awaitedSimulateCache = await poolInfosCache;
  const awaitedTickCache = await tickCache;
  const inputTokenAmount: TokenAmount | CurrencyAmount =
    input.symbol === 'sol'
      ? new CurrencyAmount(
          new Currency(input.decimals, input.symbol),
          inputAmount,
          false,
        )
      : new TokenAmount(input, inputAmount, false);
  let outputToken: Token | Currency = output;

  if (output.symbol === 'sol') {
    outputToken = new Currency(output.decimals, output.symbol);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    outputToken.mint = Token.WSOL.mint;
  }
  const routeList = await TradeV2.getAllRouteComputeAmountOut({
    directPath: routes.directPath,
    routePathDict: routes.routePathDict,
    simulateCache: awaitedSimulateCache!,
    tickCache: awaitedTickCache!,
    inputTokenAmount: inputTokenAmount,
    outputToken: outputToken,
    slippage: toPercent(slippageTolerance ?? 0),
    chainTime,
  });
  return { routeList, bestResult: getBestCalcResult(routeList) };
}

import { getTargetPool, ITask } from '@/pages/reconciler/model';
import {
  Currency,
  jsonInfo2PoolKeys,
  Liquidity,
  LiquidityPoolInfo,
  LiquidityPoolKeysV4,
  Token,
  TokenAmount,
} from '@raydium-io/raydium-sdk';
import { Connection, PublicKey } from '@solana/web3.js';

import { getWalletTokenAccounts, toPercent } from './utils';

export const calculateAmount = (
  poolJson,
  poolInfo: LiquidityPoolInfo,
  inputAmount: TokenAmount,
  anotherCurrency: Currency | Token,
  slippage?: number,
) => {
  const { maxAnotherAmount, anotherAmount } = Liquidity.computeAnotherAmount({
    poolKeys: jsonInfo2PoolKeys<LiquidityPoolKeysV4>(poolJson),
    poolInfo,
    amount: inputAmount,
    anotherCurrency,
    slippage: toPercent(slippage || 0.005),
  });

  return { maxAnotherAmount, anotherAmount };
};

export const getPoolInfo = async (connection: Connection, poolJson) => {
  const poolInfo = await Liquidity.fetchInfo({
    connection,
    poolKeys: jsonInfo2PoolKeys<LiquidityPoolKeysV4>(poolJson),
  });
  return poolInfo;
};

export const addLiquidity = async (
  connection: Connection,
  owner: PublicKey,
  task: ITask,
  // poolInfo: LiquidityPoolInfo,
) => {
  const poolKeys = jsonInfo2PoolKeys(
    getTargetPool(task.baseToken.mint, task.quoteToken.mint),
  );
  // const sdkParsedInfo = {
  //   jsonInfo: getTargetPool(task.baseToken.mint, task.quoteToken.mint),
  //   ...poolKeys,
  //   ...poolInfo,
  // };
  const inputToken = new Token(
    task.baseToken.mint,
    task.baseToken.decimals,
    task.baseToken.symbol,
  );
  const outputToken = new Token(
    task.quoteToken.mint,
    task.quoteToken.decimals,
    task.quoteToken.symbol,
  );
  const inputAmount = new TokenAmount(inputToken, task.base_amount!, false);
  const anotherAmount = new TokenAmount(outputToken, task.quote_amount!, false);
  // const { maxAnotherAmount, anotherAmount } = Liquidity.computeAnotherAmount({
  //   poolKeys: poolKeys as any,
  //   poolInfo: sdkParsedInfo,
  //   amount: inputAmount,
  //   anotherCurrency: outputToken,
  //   slippage: toPercent(task.slippage_tolerance || 0.005),
  // });
  // console.log('maxAnotherAmount', maxAnotherAmount.toSignificant());
  // console.log('anotherAmount', anotherAmount.toSignificant());

  const { accounts, rawInfos } = await getWalletTokenAccounts({
    connection,
    owner,
  });
  // perform transaction
  const { transaction, signers } = await Liquidity.makeAddLiquidityTransaction({
    connection,
    poolKeys: poolKeys as any,
    userKeys: { tokenAccounts: rawInfos, owner },
    amountInA: inputAmount,
    amountInB: anotherAmount,
    fixedSide: 'a',
  });
  return { transaction, signers };
};

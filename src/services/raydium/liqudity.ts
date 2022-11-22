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
  amountInA: TokenAmount,
  amountInB: TokenAmount,
  poolJson,
) => {
  const { accounts, rawInfos } = await getWalletTokenAccounts({
    connection,
    owner,
  });

  // perform transaction
  const { transaction, signers } = await Liquidity.makeAddLiquidityTransaction({
    connection,
    poolKeys: jsonInfo2PoolKeys<LiquidityPoolKeysV4>(poolJson),
    userKeys: { tokenAccounts: rawInfos, owner },
    amountInA,
    amountInB,
    fixedSide: 'a',
  });
  return { transaction, signers };
};

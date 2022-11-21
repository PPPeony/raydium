import {
  jsonInfo2PoolKeys,
  Liquidity,
  LiquidityPoolKeysV4,
} from '@raydium-io/raydium-sdk';
import { Connection } from '@solana/web3.js';

export const getRemotePoolInfo = async (connection: Connection, poolJson) => {
  const poolInfo = await Liquidity.fetchInfo({
    connection,
    poolKeys: jsonInfo2PoolKeys<LiquidityPoolKeysV4>(poolJson),
  });
  return poolInfo;
};

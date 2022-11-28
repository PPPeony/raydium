import {
  ReturnTypeGetAllRouteComputeAmountOut,
  Token,
  TradeV2,
} from '@raydium-io/raydium-sdk';
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import BN from 'bn.js';
import { getAllSwapRouteInfos } from './route';
import { getWalletTokenAccounts } from './utils';

import { getTargetPool, ITask } from '../../pages/reconciler/model';

export interface ITokenAccount {
  publicKey?: PublicKey;
  mint?: PublicKey;
  isAssociated?: boolean;
  amount: BN;
  isNative: boolean;
}

export const swap = async (
  connection: Connection,
  owner: PublicKey,
  task: ITask,
  poolRouteInfo,
) => {
  const { bestResult } = await getAllSwapRouteInfos(poolRouteInfo, {
    connection,
    input: new Token(
      task.baseToken.mint,
      task.baseToken.decimals,
      task.baseToken.symbol,
    ),
    inputAmount: task.base_amount!,
    output: new Token(
      task.quoteToken.mint,
      task.quoteToken.decimals,
      task.quoteToken.symbol,
    ),
    slippageTolerance: task.slippage_tolerance || 0.005,
  });
  const { rawInfos } = await getWalletTokenAccounts({
    connection,
    owner: owner,
  });
  const { transactions, address } = await TradeV2.makeSwapTranscation({
    connection,
    swapInfo: bestResult!,
    ownerInfo: {
      wallet: owner,
      tokenAccounts: rawInfos,
      associatedOnly: true,
    },
    checkTransaction: true,
  });
  return transactions;
};

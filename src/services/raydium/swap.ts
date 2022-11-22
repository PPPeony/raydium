import {
  ReturnTypeGetAllRouteComputeAmountOut,
  TradeV2,
} from '@raydium-io/raydium-sdk';
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import BN from 'bn.js';
import { getWalletTokenAccounts } from './utils';

export interface ITokenAccount {
  publicKey?: PublicKey;
  mint?: PublicKey;
  isAssociated?: boolean;
  amount: BN;
  isNative: boolean;
}

export const swap = async (
  connection: Connection,
  owner: Keypair,
  swapInfo: ReturnTypeGetAllRouteComputeAmountOut[number],
) => {
  const { rawInfos } = await getWalletTokenAccounts({
    connection,
    owner: owner.publicKey,
  });
  const { transactions, address } = await TradeV2.makeSwapTranscation({
    connection,
    swapInfo,
    ownerInfo: {
      wallet: owner.publicKey,
      tokenAccounts: rawInfos,
      associatedOnly: true,
    },
    checkTransaction: true,
  });
  return transactions;
};

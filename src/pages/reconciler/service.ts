import * as liquidityServices from '@/services/raydium/liquidity';
import * as swapServices from '@/services/raydium/swap';
import { signAllTransactions } from '@/services/solana';
import { LiquidityPoolInfo } from '@raydium-io/raydium-sdk';
import { WalletContextState } from '@solana/wallet-adapter-react';
import {
  Connection,
  Keypair,
  PublicKey,
  Signer,
  Transaction,
} from '@solana/web3.js';
import { message } from 'antd';
import { getPoolRootInfo, ITask } from './model';
export const reconciler = async (
  connection: Connection,
  wallet: WalletContextState,
  owner: PublicKey,
  taskList: ITask[],
) => {
  const list: {
    transaction: Transaction;
    signer: (Keypair | Signer)[];
  }[] = [];
  for (const obj of taskList) {
    switch (obj.action) {
      case 'swap':
        const txAndSigner = await swapServices.swap(
          connection,
          owner,
          obj,
          getPoolRootInfo(obj.baseToken.mint, obj.quoteToken.mint),
        );
        list.push(...txAndSigner);
        break;
      case 'add_liquidity':
        const { transaction, signers: signer } =
          await liquidityServices.addLiquidity(connection, owner, obj);
        list.push({ transaction, signer });
        break;
    }
  }

  const { list: particalSignedList, lastBlockInfo } = await signAllTransactions(
    connection,
    list.filter((item) => !!item),
  );

  const signedTransactions = await wallet.signAllTransactions?.(
    particalSignedList.map((item) => {
      item.feePayer = owner;
      return item;
    }),
  );

  // comfirm all the txs
  for (let i = 0, length = signedTransactions!.length; i < length; i++) {
    const transaction = signedTransactions![i];
    console.log(`(${i + 1}/${length}): tx before send`);
    message.info(`(${i + 1}/${length}): tx before send`, 1000);
    const txStr = await connection.sendRawTransaction(transaction.serialize());
    console.log(`(${i + 1}/${length}): tx sended = ${txStr}`);
    message.success(`(${i + 1}/${length}): tx sended = ${txStr}`, 1000);
    await connection.confirmTransaction(txStr);
    console.log(`(${i + 1}/${length}): tx succeeded = ${txStr}`);
    message.success(`(${i + 1}/${length}): tx confirmed = ${txStr}`, 1000);
  }
};

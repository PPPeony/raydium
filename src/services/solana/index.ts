import {
  Connection,
  Keypair,
  PublicKey,
  Signer,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js';

export const signAllTransactions = async (
  connection: Connection,
  list: { transaction: Transaction; signer: (Keypair | Signer)[] }[],
) => {
  const allInstructions: TransactionInstruction[] = [];
  const allSigners: Signer[] = [];
  list.forEach((item) => {
    allInstructions.push(...item.transaction.instructions);
    item.signer.forEach((signer) => {
      if (
        allSigners.findIndex(
          (it) => it.publicKey.toBase58() === signer.publicKey.toBase58(),
        ) === -1
      ) {
        allSigners.push(signer);
      }
    });
  });

  const lastBlockInfo = await connection.getLatestBlockhash('confirmed');
  if (isTransactionSizeValid(allInstructions)) {
    const transaction = new Transaction();
    transaction.add(...allInstructions);
    transaction.lastValidBlockHeight = lastBlockInfo.lastValidBlockHeight;
    transaction.recentBlockhash = lastBlockInfo.blockhash;
    if (allSigners.length) transaction.partialSign(...allSigners);
    return {
      list: [transaction],
      lastBlockInfo,
    };
  } else {
    const transactions = list.map(({ transaction, signer }) => {
      transaction.lastValidBlockHeight = lastBlockInfo.lastValidBlockHeight;
      transaction.recentBlockhash = lastBlockInfo.blockhash;
      if (signer.length) transaction.partialSign(...signer);
      return transaction;
    });
    return {
      list: transactions,
      lastBlockInfo,
    };
  }
};

function isTransactionSizeValid(instructions: TransactionInstruction[]) {
  if (instructions.length < 1) {
    throw new Error('no instructions provided');
  }

  const transaction = new Transaction({
    recentBlockhash: '11111111111111111111111111111111',
    feePayer: new Keypair().publicKey,
  });

  transaction.add(...instructions);

  try {
    transaction.serialize({ verifySignatures: false });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

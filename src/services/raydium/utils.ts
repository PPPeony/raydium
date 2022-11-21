import {
  Percent,
  Spl,
  SPL_ACCOUNT_LAYOUT,
  TokenAccount as _TokenAccount,
  TOKEN_PROGRAM_ID,
} from '@raydium-io/raydium-sdk';
import * as Web3 from '@solana/web3.js';
import BN from 'bn.js';

export interface ITokenAccount {
  publicKey?: Web3.PublicKey;
  mint?: Web3.PublicKey;
  isAssociated?: boolean;
  amount: BN;
  isNative: boolean;
}

export type TokenAccountRawInfo = _TokenAccount;

export const getWalletTokenAccounts = async ({
  connection,
  owner,
  config,
}: {
  connection: Web3.Connection;
  owner: Web3.PublicKey;
  config?: Web3.GetTokenAccountsByOwnerConfig;
}): Promise<{
  accounts: ITokenAccount[];
  rawInfos: TokenAccountRawInfo[];
}> => {
  const defaultConfig = {};
  const customConfig = { ...defaultConfig, ...config };

  const solReq = connection.getAccountInfo(owner, customConfig.commitment);
  const tokenReq = connection.getTokenAccountsByOwner(
    owner,
    { programId: TOKEN_PROGRAM_ID },
    customConfig.commitment,
  );

  const [solResp, tokenResp] = await Promise.all([solReq, tokenReq]);

  const accounts: ITokenAccount[] = [];
  const rawInfos: TokenAccountRawInfo[] = [];

  for (const { pubkey, account } of tokenResp.value) {
    // double check layout length
    if (account.data.length !== SPL_ACCOUNT_LAYOUT.span) {
      console.error(
        'invalid token account layout length',
        'publicKey',
        pubkey.toBase58(),
      );
    }

    const rawResult = SPL_ACCOUNT_LAYOUT.decode(account.data);
    const { mint, amount } = rawResult;
    const associatedTokenAddress = await Spl.getAssociatedTokenAccount({
      mint,
      owner,
    });

    accounts.push({
      publicKey: pubkey,
      mint,
      isAssociated: associatedTokenAddress.equals(pubkey),
      amount,
      isNative: false,
    });
    rawInfos.push({ pubkey, accountInfo: rawResult });
  }

  if (solResp) {
    accounts.push({
      amount: new BN(solResp.lamports),
      isNative: true,
    });
  }

  return { accounts, rawInfos };
};

export const toPercent = (n: number, isPercentage = false) => {
  let numerator;
  let denominator;

  if (n % 1) {
    const [arr0, arr1] = String(n).split('.');
    denominator = Math.pow(10, arr1.length);
    numerator = Number(arr0) * denominator + Number(`0.${arr1}`) * denominator;
  } else {
    numerator = n;
    denominator = 1;
  }
  return new Percent(
    new BN(numerator),
    new BN(denominator).mul(isPercentage ? new BN(100) : new BN(1)),
  );
};

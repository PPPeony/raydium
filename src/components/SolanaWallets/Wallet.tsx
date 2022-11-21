import { useDispatch } from 'dva';

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

import { NAME_SPACE as GLOBAL_NAME_SPACE } from '@/models/global';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

// import '@solana/wallet-adapter-react-ui/styles.css';
import { useEffect } from 'react';
const WalletButton = () => {
  const dispatch = useDispatch();
  const wallet = useWallet();
  const { connection } = useConnection();
  useEffect(() => {
    dispatch({
      type: `${GLOBAL_NAME_SPACE}/changeWallet`,
      payload: { connection, wallet },
    });
  }, [wallet.connected]);

  return (
    // <WalletModalProvider>
    <WalletMultiButton />
    // </WalletModalProvider>
  );
};

export default WalletButton;

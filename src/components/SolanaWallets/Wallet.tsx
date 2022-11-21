import { useDispatch } from 'dva';

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

import { useWallet } from '@solana/wallet-adapter-react';

// import '@solana/wallet-adapter-react-ui/styles.css';
import { useEffect } from 'react';
const WalletButton = () => {
  const dispatch = useDispatch();
  const wallet = useWallet();
  useEffect(() => {
    dispatch({
      type: 'global_state/setWallet',
      payload: wallet,
    });
  }, []);

  return (
    // <WalletModalProvider>
    <WalletMultiButton />
    // </WalletModalProvider>
  );
};

export default WalletButton;

import {useDispatch } from 'dva'

import {
  WalletModalProvider,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';

import { useWallet } from '@solana/wallet-adapter-react';

import '@solana/wallet-adapter-react-ui/styles.css';
import { useCallback, useEffect } from 'react';


export default () => {
  const dispatch = useDispatch()

  const wallet = useWallet();
  useEffect(()=>{
    dispatch({
      type: 'global_state/setWallet',
      payload: wallet
    })
  }, [wallet])

  return (<WalletModalProvider>
  <WalletMultiButton/>
</WalletModalProvider>)
}

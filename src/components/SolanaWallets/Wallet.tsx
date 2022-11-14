
import {
  WalletModalProvider,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';

import '@solana/wallet-adapter-react-ui/styles.css'


export default ()=>( 

<WalletModalProvider>
  <WalletMultiButton />
</WalletModalProvider>
)
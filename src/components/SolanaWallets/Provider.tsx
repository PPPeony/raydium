import React, { ReactNode, useCallback, useMemo } from 'react'

import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import {
  BackpackWalletAdapter, BitKeepWalletAdapter, BitpieWalletAdapter, BraveWalletAdapter, CloverWalletAdapter,
  Coin98WalletAdapter, CoinbaseWalletAdapter, CoinhubWalletAdapter, ExodusWalletAdapter, GlowWalletAdapter,
  LedgerWalletAdapter, MathWalletAdapter, PhantomWalletAdapter, SafePalWalletAdapter, SlopeWalletAdapter,
  SolflareWalletAdapter, SolletExtensionWalletAdapter, SolletWalletAdapter, SolongWalletAdapter,
  TokenPocketWalletAdapter, TorusWalletAdapter, TrustWalletAdapter, WalletConnectWalletAdapter
} from '@solana/wallet-adapter-wallets'
import { clusterApiUrl } from '@solana/web3.js'

export default function SolanaWalletProviders({ children }: { children?: ReactNode }) {

  const endpoint = useMemo(() => clusterApiUrl('devnet'), [])
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new TrustWalletAdapter(),
      new SolflareWalletAdapter(),
      new SolletWalletAdapter(),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
      new SolletExtensionWalletAdapter(),
      new MathWalletAdapter({ endpoint }),
      new TokenPocketWalletAdapter(),
      new CoinbaseWalletAdapter({ endpoint }),
      new SolongWalletAdapter({ endpoint }),
      new Coin98WalletAdapter({ endpoint }),
      new SafePalWalletAdapter({ endpoint }),
      new SlopeWalletAdapter({ endpoint }),
      new BitpieWalletAdapter({ endpoint }),
      new GlowWalletAdapter(),
      new BitKeepWalletAdapter({ endpoint }),
      new ExodusWalletAdapter({ endpoint }),
      new CloverWalletAdapter(),
      new CoinhubWalletAdapter(),
      new BackpackWalletAdapter(),
      new WalletConnectWalletAdapter({
        network: WalletAdapterNetwork.Mainnet, // const only, cannot use condition to use dev/main, guess is relative to walletconnect connection init
        options: {
          projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PJ_ID,
          metadata: {
            name: 'Raydium',
            description: 'Raydium',
            url: 'https://raydium.io/',
            icons: ['https://raydium.io/logo/logo-only-icon.svg']
          }
        }
      }),
      new BraveWalletAdapter()
    ],
    [endpoint]
  )

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect={true}>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  )
}
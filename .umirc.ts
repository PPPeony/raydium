import { defineConfig } from '@umijs/max';
import { clusterApiUrl } from '@solana/web3.js'

export default defineConfig({
  npmClient: 'npm',
  routes: [
    {
      path: '/', redirect: '/liquidity'
    },
    {
      path: '/liquidity',
      component: '@/pages/liquidity'
    },
    {
      path: '/reconciler',
      component: '@/pages/reconciler'
    },
    {
      path: '/swap',
    },
    {
      path: '/concentrated',
    },
    {
      path: '/pools',
    },
    {
      path: '/farms',
    },
    {
      path: '/staking',
    },
    {
      path: '/acceleraytor',
    },
  ],
  dva: {},
  antd: {
    import: false
  },
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: false,
  define: {
    $$SOLANA_RPC: process.env.SOLANA_RPC || clusterApiUrl('mainnet-beta')
  }
});

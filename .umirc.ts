import { defineConfig } from '@umijs/max';

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
  dva:{},
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: false,
});

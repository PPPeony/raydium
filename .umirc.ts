import { defineConfig } from '@umijs/max';

export default defineConfig({
  npmClient: 'npm',
  routes: [
    {
      path: '/', redirect: '/liquidity'
    },
    { 
      path: '/liquidity', 
      component: '@/pages/liqudity' 
    },
  ],
  dva:{},
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: false,

  autoCSSModules: true,
});

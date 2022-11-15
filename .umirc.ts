import { defineConfig } from '@umijs/max';

export default defineConfig({
  npmClient: 'npm',
  routes: [
    {
      path: '/',
      component: 'index',
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

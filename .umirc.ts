import path from 'path';
import {defineConfig} from '@umijs/max'


export default defineConfig({
  npmClient: 'npm',
  routes: [
    { 
      path: '/', component: 'index' ,
    },
  ],
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: false,

  autoCSSModules: true
});

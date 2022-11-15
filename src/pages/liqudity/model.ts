import { LiquidityPoolInfo } from '@raydium-io/raydium-sdk';
import * as services from './service';

interface ILiquidityState {
  poolInfo?: LiquidityPoolInfo;
}

const initialState: ILiquidityState = {};

export default {
  namespace: 'liquidity',
  state: initialState,
  reducers: {
    setPoolInfo(state: ILiquidityState, { payload }) {
      return { ...state, poolInfo: payload };
    },
  },
  effects: {
    *getPoolInfo(action, { put, call }) {
      const res = yield call(services.getPoolInfo);
      yield put({ type: 'setPoolInfo', payload: res });
    },
  },
};

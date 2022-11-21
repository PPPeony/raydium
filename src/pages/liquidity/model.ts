import { LiquidityPoolInfo, Token } from '@raydium-io/raydium-sdk';
import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';
import * as services from './service';

export interface ILiquidityState {
  poolInfo?: LiquidityPoolInfo & {
    rate: number;
    baseIcon: string;
    quoteIcon: string;
    baseToken: Token;
    quoteToken: Token;
  };
}

// mock properties from remote.
// todo: get below fields dynamic
const mockPoolInfo = {
  status: new BN(6),
  baseDecimals: 9,
  quoteDecimals: 6,
  lpDecimals: 9,
  baseReserve: new BN(14594941029357),
  quoteReserve: new BN(16994850344),
  lpSupply: new BN(22136850605115),
  startTime: new BN(1657721409),
};
const baseReserve =
  mockPoolInfo.baseReserve.toNumber() / 10 ** mockPoolInfo.baseDecimals;
const quoteReserve =
  mockPoolInfo.quoteReserve.toNumber() / 10 ** mockPoolInfo.quoteDecimals;
const mokeRate = quoteReserve / baseReserve;

const initialState: ILiquidityState = {
  poolInfo: {
    ...mockPoolInfo,
    // other properties
    rate: mokeRate,
    baseIcon: require('/src/assets/img/ray.png'),
    quoteIcon: require('/src/assets/img/ray.png'),
    baseToken: new Token(
      new PublicKey('AHT1yynTv45s3P3KrRfQCVMHckdHeMVA3fteEg34xt9y'),
      9,
      'AHT',
    ),
    quoteToken: new Token(
      new PublicKey('Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB'),
      6,
      'USDT',
    ),
  },
};

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

    *addLiquidity(action, { put, call }) {
      console.log(action);
      // const res = yield call(services.getPoolInfo);
      yield put({ type: 'setPoolInfo', payload: {} });
    },

    *swap(action, { put, call }) {
      console.log(action);
      // const res = yield call(services.getPoolInfo);
      yield put({ type: 'setPoolInfo', payload: {} });
    },
  },
};

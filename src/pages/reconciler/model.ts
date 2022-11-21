import { IBaseModelType, ModelState } from '@/models/connectModel';

import LiquidityPoolJSON from '@/constants/liquidityPools.json';
import TokenJSON from '@/constants/tokens.json';
import { LiquidityPoolInfo, Token } from '@raydium-io/raydium-sdk';

/** MARK - namespace */
export const NAME_SPACE = 'reconciler';

/** MARK - datasource */
export const LIQUIDITY_POOL_LIST = [
  ...LiquidityPoolJSON.official,
  ...LiquidityPoolJSON.unOfficial,
];
export const TOKEN_LIST = [...TokenJSON.official, ...TokenJSON.unOfficial];

/** MARK - model definition */
export type IToken = Token & { icon: string };

export interface IReconcilerState extends ModelState {
  poolInfo?: LiquidityPoolInfo & {
    rate: number;
    baseToken: IToken;
    quoteToken: IToken;
  };
}

/** MARK - defalut state */
const defaultState: IReconcilerState = {};

/** MARK -  reducers & effects */

const modelConfig: IBaseModelType<IReconcilerState> = {
  namespace: 'reconciler',
  state: defaultState,
  reducers: {
    setPoolInfo(state, { payload }) {
      return { ...state, poolInfo: payload };
    },
  },
  effects: {
    *getPoolInfo({ opt }, { put, call }) {
      // const res = yield call(services.getPoolInfo);
      // yield put({ type: 'setPoolInfo', payload: res });
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

export default modelConfig;

// const mockPoolInfo = {
//   status: new BN(6),
//   baseDecimals: 9,
//   quoteDecimals: 6,
//   lpDecimals: 9,
//   baseReserve: new BN(14594941029357),
//   quoteReserve: new BN(16994850344),
//   lpSupply: new BN(22136850605115),
//   startTime: new BN(1657721409),
// };
// const baseReserve =
//   mockPoolInfo.baseReserve.toNumber() / 10 ** mockPoolInfo.baseDecimals;
// const quoteReserve =
//   mockPoolInfo.quoteReserve.toNumber() / 10 ** mockPoolInfo.quoteDecimals;
// const mokeRate = quoteReserve / baseReserve;

/**
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

 */

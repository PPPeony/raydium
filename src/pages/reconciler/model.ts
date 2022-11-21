import { IBaseModelType, ModelState } from '@/models/connectModel.d';

import LiquidityPoolJSON from '@/constants/liquidityPools.json';
import TokenJSON from '@/constants/tokens.json';
import { IGlobalState } from '@/models/global';

import { message } from 'antd';
import * as services from './service';

/** MARK - namespace */
export const NAME_SPACE = 'reconciler';

/** MARK - model definition */

import type { LiquidityPoolInfo } from '@raydium-io/raydium-sdk';
import BN from 'bn.js';

export type IToken = {
  symbol: string;
  name: string;
  mint: string;
  decimals: number;
  extensions: any;
  icon: string;
};

export type IPoolInfo = LiquidityPoolInfo & {
  baseToken: IToken;
  quoteToken: IToken;
  rate: BN;
};

export type IFilterInfo = {
  base?: string;
  quote?: string;
};
export interface IReconcilerState extends ModelState {
  filterInfo?: IFilterInfo;
  poolInfo?: IPoolInfo;
}

/** MARK - datasource */
export const LIQUIDITY_POOL_LIST = [
  ...LiquidityPoolJSON.official,
  ...LiquidityPoolJSON.unOfficial,
];
export const TOKEN_LIST: IToken[] = [
  ...TokenJSON.official,
  ...TokenJSON.unOfficial,
];

/** MARK - defalut state */
const defaultState: IReconcilerState = {
  filterInfo: {
    // default liquidity pair (AHT-USDT)
    base: 'AHT1yynTv45s3P3KrRfQCVMHckdHeMVA3fteEg34xt9y',
    quote: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
  },
};

/** MARK - some useful funcitons */

const combineMint = (mint1: string, mint2: string) => {
  if (mint1 < mint2) {
    return `${mint1}_${mint2}`;
  }
  return `${mint2}_${mint1}`;
};

/** MARK -  reducers & effects */

const modelConfig: IBaseModelType<IReconcilerState> = {
  namespace: NAME_SPACE,
  state: defaultState,
  reducers: {
    setFilterInfo(state, { payload }) {
      return { ...state, filterInfo: payload };
    },
    setPoolInfo(state, { payload }) {
      return { ...state, poolInfo: payload };
    },
  },
  effects: {
    *getPoolInfo({ opt }, { put, call, select }) {
      if (opt.base && opt.quote) {
        // 1. find target pool
        const poolJSON = LIQUIDITY_POOL_LIST.find(
          (item) =>
            combineMint(item.baseMint, item.quoteMint) ===
            combineMint(opt.base, opt.quote),
        );
        // no pool found
        if (!poolJSON) {
          message.warning('No pool found!');
          return;
        }
        // 2. get remote pool info
        const connection = yield select((state: { global: IGlobalState }) => {
          return state.global.connection;
        });
        if (!connection) {
          message.error('connection is not available');
          return;
        }
        const remotePoolInfo = yield call(
          services.getRemotePoolInfo,
          connection,
          poolJSON,
        );

        // 3. construct token info
        const baseToken = TOKEN_LIST.find((item) => item.mint === opt.base);
        const quoteToken = TOKEN_LIST.find((item) => item.mint === opt.quote);
        yield put({
          type: 'setPoolInfo',
          payload: {
            ...remotePoolInfo,
            baseToken,
            quoteToken,
            rate: remotePoolInfo.quoteReserve
              .muln(remotePoolInfo.baseDecimals)
              .div(
                remotePoolInfo.baseReserve.muln(remotePoolInfo.quoteDecimals),
              ),
          },
        });
      }
      yield put({ type: 'setFilterInfo', payload: opt });
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

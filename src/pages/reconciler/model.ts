import { IBaseModelType, ModelState } from '@/models/connectModel.d';

import LiquidityPoolJSON from '@/constants/liquidityPools.json';
import TokenJSON from '@/constants/tokens.json';
import { IGlobalState } from '@/models/global';
import * as liquidityServices from '@/services/raydium/liquidity';
import { message } from 'antd';
import { reconciler } from './service';

/** MARK - namespace */
export const NAME_SPACE = 'reconciler';

/** MARK - model definition */

import type { LiquidityPoolInfo } from '@raydium-io/raydium-sdk';

export type IToken = {
  symbol: string;
  name: string;
  mint: string;
  decimals: number;
  extensions: any;
  icon: string;
};

export interface ITask {
  action?: string;
  // base token
  baseToken: IToken;
  base_reserve_before: number;
  base_amount?: number;
  base_reserve_after?: number;

  // quote token
  quoteToken: IToken;
  quote_reserve_before: number;
  quote_amount?: number;
  quote_reserve_after?: number;

  rate_before: number;
  rate_after?: number;

  slippage_tolerance?: number;
}

export type IPoolInfo = LiquidityPoolInfo & {
  baseReserve: number;
  quoteReserve: number;
  baseToken: IToken;
  quoteToken: IToken;
  rate: number;
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

export const ACTION_LIST = [
  {
    label: 'Swap',
    value: 'swap',
  },
  {
    label: 'Add Liquidity',
    value: 'add_liquidity',
  },
  {
    label: 'Remove Liquidity',
    value: 'remove_liquidity',
  },
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
export const getPoolRootInfo = (base: string, quote: string) => {
  return {
    ammV3: [],
    liquidity: {
      name: 'Raydium (simulated) Liquidity Pools',
      official: [],
      unOfficial: [getTargetPool(base, quote)],
    },
  };
};

const combineMint = (mint1: string, mint2: string) => {
  if (mint1 < mint2) {
    return `${mint1}_${mint2}`;
  }
  return `${mint2}_${mint1}`;
};

export const getTargetPool = (base: string, quote: string) => {
  return LIQUIDITY_POOL_LIST.find(
    (item) =>
      combineMint(item.baseMint, item.quoteMint) === combineMint(base, quote),
  );
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
        const poolJSON = getTargetPool(opt.base, opt.quote);
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
          liquidityServices.getPoolInfo,
          connection,
          poolJSON,
        );

        // 3. construct token info
        const baseToken = TOKEN_LIST.find((item) => item.mint === opt.base);
        const quoteToken = TOKEN_LIST.find((item) => item.mint === opt.quote);
        const quoteReserve =
          remotePoolInfo.quoteReserve.toNumber() /
          10 ** remotePoolInfo.quoteDecimals;
        const baseReserve =
          remotePoolInfo.baseReserve.toNumber() /
          10 ** remotePoolInfo.baseDecimals;
        const rate = quoteReserve / baseReserve;
        yield put({
          type: 'setPoolInfo',
          payload: {
            ...remotePoolInfo,
            baseReserve,
            quoteReserve,
            baseToken,
            quoteToken,
            rate,
          },
        });
      }
      yield put({ type: 'setFilterInfo', payload: opt });
    },

    *reconciler({ opt }, { put, call, select }) {
      const {
        global: { connection, wallet },
      } = yield select(
        (
          state: { global: IGlobalState } & { [NAME_SPACE]: IReconcilerState },
        ) => {
          return state;
        },
      );
      if (!connection) {
        message.error('connection is not available');
        return;
      }
      yield call(reconciler, connection, wallet, wallet.publicKey, opt);
    },
  },
};

export default modelConfig;

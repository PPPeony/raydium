import { IBaseModelType, ModelState } from '@/models/connectModel';

import { PublicKey } from '@solana/web3.js';

/** MARK - namespace */
export const NAME_SPACE = 'global';

/** MARK - model definition */
export interface IGlobalState extends ModelState {
  wallet?: PublicKey;
}

/** MARK - defalut state */
const defaultState: IGlobalState = {};

/** MARK -  reducers & effects */
const modelConfig: IBaseModelType<IGlobalState> = {
  namespace: NAME_SPACE,
  state: defaultState,
  reducers: {
    setWallet(state: IGlobalState, { payload }) {
      return { ...state, wallet: payload };
    },
  },
  effects: {
    *changeWallet({ payload }, { put, call }) {
      yield put({
        type: 'setWallet',
        payload,
      });
    },
  },
};

export default modelConfig;

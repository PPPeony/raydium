import { PublicKey } from '@solana/web3.js';

interface IGlobalState {
  wallet?: PublicKey;
}

const initialState: IGlobalState = {};

export default {
  namespace: 'global_state',
  state: initialState,
  reducers: {
    setWallet(state: IGlobalState, { payload }: any) {
      return { ...state, wallet: payload };
    },
  },
  effects: {},
};

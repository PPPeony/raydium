import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { Button, Spin } from 'antd';
import { shallowEqual, useDispatch, useSelector } from 'dva';
import { useCallback, useEffect, useState } from 'react';

import CurrencyDataTable from '@/components/CurrencyDataTable';

import { IDVAConnectState } from '@/models/connectModel';
import ReconcilerArea from './components/ReconcilerArea';
import TokenSelectArea from './components/TokenSelectArea';
import { IFilterInfo, IReconcilerState, NAME_SPACE } from './model';

export default function Reconciler() {
  const dispatch = useDispatch();
  const wallet = useWallet();
  const walletModal = useWalletModal();
  const { poolInfo, filterInfo, loading } = useSelector(
    (state: { [NAME_SPACE]: IReconcilerState } & IDVAConnectState) => {
      return {
        poolInfo: state[NAME_SPACE].poolInfo,
        filterInfo: state[NAME_SPACE].filterInfo,
        loading: Boolean(state.loading.effects[`${NAME_SPACE}/getPoolInfo`]),
      };
    },
    shallowEqual,
  );

  const handleSelectChange = useCallback((data: IFilterInfo) => {
    dispatch({
      type: `${NAME_SPACE}/getPoolInfo`,
      opt: data,
    });
  }, []);

  // init
  useEffect(() => {
    dispatch({
      type: `${NAME_SPACE}/getPoolInfo`,
      opt: filterInfo,
    });
  }, []);

  return (
    <Spin spinning={loading}>
      <TokenSelectArea onChange={handleSelectChange} data={filterInfo} />
      <CurrencyDataTable data={poolInfo} />
      <ReconcilerArea
        onSubmit={(queue) => {
          console.log(queue);
        }}
        data={poolInfo}
      />
    </Spin>
  );
}

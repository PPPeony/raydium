import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { Button, Spin } from 'antd';
import { shallowEqual, useDispatch, useSelector } from 'dva';
import { useCallback, useEffect, useState } from 'react';

import CurrencyDataTable from '@/components/CurrencyDataTable';

import { IDVAConnectState } from '@/models/connectModel';
import TokenSelectArea from './components/TokenSelectArea';
import { IFilterInfo, IReconcilerState, NAME_SPACE } from './model';

interface ICurrency {
  symbol?: string;
  icon?: string;
  amount?: number;
}

const useCurrency = (base: ICurrency, quote: ICurrency) => {
  const [baseState, setBaseState] = useState<ICurrency>({
    icon: base.icon,
    amount: base.amount,
    symbol: base.symbol,
  });
  const [quoteState, setQuoteState] = useState<ICurrency>({
    icon: quote.icon,
    amount: quote.amount,
    symbol: quote.symbol,
  });

  return {
    baseCurrencyState: baseState,
    quoteCurrencyState: quoteState,
    changeAmount: (baseAmount: number, quoteAmount: number) => {
      setBaseState({
        amount: baseAmount,
        symbol: baseState.symbol,
        icon: baseState.icon,
      });
      setQuoteState({
        amount: quoteAmount,
        symbol: quoteState.symbol,
        icon: quoteState.icon,
      });
    },
    resetAmount: () => {
      setBaseState({
        symbol: baseState.symbol,
        icon: baseState.icon,
      });
      setQuoteState({
        symbol: quoteState.symbol,
        icon: quoteState.icon,
      });
    },
  };
};

export default function Liquidity() {
  const dispatch = useDispatch();
  const wallet = useWallet();
  const walletModal = useWalletModal();
  const { poolInfo, filterInfo, loading } = useSelector(
    (state: { [NAME_SPACE]: IReconcilerState } & IDVAConnectState) => {
      return {
        poolInfo: state[NAME_SPACE].poolInfo,
        filterInfo: state[NAME_SPACE].filterInfo,
        loading: state.loading.effects[`${NAME_SPACE}/getPoolInfo`],
      };
    },
    shallowEqual,
  );

  // const { baseCurrencyState, quoteCurrencyState, changeAmount, resetAmount } =
  //   useCurrency(
  //     { symbol: poolInfo?.baseToken.symbol, icon: poolInfo?.baseIcon },
  //     { symbol: poolInfo?.quoteToken.symbol, icon: poolInfo?.quoteIcon },
  //   );
  const handleSelectChange = useCallback((data: IFilterInfo) => {
    dispatch({
      type: `${NAME_SPACE}/getPoolInfo`,
      opt: data,
    });
  }, []);

  // initi
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
      {wallet.connected ? (
        <Button type="primary">Reconciler</Button>
      ) : (
        <Button onClick={() => walletModal.setVisible(true)}>
          Connect Wallet
        </Button>
      )}
    </Spin>
  );
}

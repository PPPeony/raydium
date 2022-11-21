import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { shallowEqual, useDispatch, useSelector } from 'dva';
import { useEffect, useState } from 'react';

import TokenSelectModal from './components/TokenSelectModal';
import { ILiquidityState } from './model';

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
  const { poolInfo } = useSelector((state: { liquidity: ILiquidityState }) => {
    return state.liquidity;
  }, shallowEqual);

  // const { baseCurrencyState, quoteCurrencyState, changeAmount, resetAmount } =
  //   useCurrency(
  //     { symbol: poolInfo?.baseToken.symbol, icon: poolInfo?.baseIcon },
  //     { symbol: poolInfo?.quoteToken.symbol, icon: poolInfo?.quoteIcon },
  //   );
  useEffect(() => {
    dispatch({
      type: 'reconciler/getPoolInfo',
      payload: {},
    });
  }, []);
  return (
    <div>
      <TokenSelectModal />
      {wallet.connected ? (
        <button>Reconciler</button>
      ) : (
        <button onClick={() => walletModal.setVisible(true)}>
          Connect Wallet
        </button>
      )}
    </div>
  );
}

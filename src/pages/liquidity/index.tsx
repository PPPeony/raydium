import { Progress } from 'antd';
import { useCallback, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'dva'



import BluePurplePanel from '@/components/BluePurplePanel';
import CurrencyInput from '@/components/CurrencyInput';
import ButtonWithBorder from '@/components/ButtonWithBorder';
import SwitchTabs from '@/components/SwitchTabs';

import {formatNumber} from '@/utils/formatNumber'

import {ILiquidityState} from './model'

import './index.less'
interface ICurrency {
  symbol?: string;
  icon?: string;
  amount?: number;
}


const useCurrency = (base: ICurrency, quote: ICurrency)=>{
 const [baseState, setBaseState] =  useState<ICurrency>({
  icon: base.icon,
  amount: base.amount,
  symbol: base.symbol
 });
 const [quoteState, setQuoteState] =  useState<ICurrency>({
  icon: quote.icon,
  amount: quote.amount,
  symbol: quote.symbol
 });

 return {
  baseCurrencyState: baseState,
  quoteCurrencyState: quoteState,
  changeAmount: (baseAmount: number, quoteAmount: number)=>{
    setBaseState({
      amount: baseAmount,
      symbol: baseState.symbol,
      icon: baseState.icon,
    })
    setQuoteState({
      amount: quoteAmount,
      symbol: quoteState.symbol,
      icon: quoteState.icon,
    })
  }
 }

}


export default function Liquidity() {

  const dispatch = useDispatch();

  const {poolInfo} = useSelector((state:{liquidity: ILiquidityState})=>{
    return state.liquidity
  }, shallowEqual);

  const {baseCurrencyState, quoteCurrencyState, changeAmount} = useCurrency(
    {symbol: poolInfo?.baseToken.symbol, icon: poolInfo?.baseIcon}, 
    {symbol: poolInfo?.quoteToken.symbol, icon: poolInfo?.quoteIcon}, 
    );

  const onCurrencyInputChange = (direction: 'base' | 'quote', value: number)=>{
    if(!poolInfo){
      return
    }
     // normal number 
     let rate = poolInfo?.rate;
     if(direction === 'base'){
       changeAmount(value,value*rate)
     }else{
       changeAmount(value/rate, value)
     }
  }

  let displayFlag = false;
  const changeDisplay = () => {
    if(displayFlag === false) {

    }
    displayFlag = !displayFlag;
  }
  
  return (
    <div className='liquidity-box'>
      <div className='switch-tabs-wrapper'>
        <SwitchTabs></SwitchTabs>
      </div>
      <div>
        <BluePurplePanel>
          {/* 第一个input */}
          <div className='bpinnerpanel-wrap wrap1'>
            <CurrencyInput 
            value={baseCurrencyState.amount} 
            symbol={baseCurrencyState.symbol}
            icon={baseCurrencyState.icon} 
            onChange={(value)=>onCurrencyInputChange('base', value)}/>
          </div>
          {/* 中间间隔区域 */}
          <div className='partition-box'>
            <div className='partition-box-left'>
              <div className='parition-box-img'>
                <img src={require('@/assets/icons/msic-plus.svg').default} alt="--" />
              </div>
              <div>
                <div className='flex text-ABC4FF font-size-14px'>
                  {`1 ${baseCurrencyState.symbol} ≈ ${poolInfo?.rate} ${quoteCurrencyState.symbol}`}
                  <div> &nbsp;⇋</div>
                </div>
              </div>
            </div>
            {/* 放大镜 进度条 */}
            <div className='partition-box-right'>
              <div className='parition-box-img' >
                <img src={require('@/assets/icons/msic-search.svg').default} alt="--" />
              </div>
              <div className='text-ABC4FF'>
                <Progress type="circle" percent={30} format={percent => ''} width={24}  />
              </div>
            </div>
          </div>
          {/* 第二个input */}
          <div className='bpinnerpanel-wrap'>
            <CurrencyInput
              value={quoteCurrencyState.amount}
              symbol={quoteCurrencyState.symbol}
              icon={quoteCurrencyState.icon}
              onChange={(value)=>onCurrencyInputChange('quote', value)}/>
          </div>
          {/* data table */}
          <div className='data-table'>
            <div className='data-table-row'>
              <div className='data-table-row-l'>{`Base`}</div>
              <div className='data-table-row-r'>{`RAY`}</div>
            </div>
            <div className='data-table-row'>
              <div className='data-table-row-l'>{`pool liquidity (RAY)`} </div>
              <div className='data-table-row-r'>{formatNumber(179994.910241033) + ' RAY'}</div>
            </div>
            <div className='data-table-row'>
              <div className='data-table-row-l'>{`pool liquidity (SOL)`}</div>
              <div className='data-table-row-r'>{formatNumber(6270264.45) + ' SOL'}</div>
            </div>
            <div className='data-table-row'>
              <div className='data-table-row-l'>{'LP supply'}</div>
              <div className='data-table-row-r'>{formatNumber(90515.56) + ' LP'}</div>
            </div>
            <div className='more-info-wrap'>
              <div className='address-tolerance'>
                <div className='address'>{'Address'}</div>
                <div className='tolerance'>
                  <div>{'Slippage Tolerance'}</div>
                  <div className='tolerance-input'>
                    <input type="text" placeholder='12' value={2} className='number-input' onChange={changeDisplay}/>
                    <div className='percent'>%</div>
                  </div>
                </div>
              </div>
              <div className='more-info' >{'More infomation'}</div>
            </div>
          </div>
          {/* 底部button */}
          <div className='footer-button-wrap'>
            <ButtonWithBorder>Connect Wallet</ButtonWithBorder>
          </div>
        </BluePurplePanel>
      </div>
    </div>
  );
}
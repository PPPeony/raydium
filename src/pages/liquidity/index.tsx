import { Progress } from 'antd';
import { useCallback, useState } from 'react';


import BluePurplePanel from '@/components/BluePurplePanel';
import CurrencyInput from '@/components/CurrencyInput';
import ButtonWithBorder from '@/components/ButtonWithBorder';
import SwitchTabs from '@/components/SwitchTabs';

import {formatNumber} from '@/utils/formatNumber'

// import plusSvg from '@/assets/icons/msic-plus.svg';
// import searchSvg from '@/assets/icons/msic-search.svg';

import './index.less'

export default function HomePage() {
  const [exchangeRate,setExchangeRate] = useState(0.014644);
  // 第一个币种
  const [currencyOne,setCurrencyOne] = useState('');
  // 第二个币种
  const [currencyTwo,setCurrencyTwo] = useState('');

  const handleCurrencyInputed = useCallback((setCur,setOthCur) => (curOne:string,curTwo:string) => {
    setCur(curOne);
    setOthCur(curTwo)
  },[])

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
            <CurrencyInput rate={(exchangeRate+1)} value={currencyOne} onChange={handleCurrencyInputed(setCurrencyOne,setCurrencyTwo)}></CurrencyInput >
          </div>
          {/* 中间间隔区域 */}
          <div className='partition-box'>
            <div className='partition-box-left'>
              <div className='parition-box-img'>
                <img src={require('@/assets/icons/msic-plus.svg').default} alt="--" />
              </div>
              <div>
                <div className='flex text-ABC4FF font-size-14px'>
                  1 RAY ≈ 0.014644 SOL
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
            <CurrencyInput rate={1/(1+exchangeRate)} value={currencyTwo} onChange={handleCurrencyInputed(setCurrencyTwo,setCurrencyOne)}></CurrencyInput>
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
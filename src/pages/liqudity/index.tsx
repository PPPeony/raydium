import { Progress } from 'antd';
import { useState } from 'react';


import BluePurplePanel from '@/components/BluePurplePanel';
import BPInnerPanel from '@/components/BPInnerPanel';
import ButtonWithBorder from '@/components/ButtonWithBorder';
import SwitchTabs from '@/components/SwitchTabs';

// import plusSvg from '@/assets/icons/msic-plus.svg';
// import searchSvg from '@/assets/icons/msic-search.svg';

import './index.less'

export default function HomePage() {
  const [exchangeRate,setExchangeRate] = useState(0.014644);
  // 第一个币种
  const [currencyOne,setCurrencyOne] = useState(0);
  // 第二个币种
  const [currencyTwo,setCurrencyTwo] = useState(0);

  const handleCurrencyInputed = (setCur,setOthCur, rate)=> (cur) => {
    setCur(cur);
    setOthCur(rate * cur)
    console.log('cu1: '+currencyOne + ' cur2:' + currencyTwo)
  }

  // 整数部分 每3位进行分割
  function numberWithCommas(x:string) {
    let parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  const formatNum = (num:number)=> {
    return numberWithCommas(num.toFixed(2))
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
            <BPInnerPanel value={currencyOne} onInp={handleCurrencyInputed(setCurrencyOne,setCurrencyTwo,(1+exchangeRate))}></BPInnerPanel>
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
              <Progress type="circle" percent={30}format={percent => ''} width={24}  />
              </div>
            </div>
          </div>
          {/* 第二个input */}
          <div className='bpinnerpanel-wrap'>
            <BPInnerPanel value={currencyTwo} onInp={handleCurrencyInputed(setCurrencyTwo,setCurrencyOne,1/(1+exchangeRate))}></BPInnerPanel>
          </div>
          {/* data table */}
          <div>
            <div className='data-table'>
              <div className='data-table-row'>
                <div className='data-table-row-l'>{`Base`}</div>
                <div className='data-table-row-r'>{`RAY`}</div>
              </div>
              <div className='data-table-row'>
                <div className='data-table-row-l'>{`pool liquidity (RAY)`} </div>
                <div className='data-table-row-r'>{formatNum(179994.910241033) + ' RAY'}</div>
              </div>
              <div className='data-table-row'>
                <div className='data-table-row-l'>{`pool liquidity (SOL)`}</div>
                <div className='data-table-row-r'>{formatNum(6270264.45) + ' SOL'}</div>
              </div>
              <div className='data-table-row'>
                <div className='data-table-row-l'>{'LP supply'}</div>
                <div className='data-table-row-r'>{formatNum(90515.56) + ' LP'}</div>
              </div>
              <div className='data-table-row'>
                <div className='data-table-row-l'>{'Address'}</div>
              </div>
              <div className='data-table-row'>
                <div className='data-table-row-l'>{'Slippage Tolerance'}</div>
                <div className='data-table-row-r tolerance'>
                  <input type="text" placeholder='12'/>
                  <div>%</div>
                </div>
              </div>
              <div className='data-table-row'>
                <div className='data-table-row-l data-table-more-info'>{'More infomation'}</div>
              </div>
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

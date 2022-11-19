import React, { useCallback, useState } from "react";
import './index.less'
interface IInputProps{
  onChange: (v: string| number)=>void;
  symbol?: string
  icon?: string;
  value?: number;
  balance?: number // undefined indicates no wallet connected. 0 means balance is 0 
}

export default function CurrencyInput(props: IInputProps ) {
  const handleInput = useCallback((e)=>{
    let pastCur = props.value;
    let nowCur = e.target.value;

    let curOne = '';
    let curTwo = '';
    if(/^\D*$/.test(nowCur)) {
      curOne = '';
      curTwo = '';
    } else {
      if (/(^[0-9]+\.?[0-9]*$)/.test(nowCur) === false) {
        // NaN 形如1a, 就会退回非数字的部分
        nowCur = pastCur;
      }
      // 小数，整数
      curOne = nowCur;
      // curTwo = (rate * Number.parseFloat(nowCur)).toString();
    }
    props.onChange(curOne)
  }, [])

  const handlePreset = useCallback((type: 'max' | 'half')=>{
    if(!props.balance)return;
    if(type === 'max'){
      props.onChange(props.balance)
    }else{
      props.onChange(props.balance/2)
    }
  }, [])

  return (
    <div className="bp-inner-panel">
      <div className="bp-inner-panel-row">{`Balance: (Wallet not connected)`}</div>
      {/* 第二层 */}
      <div className="bp-inner-panel-row">
        {/* 图标 */}
        <div className="panel-row-col">
          <div className="col-icon">
            <div className="icon-box-2rem">
              <img className="bpinner-img" src={props.icon} alt="" />
            </div>
            <div className="icon-label">{props.symbol}</div>
            <div style={{width: 12}}>
              <img src={require('@/assets/icons/msic-exchange.svg').default} alt="" />
            </div>
          </div>
        </div>
        {/* 分割线 */}
        <div className="bpinner-panel-divider"></div>
        {/* 两个小按钮 */}
        <div className="bpinner-button-input">
          <div className="bpinner-button-wrap">
            <button type="button" className="bpinner-button" onClick={()=>handlePreset('max')}>Max</button>
            <button type="button" className="bpinner-button" onClick={()=>handlePreset('half')}>Half</button>
          </div> 
          <div >
            <input className="bpinner-panel-input" placeholder="" value={props.value} onChange={handleInput}></input>
          </div>
        </div>
      </div>
      {/* 第三层 */}
      <div className="bp-inner-panel-row">
        <span>--</span>
      </div>
    </div>
  );
}

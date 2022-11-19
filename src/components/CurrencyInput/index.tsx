import React, { useState } from "react";
import './index.less'
interface BPInnerPanelProps {
  icon?: React.ReactNode,
}

export default function CurrencyInput({value,rate,onChange}) {
  const handleInput = (e)=>{
    let pastCur = value;
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
      curTwo = (rate * Number.parseFloat(nowCur)).toString();
    }
    onChange(curOne, curTwo)
  };

  return (
    <div className="bp-inner-panel">
      <div className="bp-inner-panel-row">{`Balance: (Wallet not connected)`}</div>
      {/* 第二层 */}
      <div className="bp-inner-panel-row">
        {/* 图标 */}
        <div className="panel-row-col">
          <div className="col-icon">
            <div className="icon-box-2rem">
              <img className="bpinner-img" src={require('/src/assets/img/ray.png')} alt="" />
            </div>
            <div className="icon-label">RAY</div>
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
            <button type="button" className="bpinner-button" >Max</button>
            <button type="button" className="bpinner-button" >Half</button>
          </div> 
          <div >
            <input className="bpinner-panel-input" placeholder="" value={value} onChange={handleInput}></input>
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

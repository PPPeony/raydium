import React from "react";
interface BPInnerPanelProps {
  icon?: React.ReactNode
}

export default function BPInnerPanel({}) {
  return (
    <div className="bp-inner-panel rounded-xl" style={{ color: 'white' }}>
      <div className="flex font-size-12px flex-justify-right font-color-grey" style={{marginBottom:'0.5rem', color: ''}}>{`Balance: (Wallet not connected)`}</div>
      {/* 第二层 */}
      <div className="flex flex-align-center">
        <div className="flex">
          <div className="flex flex-align-center flex-space-between gap">
            <div className="flex icon-box icon-box-bg-1 rounded-full flex-justify-center flex-align-center">
              <img src={require('/src/assets/img/ray.png')} alt="" style={{maxWidth: '100%', scale: '.7'}} />
            </div>
            <div className="font-size-16px text-ABC4FF">RAY</div>
            <div style={{color: '#abc4ff'}}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="select-none width-0p75 height-0p75rem">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="bpinner-panel-divider"></div>
        <div className="flex flex-space-between">
          <div className="flex flex-align-center" style={{gap:'1px', marginRight: '0.5rem'}}>
            <button type="button" className="bpinner-button button-bgc-1B1659" >Max</button>
            <button type="button" className="bpinner-button button-bgc-1B1659" >Half</button>
          </div> 
          <div >
            <input className="bpinner-panel-input" placeholder="123"></input>
          </div>
        </div>

      </div>
    </div>
  );
}

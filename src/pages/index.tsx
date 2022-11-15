import BluePurplePanel from '@/components/BluePurplePanel';
import BPInnerPanel from '@/components/BPInnerPanel';
import ButtonWithBorder from '@/components/ButtonWithBorder';
import SwitchTabs from '@/components/SwitchTabs';

export default function HomePage() {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <div>
        <SwitchTabs></SwitchTabs>
      </div>
      <div>
        <BluePurplePanel>
          {/* 第一个input */}
          <div style={{ marginTop: '1.25rem' }}>
            <BPInnerPanel></BPInnerPanel>
          </div>
          {/* 中间间隔区域 */}
          <div className='height-2rem margin-t-b-1rem flex flex-align-center flex-space-between'>
            <div className='flex flex-align-center margin-left-1rem'>
              <div className='icon-box-1p5 text-39D0D8 ' style={{margin: 4}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="select-none h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path></svg>
              </div>
              <div>
                <div className='flex text-ABC4FF font-size-14px'>
                  1 RAY ≈ 0.014644 SOL
                  <div> &nbsp;⇋</div>
                </div>
              </div>
            </div>
            {/* 放大镜 进度条 */}
            <div className='flex flex-align-center'>
              <div className='text-ABC4FF' style={{width: '2rem', height:'2rem'}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="select-none h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
                </svg>
              </div>
              <div className='text-ABC4FF'>
                progress
              </div>
            </div>
          </div>
          {/* 第二个input */}
          <div>
            <BPInnerPanel></BPInnerPanel>
          </div>
          {/* data table */}
          <div>
            <div className='data-table flex flex-column' style={{marginTop: '20px'}}>
              <div className='flex data-table-row'>
                <div className='data-table-row-l'>{`Base`}</div>
                <div className='data-table-row-r'>{`RAY`}</div>
              </div>
              <div className='flex data-table-row'>
                <div className='data-table-row-l'>{`pool liquidity (RAY)`} </div>
                <div className='data-table-row-r'>b</div>
              </div>
              <div className='flex data-table-row'>
                <div className='data-table-row-l'>{`pool liquidity (SOL)`}</div>
                <div className='data-table-row-r'>b</div>
              </div>
              <div className='flex data-table-row'>
                <div className='data-table-row-l'>{'LP supply'}</div>
                <div className='data-table-row-r'>b</div>
              </div>
              <div className='flex data-table-row'>
                <div className='data-table-row-l data-table-more-info'>{'More infomation'}</div>
              </div>
            </div>
          </div>
          {/* 底部button */}
          <div className='flex' style={{marginTop: '1.25rem'}}>
            <ButtonWithBorder></ButtonWithBorder>
          </div>
        </BluePurplePanel>
      </div>
    </div>
  );
}

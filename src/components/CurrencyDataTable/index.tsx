import {formatNumber} from '@/utils/formatNumber'
import { useCallback, useState } from 'react';
import Styles from './index.less'
import classNames from 'classnames/bind'
const cx = classNames.bind(Styles)

export default function CurrencyDataTable() {
  const [displayFlag,setDisplayFlag ]= useState(false);
  const [displayValue,setDisplayValue ]= useState('none');
  const changeDisplay = () => {
    setDisplayValue( displayFlag ? 'flex' : 'none');
    setDisplayFlag (!displayFlag);
  }

  return (          
    <div className={cx('data-table')}>
      <div className={cx('data-table-row')}>
        <div className={cx('data-table-row-l')}>{`Base`}</div>
        <div className={cx('data-table-row-r')}>{`RAY`}</div>
      </div>
      <div className={cx('data-table-row')}>
        <div className={cx('data-table-row-l')}>{`pool liquidity (RAY)`} </div>
        <div className={cx('data-table-row-r')}>{formatNumber(179994.910241033) + ' RAY'}</div>
      </div>
      <div className={cx('data-table-row')}>
        <div className={cx('data-table-row-l')}>{`pool liquidity (SOL)`}</div>
        <div className={cx('data-table-row-r')}>{formatNumber(6270264.45) + ' SOL'}</div>
      </div>
      <div className={cx('data-table-row')}>
        <div className={cx('data-table-row-l')}>{'LP supply'}</div>
        <div className={cx('data-table-row-r')}>{formatNumber(90515.56) + ' LP'}</div>
      </div>
      <div className={cx('more-info-wrap')}>
        <div className={cx('address-tolerance')} style={{display: displayValue}}>
          <div className={cx('address')}>{'Address'}</div>
          <div className={cx('tolerance')}>
            <div>{'Slippage Tolerance'}</div>
            <div className={cx('tolerance-input')}>
              <input type="text" placeholder='12' value={2} className={cx('number-input')} onChange={()=>{}}/>
              <div className={cx('percent')}>%</div>
            </div>
          </div>
        </div>
        <div className={cx('more-info')} onClick={changeDisplay} >{'More infomation'}</div>
      </div>
    </div>)
}
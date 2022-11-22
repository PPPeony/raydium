import { IPoolInfo } from '@/pages/reconciler/model';
import { formatBigNumber } from '@/utils/formatNumber';
import classNames from 'classnames/bind';
import { useState } from 'react';
import Styles from './index.less';
const cx = classNames.bind(Styles);

export default function CurrencyDataTable(props: { data?: IPoolInfo }) {
  const [displayFlag, setDisplayFlag] = useState(false);
  const [displayValue, setDisplayValue] = useState('none');
  const changeDisplay = () => {
    setDisplayValue(displayFlag ? 'flex' : 'none');
    setDisplayFlag(!displayFlag);
  };

  const { baseToken, quoteToken, baseReserve, quoteReserve, lpSupply } =
    props.data || {};
  return (
    <div className={cx('data-table')}>
      <div className={cx('data-table-row')}>
        <div className={cx('data-table-row-l')}>Base</div>
        <div className={cx('data-table-row-r')}>{baseToken?.symbol}</div>
      </div>
      <div className={cx('data-table-row')}>
        <div className={cx('data-table-row-l')}>
          pool liquidity ({baseToken?.symbol})
        </div>
        <div className={cx('data-table-row-r')}>
          {formatBigNumber(baseReserve, props.data?.baseDecimals)}
          &nbsp;
          {baseToken?.symbol}
        </div>
      </div>
      <div className={cx('data-table-row')}>
        <div className={cx('data-table-row-l')}>
          pool liquidity ({quoteToken?.symbol})
        </div>
        <div className={cx('data-table-row-r')}>
          {formatBigNumber(quoteReserve, props.data?.quoteDecimals)}
          &nbsp;
          {quoteToken?.symbol}
        </div>
      </div>
      <div className={cx('data-table-row')}>
        <div className={cx('data-table-row-l')}>{'LP supply'}</div>
        <div className={cx('data-table-row-r')}>
          {formatBigNumber(lpSupply, props.data?.lpDecimals) + ' LP'}
        </div>
      </div>
      <div className={cx('more-info-wrap')}>
        <div
          className={cx('address-tolerance')}
          style={{ display: displayValue }}
        >
          <div className={cx('address')}>{'Address'}</div>
          <div className={cx('tolerance')}>
            <div>{'Slippage Tolerance'}</div>
            <div className={cx('tolerance-input')}>
              <input
                type="text"
                placeholder="12"
                defaultValue={2}
                className={cx('number-input')}
              />
              <div className={cx('percent')}>%</div>
            </div>
          </div>
        </div>
        <div className={cx('more-info')} onClick={changeDisplay}>
          {'More infomation'}
        </div>
      </div>
    </div>
  );
}

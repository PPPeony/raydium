import classNames from 'classnames/bind';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import Styles from './index.less';
const cx = classNames.bind(Styles);

interface IInputProps {
  onChange: (v: string | number) => void;
  symbol?: string;
  icon?: string;
  value?: number | string;
  balance?: number; // undefined indicates no wallet connected. 0 means balance is 0
}

const useDebounce = (delay: number) => {
  let timmer;
  // prevent memory leak: there is only one debounce instance
  const [state] = useState({
    debounce: (callback: () => void) => {
      if (timmer) clearTimeout(timmer);
      timmer = setTimeout(callback, delay);
    },
  });
  useCallback(() => {
    // clear timmer before component destroy
    return () => {
      if (timmer) clearTimeout(timmer);
    };
  }, []);
  return state.debounce;
};

export default function CurrencyInput(props: IInputProps) {
  // const debounce = inputDebounce((cur) => {
  //   props.onChange(cur);
  // }, 200);
  const debounce = useDebounce(200);
  const [value, setValue] = useState(props.value || '');
  useEffect(() => {
    // if inpunt is foucs, omit the value from parent
    // if (inputRef.current?.focus) return;
    setValue(props.value || '');
  }, [props.value]);

  const handleInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.target.value;
    if (currentValue === '' || /^\d+\.?\d*$/.test(currentValue)) {
      setValue(currentValue);
      debounce(() => props.onChange(currentValue));
    }
  }, []);

  const handlePreset = useCallback((type: 'max' | 'half') => {
    if (!props.balance) return;
    if (type === 'max') {
      props.onChange(props.balance);
    } else {
      props.onChange(props.balance / 2);
    }
  }, []);

  return (
    <div className={cx('bp-inner-panel')}>
      <div
        className={cx('bp-inner-panel-row')}
      >{`Balance: (Wallet not connected)`}</div>
      {/* 第二层 */}
      <div className={cx('bp-inner-panel-row')}>
        {/* 图标 */}
        <div className={cx('panel-row-col')}>
          <div className={cx('col-icon')}>
            <div className={cx('icon-box-2rem')}>
              <img className={cx('bpinner-img')} src={props.icon} alt="" />
            </div>
            <div className={cx('icon-label')}>{props.symbol}</div>
            <div style={{ width: 12 }}>
              <img
                src={require('@/assets/icons/msic-exchange.svg').default}
                alt=""
              />
            </div>
          </div>
        </div>
        {/* 分割线 */}
        <div className={cx('bpinner-panel-divider')}></div>
        {/* 两个小按钮 */}
        <div className={cx('bpinner-button-input')}>
          <div className={cx('bpinner-button-wrap')}>
            <button
              type="button"
              className={cx('bpinner-button')}
              onClick={() => handlePreset('max')}
            >
              Max
            </button>
            <button
              type="button"
              className={cx('bpinner-button')}
              onClick={() => handlePreset('half')}
            >
              Half
            </button>
          </div>
          <div>
            <input
              className={cx('bpinner-panel-input')}
              placeholder=""
              value={value}
              onChange={handleInput}
            ></input>
          </div>
        </div>
      </div>
      {/* 第三层 */}
      <div className={cx('bp-inner-panel-row')}>
        <span>--</span>
      </div>
    </div>
  );
}

import classNames from 'classnames/bind';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import Styles from './index.less';
const cx = classNames.bind(Styles);

function TokenItem() {
  return (
    <div>
      <div className={cx('lists-item')}>
        <div className={cx('item-bg')}>
          <div className={cx('item')}>
            <div className={cx('item-icon')}>
              <img src={require('@/assets/img/ray.png')} alt="" />
            </div>
            <div className={cx('label-wrap')}>
              <div className={cx('short')}>{'RAY'}</div>
              <div className={cx('long')}>{'Raydium'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TokenSelect() {
  const [display, setDisplay] = useState('block');
  const handleClick = useCallback(() => {
    setDisplay('none');
  }, []);
  return (
    <div
      className={cx('token-wrap-bg')}
      style={{ display: display }}
      onClick={handleClick}
    >
      <div className={cx('token-wrap')}>
        <div className={cx('dialog')}>
          {/* 上面部分 */}
          <div className={cx('top-wrap')}>
            <div className={cx('title-wrap')}>
              <div className={cx('title')}>Select a token</div>
              <div className={cx('x-icon')} onClick={handleClick}>
                <img
                  src={require('@/assets/icons/msic-x-icon.svg').default}
                  alt=""
                />
              </div>
            </div>
            <div className={cx('input-wrap')}>
              <input
                type="search"
                className={cx('input')}
                placeholder="Search name or mint address"
              />
              <div className={cx('search-icon')}>
                <img
                  src={require('@/assets/icons/msic-search.svg').default}
                  alt=""
                  className={cx('img')}
                />
              </div>
            </div>
            <div className={cx('popular')}>Popular tokens</div>
            <div className={cx('popular-tokens')}>
              <div className={cx('token-item')}>
                <div className={cx('item-icon')}>
                  <img src={require('@/assets/img/ray.png')} alt="" />
                </div>
                <div className={cx('item-label')}>{'RAY'}</div>
              </div>
              <div className={cx('token-item')}>
                <div className={cx('item-icon')}>
                  <img src={require('@/assets/img/ray.png')} alt="" />
                </div>
                <div className={cx('item-label')}>{'RAY'}</div>
              </div>
              <div className={cx('token-item')}>
                <div className={cx('item-icon')}>
                  <img src={require('@/assets/img/ray.png')} alt="" />
                </div>
                <div className={cx('item-label')}>{'RAY'}</div>
              </div>
              <div className={cx('token-item')}>
                <div className={cx('item-icon')}>
                  <img src={require('@/assets/img/ray.png')} alt="" />
                </div>
                <div className={cx('item-label')}>{'RAY'}</div>
              </div>
            </div>
          </div>
          {/* 分割线 */}
          <div className={cx('divider')}></div>
          {/* List 部分 */}
          <div className={cx('lists-wrap')}>
            <div className={cx('lists-title')}>
              <div>Token</div>
              <div>Balance</div>
            </div>
            <div className={cx('lists-content')}>
              <TokenItem></TokenItem>
              <TokenItem></TokenItem>
              <TokenItem></TokenItem>
              <TokenItem></TokenItem>
              <TokenItem></TokenItem>
              <TokenItem></TokenItem>
              <TokenItem></TokenItem>
              <TokenItem></TokenItem>
            </div>
          </div>
          {/* 底部button */}
          <button type="button" className={cx('token-button')}>
            View Token List
          </button>
        </div>
      </div>
    </div>
  );
}

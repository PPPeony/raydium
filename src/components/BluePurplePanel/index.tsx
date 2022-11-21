import classNames from 'classnames/bind';
import React from 'react';
import Styles from './index.less';
const cx = classNames.bind(Styles);
interface BPPProps {
  children?: React.ReactNode;
}

export default function BluePurplePanel(props: BPPProps) {
  return (
    <div className={cx('blue-purple-panel')}>
      <div className={cx('bp-panel-bgroud')}>{props.children}</div>
    </div>
  );
}

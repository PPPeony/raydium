import React from 'react';
import './index.less'
interface BPPProps {
  children?: React.ReactNode;
}

export default function BluePurplePanel(props: BPPProps) {
  return (
    <div className="blue-purple-panel">
      <div className="bp-panel-bgroud">{props.children}</div>
    </div>
  );
}
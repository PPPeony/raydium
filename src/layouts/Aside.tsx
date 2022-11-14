import React from 'react';

import type { MenuProps } from 'antd';
import { Col, Menu, Row } from 'antd';
// import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

import './index.less';

import Icon from '@/components/Icon';
import IconWithoutBack from '@/components/IconWithoutBack';

const items2: MenuProps['items'] = [
  { label: 'Trading', svg: 'trade' },
  { label: 'Swap', svg: 'swap' },
  { label: 'Liquidity', svg: 'liquidity' },
  { label: 'Concentrated', svg: 'concentrated-pools' },
  { label: 'Pools', svg: 'pools' },
  { label: 'Farms', svg: 'farms' },
  { label: 'Staking', svg: 'staking' },
  { label: 'AcceleRaytor', svg: 'acceleraytor' },
  { label: 'Dropzone', svg: 'dropzone' },
  { label: 'NFT', svg: 'nft' },
].map((item, index) => {
  const key = String(index + 1);
  return {
    key: `sub${key}`,
    icon: <Icon src={item.svg} />,
    label: item.label,
  };
});

const items3: MenuProps['items'] = [
  { label: 'PRC(Triton)', svg: 'settings' },
  { label: 'Setting', svg: 'settings' },
  { label: 'Community', svg: 'community' },
  { label: 'Docs', svg: 'docs' },
  { label: 'Raydium V1', svg: 'settings' },
  { label: 'Feedback', svg: 'settings' },
].map((item, index) => {
  const key: string = String(index + 1);
  return {
    key: `sub${key}`,
    icon: <IconWithoutBack src={item.svg} />,
    label: item.label,
  };
});

const Aside: React.FC = () => (
  <aside className="site-layout-background site-layout-background-sider">
    <Row>
      <Col span={24}>
        <Menu
          className="scroll-menu-first"
          mode="vertical"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          items={items2}
          style={{ overflow: 'auto' }}
        />
      </Col>
      <Col span={24}>
        <Row>
          <Col span={24}>
            <div className="sider-divider" />
          </Col>
          <Col span={24}>
            <Menu
              className="scroll-menu-second"
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ borderRight: 0 }}
              items={items3}
            />
          </Col>
        </Row>
      </Col>
      <Col span={24}></Col>
    </Row>
  </aside>
);

export default Aside;

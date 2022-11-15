import SolanaWalletsProvider from '@/components/SolanaWallets/Provider';
import { Button, Col, Layout, MenuProps, Row } from 'antd';
import React from 'react';
import { Outlet } from 'umi';
import Aside from './Aside';

import './index.less';

import Icon from '@/components/Icon';
import IconWithoutBack from '@/components/IconWithoutBack';

import  Header  from './Header';

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

const App: React.FC = () => (
  <Layout className="outside-layout">
   <Header/>
    <Layout className="main-layout">
      <Row style={{ backgroundColor: '#131a35' }}>
        <Col>
          <Aside />
        </Col>
        <Col
          flex="auto"
          style={{
            borderTopLeftRadius: '1.25rem',
            backgroundColor: '#0c0927',
            overflow: 'hidden',
          }}
        >
          <main style={{ padding: '3rem' }}>
            <Outlet />
          </main>
        </Col>
      </Row>
    </Layout>
  </Layout>
);

export default () => (
  <SolanaWalletsProvider>
    <App />
  </SolanaWalletsProvider>
);

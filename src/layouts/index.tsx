import { Outlet } from 'umi'
import React from 'react';
import { Layout, Row, Col } from 'antd';
import SolanaWalletsProvider from '@/components/SolanaWallets/Provider'
import Header from './Header';
import Aside from './Aside';
import BoxWithBorderRadius from '@/components/BoxWithBorderRadius';

import './index.less'

const App: React.FC = () => (
  <Layout className='outside-layout'>
    <Header/>
    <Layout className='main-layout'>
      <Row style={{backgroundColor: '#131a35'}}>
        <Col>
        <Aside/>
         
        </Col>
        <Col flex='auto' style={{borderTopLeftRadius: '1.25rem',backgroundColor: '#0c0927', overflow:'hidden'}}>
          <main>
            <BoxWithBorderRadius></BoxWithBorderRadius>
            <Outlet/>
          </main>
        </Col>
      </Row>
    </Layout>
  </Layout>
);

export default ()=>(
<SolanaWalletsProvider>
  <App/>
</SolanaWalletsProvider>
);
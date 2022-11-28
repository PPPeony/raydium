import SolanaWalletsProvider from '@/components/SolanaWallets/Provider';
import { Col, Layout, Row } from 'antd';
import React from 'react';
import { Outlet } from 'umi';

import Aside from './Aside';
import Header from './Header';
import './index.less';

const App: React.FC = () => (
  <Layout className="outside-layout">
    {/* <header className="header">
      <div>
        <Row className="header-row" justify="space-between" align="middle">
          <Col className="header-row-col" span={4}>
            <img
              src={logo}
              style={{ verticalAlign: 'middle', color: 'rgba(59,130,246,.5)' }}
            />
          </Col>
          <Col className="header-row-col">
            <Row justify="space-between" align="middle" style={{ gap: '2rem' }}>
              <Col style={{ width: 24, height: 24 }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  ></path>
                </svg>
              </Col>
              <Col>
                <Button
                  className="header-row-col-button frosted-glass frosted-glass-teal rounded-xl "
                  style={{ width: 160, height: 44 }}
                >
                  Connect Wallet
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </header> */}
    <Header />
    <Layout className="main-layout">
      <Row className="main-layout-row" style={{ backgroundColor: '#131a35' }}>
        <Col className="main-layout-col1">
          <Aside />
        </Col>
        <Col className="main-layout-col2 outlet-col" flex="1">
          <main className="outlet-wrap">
            <Outlet />
          </main>
        </Col>
      </Row>
    </Layout>
  </Layout>
);

export default function Layouts() {
  return (
    <SolanaWalletsProvider>
      <App />
    </SolanaWalletsProvider>
  );
}

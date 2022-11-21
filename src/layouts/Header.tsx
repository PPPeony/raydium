import WalletBtn from '@/components/SolanaWallets/Wallet';
import { Col, Row } from 'antd';
import React from 'react';
import './index.less';

const Header: React.FC = () => (
  <header className="header">
    <Row className="header-row" justify="space-between" align="middle">
      <Col className="header-row-col" span={4}>
        <img
          src={require('@/assets/logo/logo-with-text.svg').default}
          style={{ verticalAlign: 'middle' }}
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
            <WalletBtn />
          </Col>
        </Row>
      </Col>
    </Row>
  </header>
);

export default Header;

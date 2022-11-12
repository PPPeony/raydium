import { Outlet } from 'umi';
import { Layout, Row, Col, Button, Menu, Divider } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import React, { useState } from 'react';
import SwapBox from '@/components/SwapBox';
import yayJpg from '../assets/yay.jpg';
export default function HomePage() {

  const [size, setSize] = useState<SizeType>('large');
  return (
    <div>
      <div >
        <Row justify="center" style={{color: 'white', backgroundColor: 'pink'}}>
          <Col span={6}>
            <Button type="primary" shape="round" size={size}>
              Swap
            </Button>
          </Col>
          <Col span={6}>
            <Button type="primary" shape="round"  size={size}>
              Liquidity
            </Button>
          </Col>
        </Row>
      </div>
      <div style={{backgroundColor: 'white'}}>
        <Row>
          <Col span={24}>
            <SwapBox/>
          </Col>
        </Row>
      </div>
    </div>

  );
}

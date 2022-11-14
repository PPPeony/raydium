import { Outlet } from 'umi'

import React from 'react';

import type { MenuProps } from 'antd';
import { Layout, Row, Col, Button, Menu } from 'antd';
// import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

import './index.less'

import Icon from '@/components/Icon';
import IconWithoutBack from '@/components/IconWithoutBack';

import logo from '../assets/logo/logo-with-text.svg'
import BoxWithBorderRadius from '@/components/BoxWithBorderRadius';



const items2: MenuProps['items'] = [
  {label: 'Trading', svg: 'trade'},
  {label: 'Swap', svg: 'swap'},
  {label: 'Liquidity', svg: 'liquidity'}  ,
  {label: 'Concentrated', svg: 'concentrated-pools'} ,
  {label: 'Pools', svg: 'pools'} ,
  {label: 'Farms', svg: 'farms'} ,
  {label: 'Staking', svg: 'staking'} ,
  {label: 'AcceleRaytor', svg: 'acceleraytor'} ,
  {label: 'Dropzone', svg: 'dropzone'} ,
  {label: 'NFT', svg: 'nft'} ].map(
  (item, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: <Icon src={item.svg}/>,
      label: item.label,
    };
  },
);

const items3: MenuProps['items'] = [
  {label: 'PRC(Triton)', svg: 'settings'},
  {label: 'Setting', svg: 'settings'},
  {label: 'Community', svg: 'community'},
  {label: 'Docs', svg: 'docs'},
  {label: 'Raydium V1', svg: 'settings'},
  {label: 'Feedback', svg: 'settings'},].map(
  (item, index) => {
    const key: string = String(index + 1);
    return {
      key: `sub${key}`,
      icon: <IconWithoutBack src={item.svg}/>,
      label: item.label,

    };
  },
);

const App: React.FC = () => (
  <Layout className='outside-layout'>
    <header className="header">
      <div>
      <Row className='header-row' justify="space-between" align="middle">
        <Col className='header-row-col' span={4}>
          <img src={logo} style={{verticalAlign:'middle'}}/>
        </Col>
        <Col className='header-row-col'>
            <Row justify="space-between" align="middle" style={{gap:'2rem'}}>
              <Col style={{width:24,height:24}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" ><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"></path></svg>
              </Col>
              <Col >
                <Button type="primary" className='header-row-col-button' style={{width:160,height: 44}}>Connect Wallet</Button>
              </Col>
            </Row>
        </Col>
      </Row>
      </div>
    </header>
    <Layout className='main-layout'>
      <Row style={{backgroundColor: '#131a35'}}>
        <Col>
          <aside className="site-layout-background site-layout-background-sider">
            <Row>
              <Col span={24}>
                <Menu
                  className='scroll-menu-first'
                  mode="vertical"
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  items={items2}
                  style={{overflow:'auto'}}
                />  
              </Col>
              <Col span={24}>
                <Row>
                  <Col span={24}>
                    <div className='sider-divider' />
                  </Col>
                  <Col span={24}>
                    <Menu
                      className='scroll-menu-second'
                      mode="inline"
                      defaultSelectedKeys={['1']}
                      defaultOpenKeys={['sub1']}
                      style={{ borderRight: 0 }}
                      items={items3}
                    />
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
              </Col>
            </Row>
        </aside>
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

export default App;
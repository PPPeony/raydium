import { Outlet } from 'umi'

import React from 'react';

import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Row, Col, Button, Menu, Divider } from 'antd';
// import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

import './index.less'

import Icon from '@/components/Icon';
import logo from '../assets/logo/logo-with-text.svg'

const { Header, Content, Sider } = Layout;

const items3: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key: string = String(index + 1);
    return {
      key: `sub${key}`,
      icon: <Icon/>,
      label: `subnav ${key}`,
    };
  },
);


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
      icon: <Icon/>,
      label: item.label.toString(),
    };
  },
);


/* 
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps['items'] = [
  getItem('Navigation One', 'sub1', <MailOutlined />, [
    getItem('Item 1', 'g1', null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
    getItem('Item 2', 'g2', null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
  ]),

  getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
  ]),

  getItem('Navigation Three', 'sub4', <SettingOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12'),
  ]),
]; */


const App: React.FC = () => (
  <Layout className='outside-layout'>
    <Header className="header">
      <Row className='header-row' justify="space-between" align="middle">
        <Col className='header-row-col' span={4} style={{position:'relative'}}>
          <img src={logo} style={{position:'absolute'} }></img>
        </Col>
        <Col className='header-row-col' span={6}>
          <Row justify="space-between">
            <Col span={3}>
              123
            </Col>
            <Col span={18}> 
              <Button type="primary" className='header-row-col-button'>Connect Wallet</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Header>
    <Layout style={{ backgroundColor: '#131a35'}}>
      <Sider width={200} className="site-layout-background site-layout-background-sider">
        <Menu
          className='scroll-menu-first'
          mode="vertical"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '60%', borderRight: 0, marginRight:8, marginBottom:8 }}
          items={items2}
        />
        <Divider />
        <Menu
          className='scroll-menu-second'
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ borderRight: 0 }}
          items={items3}
        />
      </Sider>
      <Layout style={{ backgroundColor: '#131a35',}}>
        <Content
          className="site-layout-background site-layout-background-content"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  </Layout>
);

export default App;
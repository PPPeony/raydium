import { Outlet } from 'umi'
import React from 'react';
import { Layout, Row, Col } from 'antd';
import SolanaWalletsProvider from '@/components/SolanaWallets/Provider'
import Header from './Header';
import Aside from './Aside';
import BoxWithBorderRadius from '@/components/BoxWithBorderRadius';

import './index.less'

<<<<<<< HEAD
const App: React.FC = () => (
  <Layout className='outside-layout'>
    <Header/>
=======
import Icon from '@/components/Icon';
import IconWithoutBack from '@/components/IconWithoutBack';

import logo from '../assets/logo/logo-with-text.svg'



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
          <img src={logo} style={{verticalAlign:'middle', color: 'rgba(59,130,246,.5)'}}/>
        </Col>
        <Col className='header-row-col'>
            <Row justify="space-between" align="middle" style={{gap:'2rem'}}>
              <Col style={{width:24,height:24}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" ><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"></path></svg>
              </Col>
              <Col >
                <Button className='header-row-col-button frosted-glass frosted-glass-teal rounded-xl ' style={{width:160,height: 44}}>Connect Wallet</Button>
              </Col>
            </Row>
        </Col>
      </Row>
      </div>
    </header>
>>>>>>> eb9d26b (feat: add some components)
    <Layout className='main-layout'>
      <Row style={{backgroundColor: '#131a35'}}>
        <Col>
        <Aside/>
         
        </Col>
        <Col flex='auto' style={{borderTopLeftRadius: '1.25rem',backgroundColor: '#0c0927', overflow:'hidden'}}>
          <main style={{padding: '3rem'}}>
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
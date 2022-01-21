import React from 'react';
import { Layout, Menu, } from 'antd';
import { Link } from 'react-router-dom';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

const { Header, Footer, Content, Sider } = Layout;

const AppLayout = ({children}) => {
  return (
    <>
      <Layout tclassName="app-layout" style={{ }}>
        <Header style={{ color: 'yellow' }}>
          Librarium
        </Header>
        <Layout>
          <Sider theme="light" trigger={null} collapsible >
            <div className="logo" />
            <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item  key= "1" icon={<UserOutlined />}>
                <Link to="/" >
                  Home
                </Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                <Link to="/cart" >
                  Cart
                </Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<UploadOutlined />}>
                <Link to="/orders" >
                  Orders
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Content style={{}}>
            {children}
          </Content>
        </Layout>
        <Footer className="footer">Auxcube - Front End Task</Footer>
      </Layout>
    </>
  );
}

export default AppLayout;

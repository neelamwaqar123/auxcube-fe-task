import React from 'react';
import { Layout, Menu, Image } from 'antd';
import { Link } from 'react-router-dom';
import Logo from "../../assets/result.svg";

const { Header, Footer, Content, Sider } = Layout;

const AppLayout = ({children}) => {
  return (
    <>
      <Layout className="app-layout">
        <Header className="header">
          <Link to="/">
            <div className="header-logo" >
              <Image
                preview={false}
                src={Logo}
                alt="Auxcube Logo" />
            </div>
          </Link>
          <Menu className="header-links" theme="dark" mode="horizontal">
            <Menu.Item>
              <Link to="/" >
                Home
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/cart" >
                My Cart
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/orders" >
                My Orders
              </Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content className="site-layout">
          <div className="site-layout-background">
            {children}
          </div>
        </Content>
        <Footer className="footer">Auxcube - Front End Task</Footer>
      </Layout>
    </>
  );
}

export default AppLayout;


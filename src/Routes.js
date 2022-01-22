import { Col, Row, Spin } from 'antd';
import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from './components/common/Layout';
import HomePage from "./views/HomePage";
import Cart from "./views/Cart";
import Order from "./views/Order";

const AppRoutes = () => {
  return (
    <Suspense
      fallback={
        <Row justify="center">
          <Col>
            <Spin size="large" />
          </Col>
        </Row>
      }
    >
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route exact path="/" element={<HomePage/>}/>
            <Route exact path="/cart" element={<Cart/>}/>
            <Route exact path="/orders" element={<Order/>}/>
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </Suspense>
  )
};

export default AppRoutes;
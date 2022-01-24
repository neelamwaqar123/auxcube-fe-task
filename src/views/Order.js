import React, { Fragment, useEffect, useState } from 'react';
import {
  Typography,
  Collapse,
  PageHeader,
  Divider,
  Row,
  Col,
  Button,
  Empty
} from 'antd';
import Cookies from 'js-cookie';
import { Link } from "react-router-dom";

const { Panel } = Collapse;
const { Title } = Typography;

const Order = () => {
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    Cookies.get('order') && setMyOrders(JSON.parse(Cookies.get('order')))
  }, [])

  return (
    <Fragment>
      <PageHeader
        className="site-page-header"
        title="All Orders"
      />
      <Divider />
      {myOrders.length ? myOrders.map((order, id) =>
        <Fragment>
          <Title level={4}>{`Order Number ${id+1}`}</Title>
          <Collapse  style={{marginBottom:"10px"}} key={id}>
            <Panel header={"This is Order#" + id+1 + ". Click to view details of your order."} key={id}>
              <div className="cart">
                <Row>
                  <Col span={4} className="cart-col">
                    <h1>Book Name</h1>
                  </Col>
                  <Col span={4} className="cart-col" >
                    <h1>Genre</h1>
                  </Col>
                  <Col span={4} className="cart-col">
                    <h1>Author Name</h1>
                  </Col>
                  <Col span={4} className="cart-col">
                    <h1>Price</h1>
                  </Col>
                  <Col span={4} className="cart-col">
                    <h1>Published At</h1>
                  </Col>
                  <Col span={4} className="cart-col" >
                    <h1>Quantity</h1>
                  </Col>
                </Row>
                {order.slice(0, order.length-1).map(book => (
                  <>
                    <Row>
                      <Col span={4} className="cart-col">
                        {book.title}
                      </Col>
                      <Col span={4} className="cart-col" >
                        {book.genre}
                      </Col>
                      <Col span={4} className="cart-col">
                        {book.title}
                      </Col>
                      <Col span={4} className="cart-col" >
                        {book.price}$
                      </Col>
                      <Col span={4} className="cart-col" >
                        {book.publishedAt}
                      </Col>
                      <Col span={4} className="cart-col" >
                        {book.quantity}
                      </Col>
                    </Row>
                  </>
              ))
              }
              </div>
            </Panel>
            <Row>
            <Row className="cost" justify="end" gutter={16}>
              <Col justfy="end" span={4} className="cart-col" >
                <b>Total Cost:</b> {order.at(-1)?.total}$
              </Col>
            </Row>
            </Row>
            <Divider/>
          </Collapse>
        </Fragment>
        ) :
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{
            height: 60,
          }}
          description="No Orders are placed yet."
        >
        <Link to="/cart" >
          <Button type="primary">Order Now</Button>
        </Link>
        </Empty>
      }
    </Fragment>
  );
}

export default Order;

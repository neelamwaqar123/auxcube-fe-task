import React, { Fragment, useEffect, useState } from 'react';
import {
  Button,
  Divider,
  Empty,
  notification,
  PageHeader,
  Typography,
  Row,
  Col,
} from 'antd';
import Cookies from 'js-cookie';
import {Link} from "react-router-dom";

const { Title, Text } = Typography;

const Cart = () => {
  const [myCart, setMyCart] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    Cookies.get('cart') && setMyCart(JSON.parse(Cookies.get("cart")));
  }, []);

  console.log(myCart)

  useEffect(() => {
    Cookies.set("cart", JSON.stringify(myCart));
    let total = 0;
    for (var i = 0 ; i <= myCart.length; i++) {
      if (myCart[i]?.price && myCart[i]?.quantity) {
        total = total + myCart[i]?.price * myCart[i]?.quantity;
      }
    }
    setTotalCost(total);
  }, [myCart]);

  console.log(totalCost);

  const placeOrder = () => {
    let cart = JSON.parse(Cookies.get('cart'));
    if (Cookies.get("order") && JSON.parse(Cookies.get('order'))) {
      let order = JSON.parse(Cookies.get('order'));
      let newOrder = [...order, [...cart, {total: totalCost}]];
      Cookies.set('order', JSON.stringify(newOrder));
    } else {
      let order = [[...cart, {total: totalCost}]];
      Cookies.set('order', JSON.stringify(order));
    }
    Cookies.set('cart', []);
    setMyCart([]);
  };

  const deleteFromCart = (cart) => {
    if (cart.quantity > 1) {
      setMyCart(myCart.map(mc => mc.id == cart.id ? {...mc, quantity: mc.quantity-1} : mc));
    } else {
      setMyCart(myCart.filter(mc => mc.id !== cart.id));
    }
  };

  const openNotification = placement => {
    notification.info({
      message: `Order Information`,
      description: 'Your Order has been placed',
      placement,
    });
  };

  return (
    <Fragment>
      <PageHeader
        className="site-page-header"
        title="My Cart"
      />
      <Divider />
      { myCart.length ? (
        <>
        <div className="cart">
          <Row justify="center">
            <Col span={4} className="cart-col">
              <h1>Book Name</h1>
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
            <Col span={4} className="cart-col">
              <h1>Quantity</h1>
            </Col>
            <Col span={4} className="cart-col">
              <h1>Action</h1>
            </Col>
          </Row>
          <div>
            {myCart.length && myCart.map((cart, id) =>
                <>
                  <Row justify="center">
                    <Col span={4} className="cart-col">
                      {cart.title}
                    </Col>
                    <Col span={4} className="cart-col">
                      {cart.author}
                    </Col>
                    <Col span={4} className="cart-col">
                      {cart.price}$
                    </Col>
                    <Col span={4} className="cart-col">
                      {cart.publishedAT}
                    </Col>
                    <Col span={4} className="cart-col">
                      {cart.quantity}
                    </Col>
                    <Col span={4} className="cart-col">
                      <Button type="danger" onClick={() => deleteFromCart(cart)}>Remove From Cart</Button>
                    </Col>
                  </Row>
                  <Divider/>
                </>
              )}
        </div>
      </div>
      <Row justify="end">
        <Col span={5} className="cart-col">
          <b>Total Cost</b>: {totalCost}$
        </Col>
      </Row>
      <Link to="/thanks">
        <Button
          className="order"
          onClick={() => {
            placeOrder();
            openNotification('bottomRight');
          }}
        >Place Order</Button>
      </Link>
        </>
      ) :
        <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{
        height: 60,
      }}
        description="Your Cart is Empty. Click on the button to Add Books to Cart."
        >
        <Link to="/">
        <Button type="primary">Go To Home</Button>
        </Link>
        </Empty>}
    </Fragment>
  );
}
export default Cart;

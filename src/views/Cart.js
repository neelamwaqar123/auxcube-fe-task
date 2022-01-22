import React, { Fragment, useEffect, useState } from 'react';
import { Avatar, Button, List, notification } from 'antd';
import Cookies from 'js-cookie';


const Cart = () => {
  const [myCart, setMyCart] = useState([]);

  useEffect(() => {
    Cookies.get('cart') && setMyCart(JSON.parse(Cookies.get('cart')));
  }, []);

  useEffect(() => {
    Cookies.set("cart", JSON.stringify(myCart));
  }, [myCart]);


  const placeOrder = () => {
    if (Cookies.get('order')) {
      let order = JSON.parse(Cookies.get('order'));
      let cart = JSON.parse(Cookies.get('cart'));
      let newOrder = [...order, ...cart];
      Cookies.set('order', JSON.stringify(newOrder));
    } else {
      Cookies.set('order', Cookies.get('cart'));
    }
    Cookies.set('cart', []);
    setMyCart([]);
  };

  const deleteFromCart = (cart) => {
    setMyCart(myCart.filter(mc => mc.id !== cart.id));
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
      { myCart.length ?
        <>
          <List
            itemLayout="horizontal"
            dataSource={myCart}
            renderItem={cart => (
              <List.Item
                actions={[<Button onClick={()=>deleteFromCart(cart)}>Delte From Cart</Button>]}
              >
                <List.Item.Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random"/>}
                  title={cart.title}
                  description="2years ago"
                />
              </List.Item>
            )}
          />
          <Button onClick={() => {
            placeOrder();
            openNotification('bottomRight');
          }}>Place Order</Button>
        </>
         :
        "Your Cart is Empty"
      }
    </Fragment>
  );
}

export default Cart;

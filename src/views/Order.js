import React, { useEffect, useState } from 'react';
import {Avatar, List, Typography} from 'antd';
import Cookies from 'js-cookie';

const { Text } = Typography;

const Order = () => {
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    Cookies.get('order') && setMyOrders(JSON.parse(Cookies.get('order')))
  }, [])

  return (
    <>
      <h1>Ordereeeee</h1>
      <List
        itemLayout="horizontal"
        dataSource={myOrders}
        renderItem={order => (
          <List.Item
          >
            <List.Item.Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random"/>}
              title={order.title}
              description="2years ago"
            />
          </List.Item>
        )}
      />
    </>
  );
}

export default Order;

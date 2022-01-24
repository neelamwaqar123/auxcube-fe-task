import React, { useEffect, useState } from 'react';
import {Col, PageHeader, Typography, Divider, Row, notification, Modal, Button, Card} from 'antd';
import { Fragment } from 'react';
import {Link} from "react-router-dom";

const { Title } = Typography;

const Thankyou = () => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() =>{
    setModalVisible(true);
  }, []);

  return (
    <Fragment>
      <div className="content">
        <h1>Thankyou For Shopping.</h1>
        <p style={{fontSize:"40px", marginLeft:"60px" }}>We Appreciate You Shopping with us.</p>
        <div className="button">
            <Link to="/" >
              <Button  size="large" type="primary" >Shop More</Button>
            </Link>
            <Link to="/orders" >
              <Button size="large" type="primary" style={{marginLeft:"30px"}}>View Orders</Button>
            </Link>
        </div>
      </div>
    </Fragment>
  );
}

export default Thankyou;

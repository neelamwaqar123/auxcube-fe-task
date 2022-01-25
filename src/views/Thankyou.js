import React from 'react';
import { Button } from 'antd';
import { Fragment } from 'react';
import { Link } from "react-router-dom";

const Thankyou = () => {
  return (
    <Fragment>
      <div className="thankyou">
      <div className="content">
        <h1>Thankyou For Shopping.</h1>
        <p>We Appreciate You Shopping with us.</p>
        <div className="buttons">
            <Link to="/" >
              <Button  size="large" type="primary" >Shop More</Button>
            </Link>
            <Link to="/orders" >
              <Button size="large" type="primary" style={{marginLeft:"30px"}}>View Orders</Button>
            </Link>
        </div>
      </div>
      </div>
    </Fragment>
  );
};

export default Thankyou;

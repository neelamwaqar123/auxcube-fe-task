import React from 'react';
import Cookies from 'js-cookie';
import {Button, Card, Collapse, Divider, Empty, PageHeader, Typography, Col, Row} from 'antd';
import { Fragment } from 'react';
import {Link} from "react-router-dom";

const { Meta } = Card;

const BookCard = (props) => {
  const {
    id,
    publishedAt,
    author,
    genre,
    price,
    title,
    addToCart,
  } = props;

  return (
      <Card
        className="blog-card"
        hoverable
        style={{backgroundColor: "whitesmoke"}}
        title={title}
        actions={[
          <Button type="primary" onClick={addToCart}>Add To Cart</Button>
        ]}
      >
        <Meta
          description={
            <>
              <p>
                <b>Written By</b>: <span> {author} </span>
              </p>
              <p>
                <b>Genre</b>: <span> {genre} </span>
              </p>
              <p>
                <b>Published</b>: <span> {publishedAt} </span>
              </p>
              <p>
                <b>Price</b>: <span> {price}$ </span>
              </p>
            </>
          }
        />
      </Card>
    )

}

export default BookCard;

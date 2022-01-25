import React, {Fragment} from 'react';
import { Button, Card } from 'antd';
import moment from "moment";

const { Meta } = Card;

const BookCard = (props) => {
  const {
    publishedAt,
    author,
    genre,
    price,
    title,
    addToCart,
  } = props;

  return (
    <Fragment>
      <Card
        className="book-card"
        hoverable
        title={title}
        actions={[
          <Button type="primary" className='add-to-cart' onClick={addToCart}>Add To Cart</Button>
        ]}
      >
        <Meta
          description={
            <Fragment>
              <p>
                <b>Written By</b>: <span> {author} </span>
              </p>
              <p>
                <b>Genre</b>: <span> {genre} </span>
              </p>
              <p>
                <b>Published</b>: <span> {moment(publishedAt).fromNow()} </span>
              </p>
              <p>
                <b>Price</b>: <span> {price}$ </span>
              </p>
            </Fragment>
          }
        />
      </Card>
    </Fragment>
    )
}
export default BookCard;

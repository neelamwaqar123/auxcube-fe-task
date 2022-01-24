import React, { useEffect, useState } from 'react';
import {
  Col,
  PageHeader,
  Typography,
  Divider,
  Row,
  notification,
  Input,
  Spin,
  Result,
  Button,
} from 'antd';
import { Fragment } from 'react';
import axios from 'axios';
import BookCard from "../components/Book/BookCard";
import Cookies from "js-cookie";
import moment from "moment";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [recallApi, setRecallApi] = useState(false);


  useEffect(() =>{
    axios.get("https://61e9739a7bc0550017bc62ca.mockapi.io/books")
      .then(response => {
        setIsLoading(false);
        let transformedBooks = response?.data?.map(book => book.publishedAt ? {...book, publishedAt: moment(book.publishedAt).fromNow()} : book);
        setBooks(transformedBooks);
      })
      .catch(error => {
        setIsLoading(false);
        setError(error);
      })
  }, [recallApi]);

  console.log(books);

  const addToCart = (book) => {
    if (Cookies.get("cart") && JSON.parse(Cookies.get("cart")) !== []) {
      let cart = JSON.parse(Cookies.get('cart'));
      const exists = cart.some(function(eBook) {
        return eBook.id === book.id;
      });
      if (exists) {
        cart.map(crt => crt.id === book.id && (crt.quantity = crt.quantity +1))
      } else {
        cart = [...cart, {...book, quantity: 1}]
      }
      Cookies.set('cart', JSON.stringify(cart))
    } else {
      Cookies.set('cart', JSON.stringify([{...book, quantity: 1}]));
    }
  };

  const openNotification = () => {
    notification.open({
      message: `Cart Information`,
      description: 'Book has been added to your cart.',
    });
  };

  return (
      <Fragment>
        <PageHeader
          className="site-page-header"
          title="Books"
          ghost={false}
          subTitle="Available Books"
          extra={[
            <Input placeholder="Search Book"/>,
          ]}
        />
        <Divider />
        <Row>
          <Col span={24}>
            <Row gutter={[24, 24]} justify="center">
              { isLoading  ? <Spin tip="Books Loading...">
              </Spin> :
                books.length>1 ? books?.map((book) => (
                    <Col key={book.id} xs={18} sm={12} md={8} lg={6} xl={4} xxl={3}>
                        <BookCard
                          id={book.id}
                          publishedAt={book.publishedAt}
                          title={book.title}
                          genre={book.genre}
                          author={book.author}
                          price={book.price}
                          addToCart={() => {
                            addToCart(book);
                            openNotification();
                          }}
                        />
                    </Col>
                  ))
                  : error &&
                  <Result
                    status="404"
                    title="404 Not Found"
                    subTitle="Something went wrong while fetching books."
                    extra={<Button onClick={() => setRecallApi(!recallApi)} type="primary">Try Again</Button>}
                  />
              }
            </Row>
          </Col>
        </Row>
      </Fragment>
  );
}
export default Home;

import React, { useEffect, useState } from 'react';
import {
  Col,
  PageHeader,
  Divider,
  Row,
  notification,
  Input,
  Spin,
  Result,
  Button,
  message,
} from 'antd';
import { Fragment } from 'react';
import axios from 'axios';
import BookCard from "../components/Book/BookCard";
import Cookies from "js-cookie";
import moment from "moment";

const Home = () => {
  function debounce(func, wait) {
    let timeout;
    return function(...args) {
      if (!args.includes("")) {
        message.info({
          type: 'error',
          content: "Books with" + (args) +" are being searched",
          duration: 1,
        });
      };
      const context = this;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context, args);
      }, wait);
    };
  };

  const onBookSearch = (text) => {
    console.log(text);
    Cookies.set("searchText", text)
    axios.get("https://61e9739a7bc0550017bc62ca.mockapi.io/books?title="+text)
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        message.error({
          type: 'error',
          content: "Something went wrong while Searching Books",
          duration: 1,
        });
      });
  };

  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [recallApi, setRecallApi] = useState(false);
  const debounceOnChange = React.useCallback(debounce(onBookSearch, 1000), []);

  useEffect(() => {
    console.log(Cookies.get("searchText"));
  }, []);

  useEffect(() => {
    axios.get("https://61e9739a7bc0550017bc62ca.mockapi.io/books")
      .then(response => {
        setIsLoading(false);
        let transformedBooks = response?.data?.map(book => book.publishedAt ? {...book, publishedAt: moment(book.publishedAt).fromNow()} : book);
        setBooks(transformedBooks);
      })
      .catch(error => {
        setIsLoading(false);
        setError(error);
        message.error({
          type: 'error',
          content: "Something went wrong while Fetching Books",
          duration: 1,
        });
      })
  }, [recallApi]);

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
            <Input onChange={(e) => debounceOnChange(e.target.value)} placeholder="Search Book"></Input >,
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
                    subTitle="Books Not Found."
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

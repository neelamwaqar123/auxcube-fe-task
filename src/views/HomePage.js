import React, { useEffect, useState } from 'react';
import {
  Col,
  PageHeader,
  Divider,
  Row,
  Input,
  Spin,
  Result,
  Button,
  message,
} from 'antd';
import { Fragment } from 'react';
import axios from 'axios';
import BookCard from "../components/Book/BookCard";
import ShoppingModal from "../components/HomePage/ShoppingModal";
import Cookies from "js-cookie";

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [recallApi, setRecallApi] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showBooks, setShowBooks] = useState(false);

  const debounce = (func, wait) => {
    let timeout;
    return function(...args) {
      const context = this;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = null;
        if (!args.includes("")) {
          message.info({
            type: 'error',
            content: "Books with " + (args) +" are being searched",
            duration: 1,
          });
        };
        func.apply(context, args);
      }, wait);
    };
  };

  const onBookSearch = (text) => {
    Cookies.set("searchText", text);
    if (text === "") {
      setIsLoading(true);
      axios.get("https://61e9739a7bc0550017bc62ca.mockapi.io/books")
        .then(response => {
          setIsLoading(false);
          setBooks(response.data);
        })
        .catch(error => {
          setBooks([]);
          setIsLoading(false);
          message.error({
            type: 'error',
            content: "Something went wrong while Fetching Books",
            duration: 1,
          });
        })
    } else {
      axios.get("https://61e9739a7bc0550017bc62ca.mockapi.io/books?title="+text)
        .then(response => {
          if (response.data.length === 0) {
            message.error({
              type: 'error',
              content: "Books with "+ text + " not found.",
              duration: 1,
            });
          };
          setBooks(response.data);
        })
        .catch(error => {
          setBooks([]);
          message.error({
            type: 'error',
            content: "Something went wrong while Searching Books",
            duration: 1,
          });
        });
    }
  };

  const debounceOnChange = React.useCallback(debounce(onBookSearch, 1000), []);

  useEffect(() => {
    if (!showBooks && Cookies.get("searchText") && Cookies.get("searchText") !== (undefined || null)) {
      setIsSearchLoading(true)
      setSearchText(Cookies.get("searchText"))
      axios.get("https://61e9739a7bc0550017bc62ca.mockapi.io/books?title=" + Cookies.get("searchText"))
        .then(response => {
          setIsSearchLoading(false);
          setBooks(response.data);
        })
        .catch(error => {
          setBooks([]);
          setIsSearchLoading(false);
          message.error({
            type: 'error',
            content: "Something went wrong while Searching Books",
            duration: 1,
          });
        });
    } else {
      setIsLoading(true);
      setSearchText("");
      Cookies.set("searchText", "");
      axios.get("https://61e9739a7bc0550017bc62ca.mockapi.io/books")
        .then(response => {
          setIsLoading(false);
          setBooks(response.data);
        })
        .catch(error => {
          setBooks([]);
          setIsLoading(false);
          message.error({
            type: 'error',
            content: "Something went wrong while Fetching Books",
            duration: 1,
          });
        });
    };
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
      };
      Cookies.set('cart', JSON.stringify(cart))
    } else {
      Cookies.set('cart', JSON.stringify([{...book, quantity: 1}]));
    };
    setModalVisible(true);
  };

  return (
    <Fragment>
      <ShoppingModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
      <PageHeader
        className="site-page-header"
        title="Books"
        ghost={false}
        subTitle="List of books"
        extra={[
          <Input value={searchText} onChange={(e) => {
            setSearchText(e.target.value);
            debounceOnChange(e.target.value);
          }} placeholder="Enter to search books" />,
        ]}
      />
      <Divider />
      <Row>
        <Col span={24}>
          <Row gutter={[24, 24]} justify="center">
            { isSearchLoading || isLoading ?
              <Spin tip="Books Loading..." />
              :
              books.length >= 1 ? books?.map((book, id) => (
                  <Col key={id} xs={18} sm={12} md={8} lg={6} xl={4} xxl={3}>
                      <BookCard
                        id={book.id}
                        publishedAt={book.publishedAt}
                        title={book.title}
                        genre={book.genre}
                        author={book.author}
                        price={book.price}
                        addToCart={() => {
                          addToCart(book);
                          message.success({
                            type: 'success',
                            content: 'Book has been added to your cart.',
                            duration: 1,
                          });
                        }}
                      />
                  </Col>
                ))
                : books.length === 0 &&
                <Result
                  status="404"
                  title="404 Not Found"
                  subTitle="Books Not Found."
                  extra={<Button onClick={() => {
                    setRecallApi(!recallApi);
                    setShowBooks(true);
                  }

                  } type="primary">Show All Books</Button>}
                />
            }
          </Row>
        </Col>
      </Row>
    </Fragment>
  );
}
export default Home;

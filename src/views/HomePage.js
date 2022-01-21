import React, { useEffect, useState } from 'react';
import { Col, Divider, PageHeader, Typography } from 'antd';
import axios from 'axios';
import BookCard from "../components/Book/BookCard";

const { Text } = Typography;

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() =>{
    axios.get("https://61e9739a7bc0550017bc62ca.mockapi.io/books")
      .then(response =>{
        console.log(response.data)
        setBooks(response.data)
      })
      .catch(error =>{
        console.log(error)
      })
  }, [])

  return (
    <>
        <PageHeader
          className="site-page-header"
          title="Books"
        />
        <Divider />
        { books ? <BookCard books={books}/> : <Text>No Books Exist.</Text> }
    </>
  );
}

export default Home;

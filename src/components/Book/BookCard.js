import React from 'react';
import Cookies from 'js-cookie';
import { List, Avatar, Button } from 'antd';

const BookCard = (props) => {
  const { books } = props;

  const addToCart = (book) => {
    if (Cookies.get("cart")) {
      let cart = JSON.parse(Cookies.get('cart'))
      cart = [...cart, book]
      Cookies.set('cart', JSON.stringify(cart))
    } else {
      Cookies.set('cart', JSON.stringify([book]))
    }
    console.log(Cookies.get('cart'))
  };

  return (
   <>
     <List
       itemLayout="horizontal"
       dataSource={books}
       renderItem={book => (
         <List.Item
           actions={[<Button onClick={()=>addToCart(book)}>Add To Cart</Button>]}
         >
           <List.Item.Meta
             avatar={<Avatar src="https://joeschmoe.io/api/v1/random"/>}
             title={book.title}
             description="2years ago"
           />
         </List.Item>
       )}
     />
   </>
  );
}
export default BookCard;

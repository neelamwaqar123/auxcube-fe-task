import React from 'react';
import { List, Avatar } from 'antd';

const BookCard = (props) => {
  const { books } = props;

  return (
   <>
     <List
       itemLayout="horizontal"
       dataSource={books}
       renderItem={item => (
         <List.Item>
           <List.Item.Meta
             avatar={<Avatar src="https://joeschmoe.io/api/v1/random"/>}
             title={item.title}
             description="2years ago"
           />
         </List.Item>
       )}
     />
   </>
  );
}

export default BookCard;

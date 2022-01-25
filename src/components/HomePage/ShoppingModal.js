import React from 'react';
import { Modal, Button, Row, Col, Typography } from 'antd';
import { Link } from "react-router-dom"

const ShoppingModal = ({ modalVisible, setModalVisible }) => {
  const { Text } = Typography;
  return (
    <Modal
      title="Book added to cart"
      centered
      visible={modalVisible}
      footer={null}
      onCancel={() => setModalVisible(false)}
    >
      <Row justify='center'>
        <Col>
          <Text>Thankyou for shopping with us, we appreciate it.</Text>
        </Col>
      </Row>
      <Row justify="center" className='modal-btns'>
        <Button
          type='primary'
          className='modal-btn'
          onClick={() => setModalVisible(false)}
        >Continue Shopping</Button>
        <Link to="/cart">
          <Button
            className='modal-btn'
            type='primary'
          >Goto Cart</Button>
        </Link>
      </Row>
    </Modal>
  );
}

export default ShoppingModal;

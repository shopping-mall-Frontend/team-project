import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

const Container = styled.div``;

const OrderPage = ({ cart, setCart }) => {
  console.log(cart);
  return (
    <Container>
      <Header />
      <Navbar />
      {cart.map((item) => (
        <div key={item.id}>
          <span>{item.title}</span>
          <span>{item.price}</span>
          <span>{item.thumbnail}</span>
        </div>
      ))}
    </Container>
  );
};

export { OrderPage };

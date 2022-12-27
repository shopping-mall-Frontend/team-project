import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import reset from '../css/reset-css.css';
import styles from '../css/CartPage.module.css';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { CartHeader, CartList } from '../components/Cart';

const Container = styled.div``;
const Step = styled.ul``;
const Products = styled.section``;
const Price = styled.div``;

const CartPage = () => {
  let cart = [];
  const ssesionData = JSON.parse(sessionStorage.getItem('cart'));
  if (ssesionData !== null) {
    cart = ssesionData;
  }
  return (
    <Container>
      <Header />
      <Navbar />
      <Step className={styles.step}>
        <li>01 SHOPPING BAG</li>
        <li>02 ORDER</li>
        <li>03 ORDER CONFIRMED</li>
      </Step>
      <Products className={styles.productwrap}>
        <CartHeader className={styles.carthead}></CartHeader>
        {cart.length === 0 ? (
          <div>
            <h2>장바구니에 상품이 없습니다.</h2>
            <h2>상품을 담아주세요.</h2>
          </div>
        ) : (
          cart.map((cart) => (
            <CartList
              className={styles.cartlist}
              key={cart.id}
              cart={cart}
            ></CartList>
          ))
        )}
      </Products>
      <button className={styles.cartlist} type="button">
        선택상품삭제
      </button>
      <Price className={styles.prices}>
        <ol>
          <li>
            <div>상품금액</div>
            <span>??,???원</span>
          </li>
          <li>
            <div>배송비</div>
            <span>2,500원</span>
          </li>
          <li>
            <div>총 상품금액</div>
            <span>??,???원</span>
          </li>
        </ol>
        <Link to={'/order'}>
          <button>주문하기</button>
        </Link>
      </Price>
    </Container>
  );
};

export { CartPage };

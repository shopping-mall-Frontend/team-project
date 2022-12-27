import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import styles from '../css/CartPage.module.css';
import Header from '../components/Header';
import { CartHeader, CartList } from '../components/Cart';

const Container = styled.div``;
const Step = styled.ul``;
const Products = styled.section``;
const Price = styled.div``;

const CartPage = ({ cart }) => {
  console.log(cart);
  return (
    <Container>
      <Header />
      <Link to={`/`}>
        <button>메인</button>
      </Link>
      <Link to={`/product`}>
        <button>제품 목록</button>
      </Link>
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
          cart.map((cart) => <CartList className={styles.cartlist} key={cart.id} cart={cart}></CartList>)
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
        <button className={styles.btn} type="button">
          주문하기
        </button>
      </Price>
    </Container>
  );
};

export { CartPage };

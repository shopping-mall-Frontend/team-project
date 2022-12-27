import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import reset from '../css/reset-css.css';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { CartHeader, CartList } from '../components/Cart';

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
      <Step>
        <li>01 SHOPPING BAG</li>
        <li>02 ORDER</li>
        <li>03 ORDER CONFIRMED</li>
      </Step>
      <Products>
        <CartHeader></CartHeader>
        {cart.length === 0 ? (
          <div>
            <h2>장바구니에 상품이 없습니다.</h2>
            <h2>상품을 담아주세요.</h2>
          </div>
        ) : (
          cart.map((cart) => <CartList key={cart.id} cart={cart}></CartList>)
        )}
      </Products>
      <button type="button">선택상품삭제</button>
      <Price>
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

const Container = styled.div``;
const Step = styled.ul`
  display: flex;
  justify-content: center;
  gap: 10px;

  width: fit-content;
  margin: 0 auto 50px;
  padding: 20px;
  color: rgb(181, 176, 176);

  li:first-child {
    font-weight: 700;
    color: #000;
  }

  li + li::before {
    content: '<';
    margin-right: 10px;
  }
`;
const Products = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;

  margin: 0 50px 20px;
  border-top: 3px solid #000;
  border-bottom: 3px solid #000;
`;
const Price = styled.div`
  width: 300px;
  margin-right: 80px;
  margin-left: auto;
  padding: 30px;

  text-align: right;

  ol {
    margin-bottom: 30px;
  }

  ol li {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  ol li div {
    width: 70px;
    text-align: right;
  }
`;

export { CartPage };

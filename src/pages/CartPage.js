import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import reset from '../css/reset-css.css';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

const CartPage = () => {
  let cart = [];
  const getSsesionData = JSON.parse(sessionStorage.getItem('cart'));
  if (getSsesionData !== null) {
    cart = getSsesionData;
  }

  const setSsesionData = (cart) => {
    sessionStorage.setItem('cart', JSON.stringify(cart));
  };

  const handleOrder = (cart, check) => {
    const orderItem = {
      id: cart.id,
      title: cart.title,
      price: cart.price,
      thumnail: cart.thumbnail,
      quantity: cart.quantity,
      checked: check,
    };
  };

  return (
    <div>
      <Header />
      <Navbar />
      <Wrap>
        <Table>
          <CartHeader>
            <input type="checkbox" name="select-all" />
            <span>상품정보</span>
            <span>수량</span>
            <span>주문금액</span>
          </CartHeader>
          {cart.length === 0 ? (
            <div>
              <h2>장바구니에 상품이 없습니다.</h2>
              <h2>상품을 담아주세요.</h2>
            </div>
          ) : (
            cart.map((cart) => (
              <CartList key={cart.id} cart={cart}>
                <input type="checkbox" name={`select-${cart.id}`} />
                <img src={cart.thumbnail} alt="상세이미지" />
                <p>{cart.title}</p>
                <div>
                  <span>{cart.quantity}</span>
                </div>
                <span>{cart.price * cart.quantity}원</span>
              </CartList>
            ))
          )}
        </Table>
        <button type="button">선택상품삭제</button>
        <Price>
          <ol>
            <li>
              <div>상품금액</div>
              <span>??,???원</span>
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
      </Wrap>
    </div>
  );
};

const Wrap = styled.main``;

const CartHeader = styled.div`
  border-bottom: 1px solid #000;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  padding: 20px 30px;
`;

const CartList = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 30px;
`;

const Table = styled.div`
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

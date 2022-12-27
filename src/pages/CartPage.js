import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import reset from '../css/reset-css.css';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

const CartPage = () => {
  /////////////// 세션 스토리지 ///////////////
  let cart = [];
  const getSsesionData = JSON.parse(sessionStorage.getItem('cart'));
  if (getSsesionData !== null) {
    cart = getSsesionData;
  }
  const setSsesionData = (cart) => {
    sessionStorage.setItem('cart', JSON.stringify(cart));
  };

  /////////////// 체크 박스 ///////////////////
  const [checkItems, setCheckItems] = useState([]);

  // 전체 체크
  const handelCheckedAll = (checked) => {
    if (checked) {
      const checkedListArray = [];
      cart.forEach((element) => checkedListArray.push(element));
      setCheckItems(checkedListArray);
    } else {
      setCheckItems([]);
    }
  };

  // 개별 체크
  const handleCheckedSingle = (checked, cart) => {
    if (checked) {
      setCheckItems([...checkItems, cart]);
    } else {
      setCheckItems(checkItems.filter((el) => el.id !== cart.id));
    }
  };

  /////////////// 총 금액 ///////////////////
  const priceArr = checkItems.map((el) => el.price);
  let totalPrice = 0;
  priceArr.forEach((price) => {
    totalPrice += price;
  });

  const handleCheckedDelete = () => {
    console.log('선택 상품 삭제!');
  };

  return (
    <div>
      <Header />
      <Navbar />
      <Wrap>
        <Table>
          <CartHeader>
            <input
              type="checkbox"
              onChange={(e) => handelCheckedAll(e.target.checked)}
              checked={checkItems.length === cart.length ? true : false}
              value={cart || ''}
            />
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
                <input
                  type="checkbox"
                  name={`select-${cart.id}`}
                  onChange={(e) => handleCheckedSingle(e.target.checked, cart)}
                  checked={checkItems.map((el) => el.id).includes(cart.id) ? true : false}
                  value={cart || ''}
                />
                <img src={cart.thumbnail} alt="상세이미지" />
                <p>{cart.title}</p>
                <div>
                  <span>{cart.quantity}</span>
                </div>
                <span>${cart.price * cart.quantity}</span>
              </CartList>
            ))
          )}
        </Table>
        <button type="button" onClick={() => handleCheckedDelete()}>
          선택상품삭제
        </button>
        <Price>
          <ol>
            <li>
              <div>총 금액</div>
              <span>${totalPrice}</span>
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

const Wrap = styled.main`
  button {
    padding: 10px 40px;
    border: 1px solid #000;
  }
`;

const Table = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  margin: 0 50px 20px;
  border-top: 3px solid #000;
  border-bottom: 3px solid #000;
`;

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

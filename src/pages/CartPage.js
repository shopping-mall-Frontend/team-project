import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import reset from '../css/reset-css.css';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Step from '../components/Step';

const CartPage = () => {
  /////////////// 세션 스토리지 ///////////////
  let cart = [];
  const getSsesionData = JSON.parse(sessionStorage.getItem('cart'));
  if (getSsesionData !== null) {
    cart = getSsesionData;
  }

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

  const handleCheckedDelete = () => {
    console.log('선택 상품 삭제!');
  };

  /////////////// 총 금액 ///////////////////
  const priceArr = checkItems.map((el) => el.price);
  let totalPrice = 0;
  priceArr.forEach((price) => {
    totalPrice += price;
  });

  ////////// 결제 상품, 세션스토리지로 ////////
  sessionStorage.setItem('order', JSON.stringify());
  const setSsesionData = (orderProducts) => {
    sessionStorage.setItem('order', JSON.stringify(orderProducts));
  };

  return (
    <div>
      <Header />
      <Navbar />
      <Step />
      <Wrap>
        <ProductWrap>
          <Table>
            {cart.length === 0 ? (
              <Blank>
                <p>장바구니에 담은 상품이 없습니다.</p>
                <Link to={'/'}>
                  <button>CONTINUE SHOPPING</button>
                </Link>
              </Blank>
            ) : (
              <div>
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
                {cart.map((cart) => (
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
                ))}
              </div>
            )}
          </Table>
          <button type="button" onClick={() => handleCheckedDelete()}>
            선택상품삭제
          </button>
        </ProductWrap>
        <PriceWrap>
          <ol>
            <li>
              <div>총 금액</div>
              <span>${totalPrice}</span>
            </li>
          </ol>
          <Link to={'/order'}>
            <button onClick={() => setSsesionData(checkItems)}>주문하기</button>
          </Link>
        </PriceWrap>
      </Wrap>
    </div>
  );
};

const Wrap = styled.main`
  padding: 0 50px 200px;

  button {
    padding: 10px 40px;
    border: 1px solid #000;
    cursor: pointer;
  }
`;

const ProductWrap = styled.section``;

const Table = styled.div`
  margin-bottom: 40px;
  border-top: 4px solid #000;
  border-bottom: 4px solid #000;
`;

const Blank = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  padding: 100px 0;
  p {
    font-size: 30px;
    text-align: center;
  }
  button {
    padding: 20px 45px;
    font-size: 25px;
    font-weight: 700;
  }
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

const PriceWrap = styled.div`
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

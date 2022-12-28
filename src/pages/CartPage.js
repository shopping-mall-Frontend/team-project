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

  /////////////// 총 금액 ///////////////////
  const priceArr = checkItems.map((el) => el.price * el.quantity);
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
      <Container>
        {cart.length === 0 ? (
          <Blank>
            <p>Oops! Your cart is empty.</p>
            <Link to={'/'}>
              <button>CONTINUE SHOPPING</button>
            </Link>
          </Blank>
        ) : (
          <Wrap>
            <MyCartWrap>
              <h2>My Cart</h2>
              <ProductsTable>
                {cart.map((cart) => (
                  <CartList key={cart.id}>
                    <img src={cart.thumbnail} alt="상세이미지" />
                    <Info>
                      <p>{cart.title}</p>
                      <span>${cart.price}</span>
                    </Info>
                    <Quantity>
                      <button type="button">一</button>
                      <span>{cart.quantity}</span>
                      <button type="button">十</button>
                    </Quantity>
                    <span>${cart.price * cart.quantity}</span>
                    <button className="deleteBtn">✕</button>
                  </CartList>
                ))}
              </ProductsTable>
            </MyCartWrap>
            <OrderSummaryWrap>
              <h2>Order summary</h2>
              <Price>
                <li>
                  <span>Subtotal</span>
                  <span>${totalPrice}</span>
                </li>
                <li>
                  <span>Shipping </span>
                  <span>free</span>
                </li>
              </Price>
              <Total>
                <span>Total</span>
                <span>${totalPrice}</span>
              </Total>
              <LinkWrap>
                <Link to={'/order'}>
                  <button onClick={() => setSsesionData(checkItems)}>CHECK OUT</button>
                </Link>
              </LinkWrap>
            </OrderSummaryWrap>
          </Wrap>
        )}
      </Container>
    </div>
  );
};

const Container = styled.main`
  padding-bottom: 130px;
  button {
    cursor: pointer;
  }
`;

const Blank = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  margin: 0 100px;
  padding: 100px 0;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;

  p {
    font-size: 25px;
  }

  button {
    padding: 15px 35px;
    font-size: 15px;
  }

  button:hover {
    font-weight: 700;
  }
`;

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 80px;

  h2 {
    margin-bottom: 15px;
    font-size: 21px;
  }
`;

//My Cart 스타일
const MyCartWrap = styled.section`
  width: 670px;
`;

const ProductsTable = styled.div`
  border-top: 1px solid #000;
`;

const CartList = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #000;

  img {
    width: 120px;
    height: 140px;
  }

  .deleteBtn {
    color: rgba(0, 0, 0, 0.6);
    font-weight: 700;
  }
`;

const Info = styled.div`
  p {
    width: 254px;
    margin-bottom: 30px;
  }
`;
const Quantity = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;

  width: 80px;
  height: 25px;
  border: 1px solid #000;
`;

//Order Summary 스타일
const OrderSummaryWrap = styled.aside`
  width: 280px;
`;

const Price = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 30px;

  padding: 40px 0;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;

  li {
    display: flex;
    justify-content: space-between;
  }
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
  padding-top: 30px;

  font-size: 20px;
`;

const LinkWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;

  button {
    width: 100%;
    padding: 12px;
    border: 1px solid #000;

    font-size: 16px;
  }

  button:hover {
    font-weight: 700;
  }
`;

export { CartPage };

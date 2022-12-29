import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import reset from '../css/reset-css.css';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Step from '../components/Step';

const CartPage = () => {
  /////////////// 세션 스토리지 조회 ///////////////
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const getSsesionData = () => {
      const json = JSON.parse(sessionStorage.getItem('cart'));
      if (json !== null) {
        setCart(json);
      }
    };
    getSsesionData();
  }, []);

  ////////// 세션스토리지에 값 전달 //////////////////
  sessionStorage.setItem('order', JSON.stringify());
  const setSsesionData = (key, productArray) => {
    sessionStorage.setItem(key, JSON.stringify(productArray));
  };

  /////////////// 총 금액 ////////////////////////
  let totalPrice = 0;
  const priceArray = cart.map((el) => el.price * el.quantity);
  priceArray.forEach((price) => {
    return (totalPrice += price);
  });

  /////////////// 삭제 버튼 //////////////////////
  const handleDeleteCart = (event) => {
    const deletedcart = cart.filter((element) => element.id !== event.target.parentElement.id);
    setCart(deletedcart);
    setSsesionData('cart', deletedcart);
  };

  /////////////// 수량 버튼, 입력 //////////////////////
  const onChangeQuantity = (id, value, key = 'quantity') => {
    const product = cart.filter((element) => element.id === id);
    product[0].quantity = value;
    setSsesionData('cart', cart);
  };

  //수량 입력
  const handleQuantityInput = (e) => {
    onChangeQuantity(e.target.closest('li').id, e.target.value);
  };

  //수량 증가
  const handleQuantityIncrease = (e) => {
    e.target.previousElementSibling.value = parseInt(e.target.previousElementSibling.value) + 1;
    onChangeQuantity(e.target.closest('li').id, e.target.previousElementSibling.value);
  };

  //수량 감소
  const handleQuantityDecrease = (e) => {
    if (e.target.nextElementSibling.value <= 1) {
      e.preventDefault();
      console.log('1 이하는 안돼욧!');
    }
    e.target.nextElementSibling.value = parseInt(e.target.nextElementSibling.value) - 1;
    onChangeQuantity(e.target.closest('li').id, e.target.nextElementSibling.value);
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
                  <CartList key={cart.id} id={cart.id}>
                    <img src={cart.thumbnail} alt="상세이미지" />
                    <Info>
                      <p>{cart.title}</p>
                      <span>${cart.price.toLocaleString()}</span>
                    </Info>
                    <Quantity>
                      <button type="button" onClick={handleQuantityDecrease}>
                        一
                      </button>
                      <input type="text" maxLength="3" defaultValue={cart.quantity} onChange={handleQuantityInput} />
                      <button type="button" onClick={handleQuantityIncrease}>
                        十
                      </button>
                    </Quantity>
                    <span>${(cart.price * cart.quantity).toLocaleString()}</span>
                    <button className="deleteBtn" onClick={(event) => handleDeleteCart(event)}>
                      ✕
                    </button>
                  </CartList>
                ))}
              </ProductsTable>
            </MyCartWrap>
            <OrderSummaryWrap>
              <h2>Order summary</h2>
              <Price>
                <li>
                  <span>Subtotal</span>
                  <span>${totalPrice.toLocaleString()}</span>
                </li>
                <li>
                  <span>Shipping </span>
                  <span>free</span>
                </li>
              </Price>
              <Total>
                <span>Total</span>
                <span>${totalPrice.toLocaleString()}</span>
              </Total>
              <LinkWrap>
                <Link to={'/order'}>
                  <button onClick={() => setSsesionData('order', cart)}>CHECK OUT</button>
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
  min-width: 580px;
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
  justify-content: space-between;

  width: 95px;
  height: 30px;
  border: 1px solid #000;

  font-size: 12px;

  input {
    width: 30px;
    text-align: center;
    font-size: 14px;
  }

  button {
    padding: 0 8px;
  }

  .btn-disabled {
    color: #dfdfdf;
  }
`;

//Order Summary 스타일
const OrderSummaryWrap = styled.aside`
  width: 280px;
  min-width: 180px;
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

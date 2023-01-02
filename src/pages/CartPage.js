import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import reset from '../css/reset-css.css';
import { auth } from '../utils/useAPI';
import Header from '../components/Header';
import Step from '../components/Step';
import Footer from '../components/Footer';
import Loading from '../components/Loading';

const CartPage = () => {
  const [loading, setLoading] = useState(true);

  /////////////// 세션 스토리지 조회 ///////////////
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const getSsesionData = () => {
      setLoading(true);
      const json = JSON.parse(sessionStorage.getItem('cart'));
      if (json !== null) {
        setCart(json);
        setLoading(false);
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
  //수량이 1이하일 때 감소버튼, 10 이상일 떄 증가버튼 비활성화
  const liEl = document.querySelectorAll('.cartlist');
  liEl.forEach((data) => {
    const handleDecreaseIdArray = cart.filter((item) => item.quantity == 1).map((item) => item.id);
    handleDecreaseIdArray.map((id) => {
      if (id == data.id) {
        data.querySelectorAll('.decreaseBtn')[0].disabled = true;
      }
    });
    const handleIncreaseIdArray = cart.filter((item) => item.quantity >= 10).map((item) => item.id);
    handleIncreaseIdArray.map((id) => {
      if (id == data.id) {
        data.querySelectorAll('.increaseBtn')[0].disabled = true;
      }
    });
  });

  const onChangeQuantity = (id, value) => {
    let findIndex = cart.findIndex((item) => item.id === id);
    let copiedCart = [...cart];
    copiedCart[findIndex].quantity = value;
    setCart(copiedCart);
    setSsesionData('cart', cart);
  };

  //수량 입력
  const handleQuantityInput = (e) => {
    if (e.target.value == '' || e.target.value == 0) {
      e.target.value = 1;
    }
    onChangeQuantity(e.target.closest('li').id, e.target.value);
  };

  const characterCheck = useCallback((e) => {
    // console.log(e);
    if (e.key === '-' || e.key === '+' || e.key === '.' || e.key === 'e') e.preventDefault();
  }, []);

  //수량 증가
  const handleQuantityIncrease = (e) => {
    let liEl = e.target.previousElementSibling;

    //버튼동작시에 수량 10이면 비활성화
    if (liEl.value >= 9) {
      e.target.disabled = true;
    }

    //버튼 동작시에 수량이 2이상이면, 수량 감소 버튼 활성화
    if (parseInt(liEl.value) >= 1) {
      liEl.previousElementSibling.disabled = false;
    }

    liEl.value = parseInt(liEl.value) + 1;
    onChangeQuantity(e.target.closest('li').id, liEl.value);
  };

  //수량 감소
  const handleQuantityDecrease = (e) => {
    let liEl = e.target.nextElementSibling;

    //버튼동작시에 수량 1이면 비활성화
    if (liEl.value <= 2) {
      e.target.disabled = true;
    }

    //버튼동작시에 수량이 9 이하면, 수량 증가 버튼 활성화
    if (parseInt(liEl.value) <= 11) {
      liEl.nextElementSibling.disabled = false;
    }

    liEl.value = parseInt(liEl.value) - 1;
    onChangeQuantity(e.target.closest('li').id, liEl.value);
  };

  /////////////// 비회원 주문하기 차단 //////////////////////
  const navigate = useNavigate();

  const [user, setUser] = useState(false);
  useEffect(() => {
    const getUserauth = async () => {
      const json = await auth();
      setUser(json);
    };
    getUserauth();
  }, []);

  const confirmAuth = () => {
    setSsesionData('order', cart);
    if (user) {
      navigate('/order');
    } else {
      navigate('/login');
    }
  };

  return (
    <div>
      <Header />
      <Step style={`step1`} />
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
                  <CartList key={cart.id} id={cart.id} className="cartlist">
                    <Link to={`/product/${cart.id}`}>
                      <img src={cart.thumbnail} alt="상세이미지" />
                    </Link>
                    <Info>
                      <p>{cart.title}</p>
                      <span>${cart.price.toLocaleString()}</span>
                    </Info>
                    <Quantity>
                      <button type="button" className="decreaseBtn" onClick={handleQuantityDecrease}>
                        一
                      </button>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        className="quantityInput"
                        defaultValue={cart.quantity}
                        onChange={handleQuantityInput}
                        onKeyDown={characterCheck}
                      />
                      <button type="button" className="increaseBtn" onClick={handleQuantityIncrease}>
                        十
                      </button>
                    </Quantity>
                    <Calculated>${(cart.price * cart.quantity).toLocaleString()}</Calculated>
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
              <OrderBtn>
                <button onClick={confirmAuth}>CHECK OUT</button>
              </OrderBtn>
            </OrderSummaryWrap>
          </Wrap>
        )}
        {loading && <Loading />}
      </Container>
      <Footer />
    </div>
  );
};

const Container = styled.main`
  width: 1200px;
  margin: 0 auto;
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
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input:invalid {
    border: 3px solid red;
  }
  button {
    padding: 0 8px;
  }
  .btn-disabled {
    color: #dfdfdf;
  }
`;

const Calculated = styled.div`
  width: 60px;
  text-align: center;
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

const OrderBtn = styled.div`
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

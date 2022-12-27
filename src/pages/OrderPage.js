import Header from "../components/Header";
import { AddAccount } from "../components/AddAccount";
import React, { useEffect, useState } from "react";
import { getAccount, auth, buyProduct } from "../utils/useAPI";
import styled from "styled-components";

const OrderPage = ({ cart }) => {
  const [user, setUser] = useState(false);

  // 선택 가능 은행 리스트
  const [holdBankList, setHoldBankList] = useState([]);
  // 구매 제품 목록
  const [product, setProduct] = useState([]);
  // 토탈 구매 금액
  const [totalPrice, setTotalPrice] = useState(0);
  // 선택 계좌 아이디
  const [accountId, setAccountId] = useState("");

  useEffect(() => {
    const userBank = async () => {
      const userInfo = await auth();
      const selectBank = await getAccount("banks");

      setUser(userInfo);
      setHoldBankList(selectBank.filter((e) => e.disabled === true));
      setProduct(cart);
      setTotalPrice(
        cart.map((e) => {
          let price = 0;
          price += e.price;

          return price;
        })
      );
    };

    userBank();
  }, [cart]);

  useEffect(() => {
    const getAccid = async () => {
      const allBankList = await getAccount();
      allBankList.accounts.forEach((e) => {
        if (e.bankCode === accountId) {
          return setAccountId(e.id);
        }
      });
    };
    getAccid();
  }, [accountId]);

  // 결제
  const payment = () => {
    if (window.confirm("정말 구매하시겠습니까 ?")) {
      try{
        console.log('start')

        cart.forEach((e) => {
          let body = JSON.stringify({
            productId: e.id,
            accountId: accountId,
          });
        
          buyProduct(body);
        })

        console.log()
      }catch(err){
        console.log(err)
      }finally{
        console.log('done')
      }
    } else return
  };

  return (
    <>
      <Header user={user} />

      <Container>
        <section className="product-list">
          <ul>
            {product.map((item) => {
              return (
                <li key={item.id}>
                  <div>
                    <img src={item.thumnail} alt="제품 이미지" />
                    <p className="item-title">{item.title}</p>
                  </div>
                  <p>
                    상품 금액 : <span>{item.price} $</span>
                  </p>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="order-info">
          <div className="order-form">
            <p className="order-payment-method">결제 수단 선택</p>
            {holdBankList.length === 0 ? (
              <AddAccount />
            ) : (
              <select onChange={(e) => setAccountId(e.target.value)}>
                <option value="" key="100">
                  은행 선택
                </option>
                {holdBankList.map((bank) => {
                  return (
                    <option value={bank.code} key={bank.name}>
                      {bank.name}
                    </option>
                  );
                })}
              </select>
            )}
          </div>

          <div className="order-price">
            <p className="order-total-price">총 주문금액 : {totalPrice.toLocaleString()}$</p>
            <div className="order-price-info">
              <p>상품 금액 : {totalPrice.toLocaleString()}$</p>
            </div>
            <p>총 결제금액 : {totalPrice.toLocaleString()}$</p>
            <button
              onClick={() => {
                payment();
              }}
            >
              구매하기
            </button>
          </div>
        </section>
      </Container>
    </>
  );
};

const Container = styled.main`
  width: 1200px;
  margin: 0 auto;

  .product-list {
    ul {
      padding: 20px;
      border: 2px solid #111;
      border-right: 0;
      border-left: 0;
      margin-bottom: 20px;

      li {
        display: flex;
        justify-content: space-between;
        align-items: center;

        div {
          display: flex;
          align-items: center;
          gap: 20px;

          img {
            width: 150px;
          }
        }
      }
    }
  }

  .order-info {
    display: flex;
    gap: 20px;

    .order-form {
      width: 50%;

      .order-payment-method {
        padding: 20px 0 20px 20px;
        background: #000;
        color: #fff;
        font-size: 1.1rem;
        margin-bottom: 20px;
      }
    }

    .order-price {
      width: 50%;

      .order-total-price {
        padding: 20px 0 20px 20px;
        background: #000;
        color: #fff;
        font-size: 1.1rem;
        margin-bottom: 20px;
      }
    }
  }
`;

export { OrderPage };

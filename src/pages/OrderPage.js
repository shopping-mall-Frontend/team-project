import Header from '../components/Header';
import { AddAccount } from '../components/AddAccount';
import React, { useEffect, useState } from 'react'
import { getAccount, auth, getProductDetail } from '../utils/useAPI'
import styled from 'styled-components';

const OrderPage = ({cart}) => {
  const [user, setUser] = useState(false);

  const [bankList, setBankList] = useState([]);
  const [holdBankList, setHoldBankList] = useState([]);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const userBank = async() => {
      const userInfo = await auth();
      const selectBank = await getAccount('banks');

      setUser(userInfo);
      setBankList(selectBank)
      setHoldBankList(selectBank.filter(e => e.disabled === true))
      setProduct(cart)
    }

    userBank()
  }, [cart]);
  console.log(cart)

  return (
    <>
      <Header user={user}/>

      <Container>
        <section className='product-list'>
          <ul>
            {/* {
              product.map(item => {
                return(
                  <li key={item.id}>
                    <div>
                      <img src={item.thumbnail} alt="제품 이미지" />
                      <p className='item-title'>{item.title}</p>
                    </div>
                    <p>상품 금액 : <span>{item.price} $</span></p>
                  </li>
                )
              })
            } */}
          </ul>
        </section>

        <section className='order-info'>
          <div className='order-form'>
            <p className='order-payment-method'>결제 수단 선택</p>
              {
                holdBankList.length === 0 ? 
                <AddAccount/>
                :
                <select>
                {                
                  holdBankList.map((bank) => {
                    return(
                      <option value={bank.name} key={bank.name}></option>
                    )
                  })
                }
                </select>
              }
          </div>

          <div className='order-price'>
            <p className='order-total-price'>총 주문금액 : </p>
            <div className='order-price-info'>
              <p>상품 금액 : </p>
              <p>배송비 : 2500</p>
              <p>지역별 배송비</p>
            </div>
            <p>총 결제금액 : </p>
          </div>
        </section>
      </Container>
    </>
  )
}

const Container = styled.main`
  width:1200px;
  margin:0 auto;

  .product-list {
    
    ul {
      padding:20px;
      border:2px solid #111;
      border-right:0;
      border-left:0;
      margin-bottom:20px;

      li {
        display:flex;
        justify-content:space-between;
        align-items:center;

        div {
          display:flex;
          align-items:center;
          gap:20px;
          
          img {
            width:150px;
          }
        }
      }
    }
  }

  .order-info {
      display:flex;
      gap:20px;
      
      .order-form {
        width:50%;

        .order-payment-method{
          padding:20px 0 20px 20px;
          background:#000;
          color:#fff;
          font-size:1.1rem;
          margin-bottom:20px;
        }        
      }

      .order-price {
        width:50%;
      
        .order-total-price{
          padding:20px 0 20px 20px;
          background:#000;
          color:#fff;
          font-size:1.1rem;
          margin-bottom:20px;
        }
      }
  }
` 

export { OrderPage }


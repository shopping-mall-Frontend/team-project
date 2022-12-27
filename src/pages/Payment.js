import Header from '../components/Header';
import React, { useEffect, useState } from 'react'
import { getAccount, auth, getProductDetail } from '../utils/useAPI'
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const Payment = () => {
  const { id } = useParams();
  const [user, setUser] = useState(false);

  const [bankList, setBankList] = useState([]);
  const [holdBankList, setHoldBankList] = useState([]);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const userBank = async() => {
      const userInfo = await auth();
      const selectBank = await getAccount('banks');
      const productList = await getProductDetail(id)

      setUser(userInfo);
      setBankList(selectBank)
      setHoldBankList(selectBank.filter(e => e.disabled === true))
      setProduct([productList])
    }

    userBank()
  }, [id]);

  return (
    <>
      <Header user={user}/>

      <Container>
        <section className='product-list'>
          <ul>
            {
              product.map(item => {
                return(
                  <li>
                    <div>
                      <img src={item.thumbnail} alt="제품 이미지" />
                      <p className='item-title'>{item.title}</p>
                    </div>
                    <p>상품 금액 : <span>{item.price} $</span></p>
                  </li>
                )
              })
            }
          </ul>
        </section>

        <section className='order-info'>
          <div className='order-form'>
            <p>카드 결제</p>
              {
                holdBankList.length === 0 ? 
                <p>선택 가능한 계좌가 없습니다</p>
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
            <p>총 주문금액 : </p>
            <div className='order-price-info hide'>
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
      padding:20px 0;
      border:2px solid #111;
      border-right:0;
      border-left:0;

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
` 

export { Payment }


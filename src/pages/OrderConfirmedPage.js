import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Step from '../components/Step'

const OrderConfirmedPage = () => {
  return (
    <>
      <Header/>
      <Container>
        <Step style={`step3`}/>
        <div className='order-con-info'>
          <p>구매가 완료되었습니다.</p>
          <div>
            <Link to='/'>홈 화면으로 돌아가기</Link>
            <Link to='/user'>주문 내역 확인</Link>
          </div>
        </div>
      </Container>
      <Footer/>
    </>
  )
}

const Container = styled.main`
  width:1200px;
  margin:0 auto;
  height:calc(100vh - 480px);
  position:relative;

  .order-con-info {
    width:500px;
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%, -50%);

    p {
      font-size:1.5rem;
      text-align:center;
      padding:50px;
    }

    div {
      display:flex;
      justify-content:center;
      align-items:center;
      gap:10px;

      a {
        padding:10px;
        border:1px solid #ddd;
        font-size:.8rem;
        font-weight:600;
        color:#555;
      }
    } 
  }
`

export {OrderConfirmedPage}
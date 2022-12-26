import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

const Container = styled.div``;

const OrderPage = () => {
  return (
    <Container>
      <Header />
      <Navbar />
      <h1>주문 정보 입력 및 결제 정보 입력 페이지 입니다.</h1>
      <p>개발중..!!! 헤헷! 💻</p>
      <p>
        힘드시죵? 이게 인생입니다... 인생의 고통과 행복은 추 같아서, 이리저리 움직인대요. 고통 받은만큼 행복이 다가오고, 행복이 다가오는 만큼 힘든 날도 있는거죠! 뭐라는 거냐구요? 밤이 되니까 감성이 넘치는 중이에요... 다들 힘내시라구욧.. 헤헷
        아자잣!@!!!!!!
      </p>
    </Container>
  );
};

export { OrderPage };

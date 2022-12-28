import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AccountInquiry from "../AccountInquiry";
import { AddAccount } from "../AddAccount";

const Account = () => {
  const [acooutUtil, setAcooutUtil] = useState('');

  return (
    <Container>

      {
        acooutUtil === 'connect' ? 
        <>
          <button onClick={() => {setAcooutUtil('inquiry')}}>계좌 조회 이거 버튼입니다 누르세요 css나중에 할게요</button>
          <AddAccount/>
        </>
        : 
        <>
          <button onClick={() => {setAcooutUtil('connect')}}>계좌 연결 이거 버튼입니다 누르세요 css나중에 할게요</button>
          <AccountInquiry/>
        </>
      }
    </Container>
  )
};

const Container = styled.div``;

export default Account;

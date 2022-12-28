import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AccountInquiry from "../AccountInquiry";
import { AddAccount } from "../AddAccount";

const Account = () => {
  const [acooutUtil, setAcooutUtil] = useState('');
  const [component, setComponent] = useState('');

  useEffect(() => {
    const render = () => {
      switch(acooutUtil){
        case 'inquiry' : 
          setComponent('')
          break 
        case 'disconnect' :
          setComponent('')
          break 
        case 'connect' :
          setComponent(<AddAccount/>)
          break
        default : 
        return
      }
    }
    render()
  }, [acooutUtil]);
  

  return (
    <Container>
      <button onClick={() => {setAcooutUtil('inquiry')}}>계좌 조회</button>
      <button onClick={() => {setAcooutUtil('disconnect')}}>계좌 해제</button>
      <button onClick={() => {setAcooutUtil('connect')}}>계좌 연결</button>

      {component === '' ? <AccountInquiry/> : component}
    </Container>
  )
};

const Container = styled.div``;

export default Account;

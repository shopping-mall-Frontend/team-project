import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AccountInquiry from "../AccountInquiry";
import { AddAccount } from "../AddAccount";

const BankAccounts = () => {
  const [acooutUtil, setAcooutUtil] = useState('');

  return (
    <Container>
      {acooutUtil === "connect" ? (
        <>
          <div className="account-title">
            <p>계좌 연결</p>
            <button
              onClick={() => {
                setAcooutUtil("inquiry");
              }}
              className="account-btn"
            >
              계좌 조회 바로가기 {">"}
            </button>
          </div>

          <AddAccount />
        </>
      ) : (
        <>
          <div className="account-title">
            <p>계좌 조회</p>
            <button
              onClick={() => {
                setAcooutUtil("connect");
              }}
              className="account-btn"
            >
              계좌 연결 바로가기 {">"}
            </button>
          </div>

          <AccountInquiry />
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  min-width:900px ;

  .account-title {
    display:flex;
    align-items:center;
    justify-content:space-between;

    p {
      display:inline-block;
      padding:20px 0;
      font-size:1rem;
    }

    .account-btn {
      font-size:1rem;
      font-weight:600;
    }

    button {
      cursor: pointer;
    }
  }
`;

export {BankAccounts};

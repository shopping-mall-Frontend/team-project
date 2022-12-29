import React from 'react';
import styled from 'styled-components';

const InputPassword = ({ user }) => {
  const handleSubmit = () => {};

  return (
    <Container>
      <h3>비밀번호 재확인</h3>
      <p>회원님의 정보를 안전하게 보호하기 위해 비밀번호를 다시 한번 확인해주세요.</p>
      <form>
        <div>
          <label htmlFor="userId">아이디</label>
          <input type="text" value={user.email} disabled />
        </div>
        <div>
          <label htmlFor="userId">비밀번호</label>
          <input type="text" placeholder="현재 비밀번호를 입력해주세요." required />
        </div>
        <button type="submit">확인</button>
      </form>
    </Container>
  );
};

const Container = styled.div`
  padding-top: 30px;

  h3 {
    padding-bottom: 8px;
    font-weight: 700;
    font-size: 16px;
  }

  p {
    padding-bottom: 20px;
    font-size: 12px;
    line-height: 1.5;
    color: rgb(102, 102, 102);
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: left;
    gap: 20px;

    padding: 40px 250px;

    div {
      display: flex;
      justify-content: space-between;
    }

    div input {
      width: 400px;
      height: 46px;
      padding: 0px 11px 1px 15px;
      border-radius: 4px;
      border: 1px solid rgb(221, 221, 221);
      font-weight: 400;
      line-height: 1.5;
      color: rgb(51, 51, 51);
    }

    div label {
      margin-right: 60px;
      padding-top: 12px;
      font-weight: 700;
    }

    button {
      display: block;
      width: 240px;
      height: 56px;
      margin: 0 auto;
      margin-top: 30px;
      padding: 0px 10px;
      border-radius: 3px;
      border: 1px solid #000;

      text-align: center;
    }
  }
`;

export default InputPassword;

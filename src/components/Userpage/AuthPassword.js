import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { signIn, auth } from '../../utils/useAPI';

const AuthPassword = () => {
  const location = useLocation();
  const slicePathname = location.pathname.slice(6);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  //유저 로그인 정보 불러오기
  const [user, setUser] = useState(false);
  useEffect(() => {
    const authUser = async () => {
      const userInfo = await auth();
      setUser(userInfo);
    };
    authUser();
  }, []);

  const OnSubmit = async (data) => {
    const login = await signIn(data);
    if (!login) {
      alert('비밀번호가 일치하지 않습니다.');
    } else if (location.pathname.includes(slicePathname)) {
      navigate(`/user/${slicePathname}/edit`);
    }
  };

  return (
    <Container>
      <h3>비밀번호 재확인</h3>
      <p>회원님의 정보를 안전하게 보호하기 위해 비밀번호를 다시 한번 확인해주세요.</p>
      {user ? (
        <form onSubmit={handleSubmit(OnSubmit)}>
          <input
            type="text"
            value={user.email}
            id={'userId'}
            disabled
            {...register('email', { value: `${user.email}` })}
          />
          <input
            type="password"
            placeholder="현재 비밀번호를 입력해주세요."
            minLength={8}
            required
            {...register('password', { required: 'true' })}
          />
          <input type="submit" className="inputSubmit" value="확인" />
        </form>
      ) : (
        ''
      )}
    </Container>
  );
};

const Container = styled.div`
  min-width: 900px;
  font-family: 'Hahmlet', serif;

  h3 {
    padding-bottom: 8px;
    font-weight: 600;
    font-size: 16px;
  }

  p {
    padding-bottom: 20px;
    font-size: 12px;
    color: rgb(102, 102, 102);
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 40px 0;
  }
  input {
    width: 400px;
    height: 46px;
    padding: 0px 11px 1px 15px;
    border-radius: 4px;
    border: 1px solid rgb(221, 221, 221);
    font-weight: 300;
    color: rgb(51, 51, 51);
    font-family: 'Hahmlet', serif;
    font-size: 15px;
  }

  input:first-child {
    background-color: #dfdfdf;
  }

  input:focus {
    border: 1px solid #000;
  }

  .inputSubmit {
    display: block;
    width: 240px;
    height: 56px;
    margin: 0 auto;
    margin-top: 30px;
    padding: 0px 10px;
    border-radius: 3px;
    border: 1px solid #000;

    text-align: center;
    cursor: pointer;
  }

  .inputSubmit:hover {
    font-weight: 700;
  }
`;

export { AuthPassword };

import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { signIn } from '../utils/useAPI';
import { useNavigate } from 'react-router-dom';
const Container = styled.div``;

const LoginForm = styled.form`
  input {
  }
  button {
    border: 2px solid white;
    border-radius: 5px;
    background-color: blue;
    color: white;
  }
`;
const Login = (props) => {
  const history = useNavigate();

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  // react hook form 사용해보기(렌더링 비용 최소화)
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    const { accessToken, user } = await signIn(data);
    setLoginInfo(data);
    if (!user) {
      alert('이메일 혹은 비밀번호가 일치하지 않습니다.');
    } else {
      sessionStorage.setItem('accessToken', accessToken);
      alert(`hello, ${user.displayName}!!`);
      history('/user');
    }
  };

  return (
    <Container>
      Login
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        ID
        <input
          type="email"
          placeholder="Email ID"
          {...register('email', { required: true })}
        />
        password
        <input
          type="password"
          placeholder="Password"
          {...register('password', { required: true })}
        />
        <button>로그인!</button>
      </LoginForm>
    </Container>
  );
};

export default Login;

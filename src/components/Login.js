import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { signIn } from '../utils/useAPI';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const history = useNavigate();

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  // react hook form 사용해보기(렌더링 비용 최소화)
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    const { user } = await signIn(data);
    setLoginInfo(data);
    if (!user) {
      alert('이메일 혹은 비밀번호가 일치하지 않습니다.');
    } else {
      alert(`hello, ${user.displayName}!!`);
      history('/');
    }
  };

  return (
    <Container>
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h1>Login</h1>
          <h4>Username</h4>
          <div className="username-input">
            <i className="fas fa-user"></i>
            <input
              type="email"
              placeholder="example@gmail.com"
              {...register('email', { required: true })}
            />
          </div>
        </div>
        <div>
          <h4>Password</h4>
          <div className="password-input">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              placeholder="********"
              {...register('password', { required: true })}
            />
          </div>
        </div>
        <button type="submit">LOGIN</button>
      </LoginForm>
    </Container>
  );
};

const Container = styled.div`
  background-color: #fff9f9;
  min-height: 700px;
  min-width: 700px;
  height: 100vh;
  width: 100vw;
  background-color: hsla(0, 100%, 88%, 1);
  background-image: radial-gradient(
      at 80% 0%,
      hsla(189, 100%, 56%, 1) 0px,
      transparent 50%
    ),
    radial-gradient(at 0% 50%, hsla(355, 100%, 93%, 1) 0px, transparent 50%),
    radial-gradient(at 80% 50%, hsla(340, 100%, 76%, 1) 0px, transparent 50%),
    radial-gradient(at 0% 100%, hsla(269, 100%, 77%, 1) 0px, transparent 50%),
    radial-gradient(at 0% 0%, hsla(343, 100%, 76%, 1) 0px, transparent 50%);

  h4 {
    margin: 20px 0 5px 0;
    font-size: 1.5rem;
    font-weight: 300;
  }
`;

const LoginForm = styled.form`
  margin: 0 auto;
  width: 400px;
  height: 380px;
  transform: translateY(40%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 20px;
  box-shadow: 0px 0 31px 0px rgb(0 0 0 / 10%);

  h1 {
    font-family: 'Marcellus', serif;
    margin: 20px 0 10px 0;
    font-size: 3rem;
  }

  .username-input,
  .password-input {
    width: 90%;
    border-bottom: 1px solid #a4a4a4;
  }

  i {
    width: 10%;
    color: rgba(0, 0, 0, 0.3);
    padding-right: 7px;
  }

  input {
    width: 80%;
    font-size: 1.1rem;
    font-weight: 300;
    padding: 7px 0;
    border: none;
    background-color: inherit;
  }

  button {
    margin: 40px;
    border: none;
    padding: 7px 20px;
    width: 50%;
    border-radius: 10px;
    font-size: 1.2rem;
    background-image: linear-gradient(
      43deg,
      hsla(340, 100%, 76%, 1) 0%,
      hsla(269, 100%, 77%, 1) 100%
    );
    color: white;
    font-weight: 600;
  }
`;

export default Login;

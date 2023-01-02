import React, {useState} from 'react';
import styled from 'styled-components';
import {useForm} from 'react-hook-form';
import {signup} from '../utils/useAPI';
import {Link, useNavigate} from 'react-router-dom';

const Login = () => {
  const history = useNavigate();
  const [setLoginInfo] = useState({
    email: '',
    password: '',
    displayName: '',
  });

  const {register, handleSubmit} = useForm();
  const onSubmit = async (data) => {
    const {user} = await signup(data);
    setLoginInfo(data);
    if (!user) {
      alert('이메일 혹은 비밀번호가 일치하지 않습니다.');
    } else {
      alert(`🌺 ${user.displayName}님!! 방문해주셔서 감사드립니다.`);
      history('/');
    }
  };
  return (
    <Container>
      <ul>
        <li>
          <Link to={'/'} className="go-back">
            <span className="material-symbols-outlined">cottage</span>
            HOME
          </Link>
        </li>
        <li>
          <Link to={'/SignUp'} className="Login"></Link>
        </li>
      </ul>
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h1>SignUp</h1>

          <h4>E-mail</h4>
          <div className="username-input">
            <input type="email" placeholder="example@gmail.com" {...register('email', {required: true})} />
          </div>
        </div>
        <div>
          <h4>Password</h4>
          <div className="password-input">
            <i className="fas fa-lock"></i>
            <input type="password" placeholder="********" {...register('password', {required: true})} />
          </div>
        </div>
        <div>
          <h4>Username</h4>
          <div className="password-input">
            <input type="text" placeholder="User Name" {...register('displayName', {required: true})} />
          </div>
        </div>
        <div className="submit">
          <button type="submit" value="submit">
            SignUp
          </button>
        </div>
      </LoginForm>
    </Container>
  );

};

const Container = styled.div`
  font-family: 'Marcellus', serif;

  ul {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin-top: 20px;
    line-height: 55px;
    height: 55px;
    text-align: center;
    color: gray;
    font-family: 'Marcellus', serif;
  }

  li {
    width: 30%;
    box-sizing: border-box;
    height: 65.99px;
  }

  .go-back {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    margin: 0;
  }

  .navbar-logo {
    padding-bottom: 20px;
    height: 100%;
  }

  .material-symbols-outlined {
    font-size: 15px;
  }

  h4 {
    margin: 20px 0 5px 0;
    font-size: 1rem;
    font-weight: 300;
    font-family: 'Marcellus', serif;
  }

  .Login {
    font-family: 'Marcellus', serif;
  }
`;

const LoginForm = styled.form`
  font-family: 'Marcellus', serif;
  letter-spacing: 0.5px;
  margin: auto;
  width: 600px;
  height: 800px;
  transform: translateY(10%);

  h1 {
    font-family: 'Marcellus', serif;
    margin: 20px 0 10px 0;
    font-size: 3.8rem;
    padding-bottom: 40px;
  }

  .username-input,
  .password-input {
    width: 90%;
    border-bottom: 1px solid #a4a4a4;
  }

  button {
    width: 100%;
    outline: none;
    border-radius: 0px;
    line-height: 2.5rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    padding-top: 0.5rem;
    font-size: 15px;
    font-family: 'Marcellus', serif;
  }

  .submit {
    margin-top: 50px;
    width: 90%;
  }

  input {
    width: 100%;
    outline: none;
    border-radius: 0px;
    line-height: 2.5rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    padding-top: 0.5rem;
    font-size: 15px;
    font-family: 'Marcellus', serif;
  }

  .submit button {
    height: 50px;
    border-radius: 30px;
    margin-top: 10px;
    padding: 0px 20px;
    border: 1px solid lightgray;
    outline: none;
  }
`;

export default Login;

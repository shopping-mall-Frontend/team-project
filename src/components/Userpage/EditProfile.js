import React, {useState} from 'react';
import styled from 'styled-components';
import {Link, useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {editUserInfo} from '../../utils/useAPI';

const EditProfile = () => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    newPassword: '',
    oldPassword: '',
    displayName: '',
  });

  const {register, handleSubmit} = useForm();
  const onSubmit = async (data) => {
    try {
      const res = await editUserInfo(data);
      if (res) {
        console.log(res);
        alert('정보가 수정되었습니다.');
        navigate('/');
      } else {
        alert('정보가 수정이 되지 않았습니다.');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <ul>
        <li>
          <Link to={'/SignUp'} className="Login"></Link>
        </li>
      </ul>
      <div>
        <h1>사용자 정보 수정</h1>
      </div>
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h4>현재 비밀번호</h4>
          <div className="password-input">
            <i className="fas fa-lock"></i>
            <input type="password" placeholder="********" {...register('oldPassword', {required: true})} />
          </div>
        </div>
        <div>
          <h4>새로운비밀번호</h4>
          <div className="password-input">
            <i className="fas fa-lock"></i>
            <input type="password" placeholder="********" {...register('newPassword', {required: true})} />
          </div>
        </div>
        <div>
          <h4>새로운 이름</h4>
          <div className="password-input">
            <input type="text" placeholder="Nickname" {...register('displayName', {required: true})} />
          </div>
        </div>
        <div className="submit">
          <button type="submit" value="submit">
            저장
          </button>
        </div>
      </LoginForm>
    </Container>
  );
};

const Container = styled.div`
  min-width: 900px;
  font-family: 'Hahmlet', serif;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  ul {
    line-height: 55px;
    text-align: center;
    color: gray;
  }

  li {
    width: 30%;
    box-sizing: border-box;
  }

  h1 {
    font-weight: 600;
    font-size: 1.1rem;
  }

  h4 {
    margin: 20px;
    font-size: 0.9rem;
    font-weight: 300;
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  letter-spacing: 0.3px;
  width: 100%;
  height: 300px;
  transform: translateY(2ch);

  h1 {
    font-size: 1.1rem;
  }

  .username-input,
  .password-input {
    width: 90%;
    border-bottom: 1px solid #a4a4a4;
    height: 50%;
    margin: 20px;
  }

  input {
    display: flex;
    justify-content: center;
    font-size: 12px;
    letter-spacing: 0.5px;
  }

  button {
    width: 100%;
    outline: none;
    line-height: 2.5rem;
    font-size: 15px;
    font-family: 'Hahmlet', serif;
  }

  .submit {
    margin-top: 0px;
    width: 90%;
  }

  .submit button {
    height: 50px;
    border-radius: 30px;
    border: 1px solid lightgray;
    outline: none;
  }
`;

export {EditProfile};

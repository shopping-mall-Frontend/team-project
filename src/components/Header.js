import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import axios from 'axios';
import '../css/reset-css.css';

const Header = React.memo(() => {
  const accessToken = window.localStorage.getItem('accessToken');

  const [isLogin, setIsLogin] = useState(
    window.localStorage.getItem('accessToken') !== ''
  );

  console.log(accessToken);

  const validLogin = async () => {
    try {
      const instance = axios.create({
        baseURL:
          'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth',
        headers: {
          'content-type': 'application/json',
          apikey: 'FcKdtJs202209',
          username: 'KDT3_teamOT',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const response = (await instance.post('/me')).data;
      console.log(response);
    } catch (err) {
      console.log(err);
      setIsLogin(false);
    }
  };

  useEffect(() => {
    validLogin();
    console.log('하이');
  }, []);

  const logout = async () => {
    try {
      console.log(isLogin);
      const instance = axios.create({
        baseURL:
          'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth',
        headers: {
          'content-type': 'application/json',
          apikey: 'FcKdtJs202209',
          username: 'KDT3_teamOT',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const response = (await instance.post('/logout')).data;
      window.localStorage.setItem('accessToken', '');
      console.log(response);
      setIsLogin(false);
    } catch (err) {
      alert('로그아웃 실패.');
      console.log('실패');
    }
  };

  return (
    <StyledHeader>
      <nav className="navbar">
        <div className="navbar-left">{
          <input
            type="text"
            placeholder="Enter item to be searched"
            onChange={(e) => this.searchSpace(e)}
          />
        }
        </div>

        <div className="navbar-logo center"></div>
        <Link to={'/'} className="navbar-logo">
          N4
        </Link>
        <ul className="navbar-right">
          <li>
            <Link to={'/login'}>
              Login/out
            </Link>
          </li>
          <li>
            <Link to={'/Cart'}>
              Chart
            </Link>{' '}
          </li>
        </ul>
      </nav>
      <StyledCategory>
        <ul className="category">
          <li>
            <Link to={'/category'}>category </Link>
          </li>
          <li>
            <Link to={'/category'}>category </Link>
          </li>
          <li>
            <Link to={'/category'}>category </Link>
          </li>
        </ul>
      </StyledCategory>
    </StyledHeader>

  );
});

const StyledHeader = styled.div`
  .navbar {
    font-family: 'Marcellus', serif;
    justify-content: space-between;
    display: flex;
    align-items: center;
    padding: 22px 1px;
    width: 90%;
    margin: 0;

  }

  .navbar-logo {
    padding-right: 200px;
    font-size: 2rem;
  }

  .navbar-right {
    display: flex;
    width: 15%;
    justify-content: flex-end;
    color:#302d2d;
  }

  li {
    padding: 20px;
  }

  .navbar-left {
    margin-left: 100px;
    color:#302d2d;
  }

  @media screen and (max-width: 768px) {
    .navbar {
      flex-direction: column;
      text-align: center;
      width: 100%;
    }

    .navbar-left {
      display: none;
    }

    li {
      display: inline-block;
      padding: 10px;
    }

    .navbar-logo {
      align-items: center;
      padding: 8px 24px;
      text-align: center;
      width: 100%;
      height: 100%;
    }

    .navbar-right {
      display: none;
      justify-content: center;
      width: 100%;
      margin-right: 10px;
    }
  }
`;
const StyledCategory = styled.div`
  .category {
    display: flex;
    flex-direction: row;
    justify-content: center;
    text-align: center;
    margin-left: 100px;
    font-size: 1.45rem;
  }
  @media screen and (max-width: 768px) {
    .category {
      display: none;
    }
`;

export default Header;
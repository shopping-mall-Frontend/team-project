import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import '../css/reset-css.css';
import { auth } from '../utils/useAPI';
import Search from './search/Search';

const Header = React.memo(() => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      setIsLogin(true);
    }
  }, []);

  const [user, setUser] = useState(false);
  useEffect(() => {
    const authUser = async () => {
      const userInfo = await auth();
      setUser(userInfo);
    };
    authUser();
  }, []);

  const logout = async () => {
    try {
      await auth('logout');
      localStorage.removeItem('accessToken');
      setIsLogin(false);
    } catch (err) {
      alert('로그아웃 실패.');
      console.log('실패');
    }
  };

  return (
    <StyledHeader>
      <header>
        <nav>
          <div className="search">
            <Search/>
          </div>
          <ul className="nav__links">
            <li>
              {isLogin ? (
                <Link to={`/user`}>
                  Hello!
                  🌺{user.displayName}
                </Link>
              ) : (
                <Link to={'/login'}>LOGIN</Link>
              )}
            </li>
            <li>
              <Link to={'/Cart'}>Chart</Link>{' '}
            </li>
          </ul>
        </nav>
        <div className="logo">
          <Link to={'/'}>N4</Link>
        </div>
        <nav>
          <ul className="nav__links">
            <li>
              {isLogin ? (
                <Link to={'/'} onClick={() => logout()}>
                  LogOut
                </Link>
              ) : (
                <Link to={'/login'}>Login/out</Link>
              )}
            </li>
            <li>
              <Link to={'/Cart'}>Chart</Link>{' '}
            </li>
          </ul>
        </nav>
      </header>
      <StyledCategory>
        <ul>
          <li>
            <Link to={'/category/all'}>Category</Link>
          </li>
          <li>
            <Link to={'/category/clothes'}>Clothes </Link>
          </li>
          <li>
            <Link to={'/category/bags'}>Bag</Link>
          </li>
        </ul>
      </StyledCategory>
    </StyledHeader>
      );
});
const StyledHeader = styled.div`
  font-family: 'Marcellus', serif;
  box-sizing: border-box;
  margin-top: 20px;
  padding: 0;

  nav{
    display:flex;
    justify-content: space-between;
    align-items: center;
  }

  li,
  .logo {
    text-decoration: none;

  }
  .material-symbols-outlined {
    font-weight: normal;
    font-size: 20px;
    display: inline-block;
  }

  .search {
    display: flex;
    margin-left: 30px;

  }

  .logo {
    display:flex;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease 0s;
    font-size: 3.2rem;
    box-sizing: content-box;
    width: 100%;

  }
  ul {
    display:flex;
    padding: 0px 0px 0px 0em;
    transition: all 0.3s ease 0s;
    color: dimgray;
    margin:0;
  }
  li{
    padding: 0px 20px;
  }
  @media screen and (max-width: 768px) {
    header {
      flex-direction: column;
      text-align: center;
      width: 100%;
    }

    .search {
      display: none;
    }

    .logo {
      padding: 0px 5px 9px 10px;
      cursor: pointer;
      transition: all 0.3s ease 0s;
      font-size: 2.3rem;
    }

    .nav__links {
      display: none;
    }
  }
`;

const StyledCategory = styled.div`
  font-family: 'Marcellus', serif;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  
  ul {
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px 10px;
  }

  .category li {
    font-weight: 500;
    text-decoration: none;
    display: inline-block;
    padding: 0px 20px;
    transition: all 0.3s ease 0s;
    color: black;
  }

  @media screen and (max-width: 768px) {
    .category {
      display: none;
    }
  }
`;


export default Header;
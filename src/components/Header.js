import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Link, useNavigate} from 'react-router-dom';
import '../css/reset-css.css';
import {auth} from '../utils/useAPI';
import Search from './search/Search';

const Header = React.memo(() => {
  const navigate = useNavigate();

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
      const res = await auth('logout');
      if (res) {
        localStorage.removeItem('accessToken');
        setUser(false);
        navigate("/");
      }

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
            <Search isSearchPage={false}/>
          </div>
          <ul className="nav__links">
            <li>
              {user ? <Link to={`/user`}>🌿{user.displayName}님</Link> : <Link to={'/login'}>LOGIN</Link>}
            </li>
            <li>
              <Link to={'/Cart'}>Cart</Link>{' '}
            </li>
            {user ? (
              <Link to={'/'} onClick={logout} title="로그아웃">
                <span className="material-symbols-outlined">logout</span>
              </Link>
            ) : (
              <Link to={'/login'}></Link>
            )}
          </ul>
        </nav>
        <div className="logo">
          <Link to={'/'}>N4</Link>
        </div>
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
  border-bottom: 1px solid #ddd;
  min-width: 1200px;

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 50px;
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
    color: dimgray;
  }

  .logo {
    display: flex;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease 0s;
    font-size: 3.2rem;
    box-sizing: content-box;
    width: 100%;
  }

  ul {
    display: flex;
    padding: 0px 0px 0px 0em;
    transition: all 0.3s ease 0s;
    color: dimgray;
    margin: 0;
  }

  li {
    padding: 0px 20px;
  }

  /* @media screen and (max-width: 768px) {
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
  } */
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

  /* @media screen and (max-width: 768px) {
    .category {
      display: none;
    }
  } */
`;

export default Header;

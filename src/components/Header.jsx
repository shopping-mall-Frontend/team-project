/*esline-diable*/
import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import axios from "axios";


const StyledHeader = styled.div`
  flex-wrap: wrap;
  font-family: 'Marcellus', serif;
  display: flex;
  justify-content: space-between;
  margin: 20px;

  .header {
    Justify-content: space-between;
    width: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    text-align: center;
    margin: .25rem;
    padding: .5rem 1rem;
    text-decoration: none;
    font-weight: bold;
  }

  .header-left {
    font-family: 'Marcellus', serif;
    display: block;
    margin: 0px;
    padding: 0px;
    list-style: none;
  }

  .nav-logo-link {
    font-family: 'Marcellus', serif;
    position: relative;
  }
input{
    margin: 0 auto;
    width: 10rem;
    height: 2rem;
    font-size: 2px;
    border: 0;
    border-radius: 15px;
    outline: none;
    padding-left: 10px;
    background-color: rgb(233, 233, 233);
}

  li {
    font-family: 'Marcellus', serif;
    display: flex;

  }

  .nav-menu-side {
    font-weight: 500;
    display: flex;
    justify-content: end;
    @media screen and (max-width: 500px) {
      display: none;
    }
  }
`;

const StyledCategory = styled.div`

  .categoryList {
    font-family: 'Marcellus', serif;
    Justify-content: space-between;
    width: 100%;
    display: flex;
    text-align: center;
    margin: 0rem 10rem 0rem 10rem;
    padding: 2rem 2rem;
    text-decoration: none;
    font-weight: bold;

  }

`;

const Header = () => {
  const accessToken = window.localStorage.getItem("accessToken");

  const [isLogin, setIsLogin] = useState(
    window.localStorage.getItem("accessToken") !== ""
  );

  console.log(accessToken);

  const validLogin = async () => {
    try {
      const instance = axios.create({
        baseURL:
          "https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth",
        headers: {
          "content-type": "application/json",
          apikey: "FcKdtJs202209",
          "username": "KDT3_teamOT",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const response = (await instance.post("/me")).data;
      console.log(response);
    } catch (err) {
      console.log(err);
      setIsLogin(false);
    }
  };

  useEffect(() => {
    validLogin();
    console.log("하이");
  }, []);

  const logout = async () => {
    try {
      console.log(isLogin);
      const instance = axios.create({
        baseURL:
          "https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth",
        headers: {
          "content-type": "application/json",
          apikey: "FcKdtJs202209",
          "username": "KDT3_teamOT",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const response = (await instance.post("/logout")).data;
      window.localStorage.setItem("accessToken", "");
      console.log(response);
      setIsLogin(false);
    } catch (err) {
      alert("로그아웃 실패.");
      console.log("실패");
    }
  };


  return (
    <StyledHeader>
      <div className="header">
        <div className='header-left'>
          <input type="text" placeholder="Enter item to be searched" onChange={(e) => this.searchSpace(e)}/>
        </div>
        <div className="header-center">
          <Link to={"/"} className="nav-logo-link">
            N4S1
          </Link>
        </div>
        {/* 요건 잠시만기다려주세용ㅎㅎㅎㅎ */}
        {isLogin ? (
          <>
            <button type="button" onClick={logout}>
              로그아웃
            </button>
          </>
        ) : (
          <>
            <Link to={"/login"} className="nav-menu-side">Login/out</Link>
            <Link to={"/Cart"} className="nav-menu-side">Chart</Link>        </>
        )}


      </div>
      <StyledCategory>
        <div className="categoryList">

          <li><Link to={"/category"} className="nav-menu-side">Category</Link></li>
          {/* {아직 아래 카테고리 미정} */}
          <li><Link to={"/category"} className="nav-menu-side">New product</Link></li>
          <li><Link to={"/category"} className="nav-menu-side">New product</Link></li>
          <li><Link to={"/category"} className="nav-menu-side">New product</Link></li>

        </div>

      </StyledCategory>
    </StyledHeader>

  );


};

export default Header;
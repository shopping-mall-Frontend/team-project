import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { auth } from '../../utils/useAPI';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const UserPage = () => {
  //유저 정보
  const [user, setUser] = useState(false);
  useEffect(() => {
    const authUser = async () => {
      const userInfo = await auth();
      setUser(userInfo);
    };
    authUser();
  }, []);

  return (
    <>
      <Header />
      <Navbar />
      <Container>
        <Menu aria-labelledby="my page navigation">
          <ul>
            <Link to="/user/orderhistory">My Orders</Link>
            <Link to="/user/cancelhistory">Order Cancelled</Link>
            <Link to="/user/bankaccounts">Bank Accounts</Link>
            <Link to="/user/editprofile">My Profile</Link>
          </ul>
        </Menu>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
};

const Container = styled.main`
  display: flex;
  justify-content: center;
  gap: 50px;
  width: 1200px;
  margin: 0 auto;
  padding: 40px 0;

  button {
    cursor: pointer;
  }
`;

const Menu = styled.nav`
  min-width: 250px;
  padding-top: 45px;

  ul li {
    padding: 15px 10px;
    border: 1px solid #000;
    cursor: pointer;
  }

  ul li + li {
    margin-top: 5px;
  }

  ul li button {
    font-size: 15px;
  }

  ul li button:hover {
    font-weight: 700;
  }
`;

const StyeldLink = styled(Link)`
  display: block;
`;

const Components = styled.div``;

const Title = styled.h3`
  padding-bottom: 10px;
  border-bottom: 1px solid #000;
  font-size: 25px;
`;

const Description = styled.div`
  min-width: 900px;
`;

export { UserPage };

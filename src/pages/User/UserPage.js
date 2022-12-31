import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Title from '../../components/Userpage/Title';

const UserPage = () => {
  return (
    <>
      <Header />
      <Navbar />
      <Container>
        <Menu aria-labelledby="my page navigation">
          <ul>
            <StyeldLink to="/user">
              <button>My Orders</button>
            </StyeldLink>
            <StyeldLink to="/user/cancelhistory">
              <button>Order Canceled</button>
            </StyeldLink>
            <StyeldLink to="/user/bankaccounts">
              <button>Bank Accounts</button>
            </StyeldLink>
            <StyeldLink to="/user/editprofile">
              <button>My Profile</button>
            </StyeldLink>
          </ul>
        </Menu>
        <Title></Title>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
};

const Container = styled.main`
  display: flex;
  gap: 50px;
  width: 1200px;
  margin: 0 auto;
  padding: 40px 0;
`;

const Menu = styled.nav`
  min-width: 250px;
  padding-top: 45px;

  button {
    font-size: 15px;
    cursor: pointer;
  }

  button:hover {
    font-weight: 700;
  }
`;

const StyeldLink = styled(Link)`
  display: block;
  margin-top: 10px;
  padding: 15px 10px;
  border: 1px solid #000;
`;

export { UserPage };

import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Title = () => {
  const location = useLocation();
  function switchTitle() {
    const sliceName = location.pathname.slice(6);
    switch (sliceName) {
      case '':
        return <h2>My Orders</h2>;
      case 'orderhistory/details':
        return <h2>My Orders</h2>;
      case 'cancelhistory':
        return <h2>Order Canceled</h2>;
      case 'bankaccounts':
        return <h2>Bank Accounts</h2>;
      case 'bankaccounts/edit':
        return <h2>Bank Accounts</h2>;
      default:
        return <h2>My Profile</h2>;
    }
  }

  return <Container>{switchTitle()}</Container>;
};

const Container = styled.main`
    font-family: 'Hahmlet', serif;
  `;

export default Title;

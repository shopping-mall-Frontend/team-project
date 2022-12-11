import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  font-size: 20px;
  background-color: orange;
`;

const Header = ({ user }) => {
  return (
    <Container>
      {user ? (
        <p>안녕하세요, {user.displayName} 님!</p>
      ) : (
        <p>로그인해주세요!</p>
      )}
    </Container>
  );
};

export default Header;

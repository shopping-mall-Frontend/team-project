import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrap = styled.div`
  display: flex;
  margin: 20px 0;
  button {
    color: rgb(115, 115, 115);
    font-weight: 700;
    margin-left: 20px;
    cursor: pointer;
  }
`;

const Links = ({}) => {
  return (
    <Wrap>
      <Link to={`/`}>
        <button>메인</button>
      </Link>
      <Link to={`/product`}>
        <button>제품목록</button>
      </Link>
      <Link to={`/cart`}>
        <button>장바구니</button>
      </Link>
      <Link to={`/user`}>
        <button>user님</button>
      </Link>
    </Wrap>
  );
};
export default Links;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { auth } from '../utils/useAPI';

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
  const [user, setUser] = useState(false);
  useEffect(() => {
    const authUser = async () => {
      const userInfo = await auth();
      setUser(userInfo);
    };
    authUser();
  }, []);
  return (
    <Wrap>
      <Link to={`/category/all`}>
        <button>제품목록</button>
      </Link>
      <Link to={`/cart`}>
        <button>장바구니</button>
      </Link>
      <Link to={`/user`}>
        <button>{user.displayName}님</button>
      </Link>
    </Wrap>
  );
};
export default Links;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { auth } from '../utils/useAPI';

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
      <Link to={`/user`}>
        <button>안녕하세요. {user.displayName}님</button>
      </Link>
    </Wrap>
  );
};

const Wrap = styled.div`
  margin: 20px auto;
  width: 1200px;
  button {
    color: rgb(115, 115, 115);
    font-weight: 700;
    cursor: pointer;
  }
`;

export default Links;

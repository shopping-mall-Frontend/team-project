import Header from '../components/Header';
import styled from 'styled-components';
import Login from '../components/Login';
import { auth } from '../utils/useAPI';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Container = styled.div``;
const logoutButtonHandle = () => {
  sessionStorage.removeItem('accessToken');
};

const MainPage = () => {
  const history = useNavigate();

  const [user, setUser] = useState(false);
  useEffect(() => {
    const authUser = async () => {
      const userInfo = await auth();
      setUser(userInfo);
    };
    authUser();

    return;
  }, []);

  return (
    <Container>
      <Header user={user} />
      This is Main Page
      {user ? (
        <div>
          <p> 현재 사용자: {user.displayName} </p>
          <button
            onClick={async () => {
              logoutButtonHandle();
              await auth('logout');
              window.location.reload();
            }}
          >
            로그아웃하기
          </button>
          <Link to="/test">테스트 페이지로 가기</Link>
        </div>
      ) : (
        <Login />
      )}
    </Container>
  );
};

export { MainPage };

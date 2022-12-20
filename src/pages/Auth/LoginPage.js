import React from 'react';
import Login from '../../components/Login';
import { Link } from 'react-router-dom';
import { auth } from '../../utils/useAPI';
import { useEffect, useState } from 'react';

const LoginPage = () => {
  const logoutButtonHandle = () => {
    sessionStorage.removeItem('accessToken');
  };

  const [user, setUser] = useState(false);

  useEffect(() => {
    const authUser = async () => {
      const userInfo = await auth();
      setUser(userInfo);
    };
    authUser();
  }, []);

  return (
    <div>
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
    </div>
  );
};

export { LoginPage };

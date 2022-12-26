import React from 'react';
import Login from '../../components/Login';
import Header from '../../components/Header';

const LoginPage = () => {
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
          <Link to="/">메인 페이지로 이동</Link>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export { LoginPage };

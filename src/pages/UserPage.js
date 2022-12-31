import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { auth } from '../utils/useAPI';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import OrderHistory from '../components/Userpage/OrderHistory';
import CancleHistory from '../components/Userpage/CancleHistory';
import Account from '../components/Userpage/Account';
import EditMemberInfo from '../components/Userpage/EditMemberInfo';
import AuthPassword from '../components/Userpage/AuthPassword';
import Footer from '../components/Footer';

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

  //내비게이션 탭별 화면 전환
  //후에 outlet 라우팅으로 변경해볼 것
  const array = [
    { id: 'OrderHistory', title: 'My Orders', description: <OrderHistory /> },
    { id: 'CancleHistory', title: 'Order Cancelled', description: <CancleHistory /> },
    { id: 'Account', title: 'Bank Accounts', description: <Account user={user} /> },
    { id: 'EditMemberInfo', title: 'My Profile', description: <EditMemberInfo user={user} /> },
    { id: 'Auth', title: 'Password Authentication', description: <AuthPassword user={user} /> },
  ];

  const { menu } = useParams();

  return (
    <>
      <Header />
      <Navbar />
      <Container>
        <Menu aria-labelledby="my page navigation">
          <ul>
            {array
              .filter((item) => item.id !== 'Auth')
              .map((item) => (
                <li key={item.id}>
                  {item.id === 'Account' ? (
                    <StyeldLink to={`/user/Auth`}>
                      <button>{item.title}</button>
                    </StyeldLink>
                  ) : (
                    <StyeldLink to={`/user/${item.id}`}>
                      <button>{item.title}</button>
                    </StyeldLink>
                  )}
                </li>
              ))}
          </ul>
        </Menu>
        <Components>
          {array
            .filter((item) => menu === item.id)
            .map((item) => (
              <div key={item.id}>
                <Title>{item.title}</Title>
                <Description>{item.description}</Description>
              </div>
            ))}
        </Components>
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

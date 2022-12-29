import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { auth } from '../utils/useAPI';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import OrderHistory from '../components/Userpage/OrderHistory';
import CancleHistory from '../components/Userpage/CancleHistory';
import Account from '../components/Userpage/Account';
import EditMemberInfo from '../components/Userpage/EditMemberInfo';
import InputPassword from '../components/Userpage/InputPassword';
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
  console.log(user);

  //내비게이션 탭별 화면 전환
  const array = [
    { id: 0, title: '나의 주문내역', description: <OrderHistory /> },
    { id: 1, title: '취소 내역', description: <CancleHistory /> },
    { id: 2, title: '내 계좌', description: <InputPassword user={user} /> },
    { id: 3, title: '내정보 수정', description: <InputPassword user={user} /> },
  ];
  const [title, setTitle] = useState('나의 주문내역');

  return (
    <div>
      <Header />
      <Navbar />
      <Container>
        <Main>
          <Menu>
            <div>{user.displayName}님</div>
            <ul>
              {array.map((item) => (
                <li key={item.id} onClick={() => setTitle(item.title)}>
                  <button>{item.title}</button>
                </li>
              ))}
            </ul>
          </Menu>
          <Transactions>
            <UserInfo>
              <div>
                회원등급<span>ORANGE</span>
                <button>할인혜택 보기</button>
              </div>
              <div>
                사용가능한 계좌 잔액<span>000,000원</span>
              </div>
              <div>
                배송중<span>0개</span>
              </div>
            </UserInfo>
            <Details>
              <Title>
                {array
                  .filter((item) => title === item.title)
                  .map((item) => (
                    <div key={item.id}>{item.title}</div>
                  ))}
              </Title>
              <div>
                {array
                  .filter((item) => title === item.title)
                  .map((item) => (
                    <div key={item.id}>{item.description}</div>
                  ))}
              </div>
            </Details>
          </Transactions>
        </Main>
      </Container>
      <Footer />
    </div>
  );
};

const Container = styled.div`
  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`;

const Main = styled.div`
  display: flex;
  gap: 40px;
  padding: 40px;
`;

const Menu = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 30px;
  min-width: 250px;

  div {
    padding: 45px 0;
    font-weight: 700;
    font-size: 40px;
  }

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
`;

const Transactions = styled.div``;
const UserInfo = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  width: 100%;
  height: 140px;
  background-color: #303032;
  color: #9b9fa8;

  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: 300px;
  }

  div span {
    color: #fff;
    font-size: 40px;
  }

  div button {
    width: fit-content;
    padding: 6px 30px;
    background-color: transparent;
    border: 1px solid #fff;
    border-radius: 18px;
    color: #fff;
    font-size: 15px;
    cursor: pointer;
  }
`;
const Details = styled.div`
  margin-top: 40px;
`;
const Title = styled.h2`
  padding-bottom: 10px;
  border-bottom: 4px solid #000;
  font-size: 25px;
`;

export { UserPage };

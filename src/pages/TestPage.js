import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Header from '../components/Header';
import {
  addProduct,
  auth,
  deleteProduct,
  getAccount,
  getAllProduct,
} from '../utils/useAPI';

const Container = styled.div``;
const AccountWrap = styled.div`
  padding: 20px;
`;
const BankUl = styled.ul`
  padding: 20px;
`;
const AccountUl = styled.ul`
  padding: 20px;
`;
const ProductWrap = styled.div`
  padding: 20px;
`;
const Title = styled.strong`
  font-size: 20px;
`;
const ProductUl = styled.ul`
  padding: 20px;
  li {
    padding: 10px;
  }
  span {
    display: block;
  }
`;
const ProductForm = styled.form`
  input {
    display: block;
  }
`;

const TestPage = () => {
  const [user, setUser] = useState({});
  const [productList, setProductList] = useState([]);
  const [formToggle, setFormToggle] = useState(false);
  const [accountInfo, setAccountInfo] = useState({
    totalBalance: 0,
    accounts: [],
  });

  const [bankList, setBankList] = useState([]);
  useEffect(() => {
    const getState = async () => {
      const banks = await getAccount('banks');
      setBankList(banks);
      const accounts = await getAccount();
      setAccountInfo(accounts);
      const products = await getAllProduct(true);
      setProductList(products);
    };
    getState();
    getUser();
  }, []);

  const getUser = async () => {
    setUser(await auth());
  };

  const imgToBase64 = async (files) => {
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      return new Promise((resolve) => {
        reader.onload = () => {
          resolve(reader.result);
        };
      });
    } else {
      return '';
    }
  };

  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    data.thumbnailBase64 = await imgToBase64(data.thumbnailBase64);
    data.photoBase64 = await imgToBase64(data.photoBase64);

    await addProduct(true, data);
    setProductList([...productList, data]);
  };

  const deleteItem = async (id) => {
    await deleteProduct(true, id);
    setProductList(productList.filter((item) => item.id !== id));
  };

  return (
    <Container>
      <Header user={user} />
      테스트 페이지입니다.
      <AccountWrap>
        <Title>계좌</Title>
        <BankUl>
          <Title>등록 가능한 계좌</Title>
          {bankList.map((item) => {
            return <li>{item.name}</li>;
          })}
        </BankUl>
        <AccountUl>
          <Title>내가 가지고 있는 계좌</Title>
          <p>전체 금액: {accountInfo.totalBalance}</p>
          {accountInfo.accounts.length === 0 ? (
            <p>가지고 있는 계좌가 없습니다!</p>
          ) : (
            accountInfo.accounts.map((item) => (
              <li>
                <span>은행명: {item.bankList}</span>
                <span>계좌 번호: {item.accountNumber}</span>
                <span>소지 금액: {item.balance}</span>
              </li>
            ))
          )}
        </AccountUl>
      </AccountWrap>
      <ProductWrap>
        <Title>제품</Title>
        <button
          onClick={() => {
            setFormToggle(!formToggle);
          }}
        >
          제품 추가하기
        </button>
        {formToggle ? (
          <ProductForm onSubmit={handleSubmit(onSubmit)}>
            <input
              placeholder="제품 이름 (필수!)"
              {...register('title', { required: true })}
            />
            <input
              placeholder="제품 가격 (필수!)"
              {...register('price', { required: true })}
            />
            <textarea
              placeholder="제품 상세 설명 (필수!)"
              {...register('description', { required: true })}
            ></textarea>
            <input
              placeholder="태그"
              {...register('tags', { required: false })}
            />
            {/* 제품 썸네일 사진 */}
            <input
              type="file"
              {...register('thumbnailBase64', { required: false })}
            />
            {/* 제품 상세 사진 */}
            <input
              type="file"
              {...register('photoBase64', { required: false })}
            />
            <button type="submit">완료</button>
          </ProductForm>
        ) : (
          ''
        )}
        <ProductUl>
          <Title>현재 제품 리스트</Title>
          {productList.length === 0 ? (
            <p>등록한 제품이 없습니다!</p>
          ) : (
            productList.map((item) => (
              <li>
                <button
                  onClick={() => {
                    deleteItem(item.id);
                  }}
                >
                  삭제하기
                </button>
                <span>제품 이름: {item.title}</span>
                <span>제품 가격: {item.price}</span>
                <span>제품 상세 설명: {item.description}</span>
                <span>제품 태그: {item.tags}</span>
                {item.thumbnail ? (
                  <span>
                    제품 썸네일: <img alt="상품 이미지" src={item.thumbnail} />
                  </span>
                ) : (
                  ''
                )}
                {item.photo ? (
                  <span>
                    제품 상세 이미지:
                    <img alt="상품 상세 이미지" src={item.photo} />
                  </span>
                ) : (
                  ''
                )}
                <span>매진 여부: {item.isSoldOut ? 'O' : 'X'}</span>
              </li>
            ))
          )}
        </ProductUl>
      </ProductWrap>
    </Container>
  );
};

export { TestPage };

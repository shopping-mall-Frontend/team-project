import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import reset from '../css/reset-css.css';
import styled from 'styled-components';
import { getProductDetail } from '../utils/useAPI';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

const ProductdetailsPage = () => {
  /////////////// 단일 제품상세 불러오기 ///////////////
  const { id } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    const getServerProduct = async () => {
      const json = await getProductDetail(id);
      setProduct(json);
    };
    getServerProduct();
  }, []);

  //브랜드명, 상세 카테고리 변수에 담기
  const copyTags = { ...product.tags };

  /////////////// 장바구니 담기 ////////////////////////
  let cart = [];
  const getSsesionData = JSON.parse(sessionStorage.getItem('cart'));
  if (getSsesionData !== null) {
    cart = getSsesionData;
  }

  const setSsesionData = (cart) => {
    sessionStorage.setItem('cart', JSON.stringify(cart));
  };

  //수량
  const [count, setCount] = useState(1);

  //confirm창(상품 담기 확인 및 장바구니 이동)
  const navigate = useNavigate();
  const moveTocart = () => {
    {
      window.confirm(`상품을 장바구니에 담았습니다. 
장바구니로 이동하시겠습니까?`)
        ? navigate('/cart')
        : console.log(false);
    }
  };

  //Add to cart 버튼 클릭시
  const handleCart = () => {
    const cartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      thumnail: product.thumbnail,
      quantity: count,
    };

    //중복된 제품에 대한 수량 처리
    const setQuantity = (id, quantity) => {
      const found = cart.filter((elment) => elment.id === id)[0];
      const index = cart.indexOf(found);
      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        thumnail: product.thumbnail,
        quantity: quantity,
      };

      cart = [...cart.slice(0, index), cartItem, ...cart.slice(index + 1)];
      setSsesionData(cart);
    };

    const foundDuplication = cart.find((elment) => elment.id === cartItem.id);
    if (foundDuplication) {
      setQuantity(cartItem.id, foundDuplication.quantity + count);
    } else {
      cart.push(cartItem);
      setSsesionData(cart);
    }

    moveTocart();
  };

  return (
    <div>
      <Header />
      <Navbar />
      <Wrap>
        <ImageWrap>
          <img src={product.photo} alt={`${product.title} 상세이미지`} />
        </ImageWrap>

        <Sidebar>
          <Category>
            <li>{copyTags[0]}</li>
            <li>{copyTags[1]}</li>
          </Category>

          <Info>
            <li>{product.title}</li>
            <li>${product.price}</li>
          </Info>

          <Tab>
            <div>
              <dt>
                <button>DETAILS</button>
              </dt>
              <dd>{product.description}</dd>
            </div>
            <div>
              <dt>
                <button>CARE GUIDE</button>
              </dt>
              <dd>
                [가죽 및 스웨이드] <br /> 가벼운 세탁의 경우, 젖은 천을 이용하는 것이 좋습니다.
              </dd>
            </div>
            <div>
              <dt>
                <button>SHIPPING & RETURN</button>
              </dt>
              <dd>기본 배송 기간 모든 주문에 기본 배송 기간은 주문 결제 이후, 1~10일(영업일 기준)입니다.</dd>
            </div>
          </Tab>

          <Btns>
            <Link to={'/order'}>
              <button>BUY NOW</button>
            </Link>
            <button onClick={handleCart}>ADD TO CART</button>
          </Btns>
        </Sidebar>
      </Wrap>
    </div>
  );
};

const Wrap = styled.main`
  padding: 100px 0;
`;
const ImageWrap = styled.div`
  display: flex;
  justify-content: center;
  img {
    width: 500px;
  }
`;
const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 190px;
  right: 0;
  width: 400px;
  padding-right: 20px;
`;

const Category = styled.ol`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  color: rgb(137, 137, 137);
  font-size: 12px;
  li {
    cursor: pointer;
  }
  li + li::before {
    content: '/';
    padding-right: 10px;
  }
`;
const Info = styled.ol`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;

  li:first-child {
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: 700;
  }
`;
const Tab = styled.dl`
  margin-bottom: 30px;
  padding-right: 50px;
  div + div {
    margin-top: 8px;
  }
  dt button {
    padding-bottom: 10px;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
  }
`;

const Btns = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  button {
    width: 100%;
    padding: 10px 0;
    border: 1px solid #000;
    cursor: pointer;
  }
`;

export { ProductdetailsPage };

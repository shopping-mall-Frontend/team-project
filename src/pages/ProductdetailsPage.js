import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getProductDetail } from '../utils/useAPI';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

const ProductdetailsPage = ({ cart, setCart }) => {
  /////////////// 제품 상세 불러오기 ///////////////
  const { id } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    const getState = async () => {
      const json = await getProductDetail(id);
      setProduct(json);
    };
    getState();
  }, []);
  const copyTags = { ...product.tags };

  /////////////// 장바구니 담기 ///////////////
  const [count, setCount] = useState(1);

  //alert 창
  const navigate = useNavigate();
  const moveTocart = () => {
    {
      window.confirm(`상품을 장바구니에 담았습니다. 
  장바구니로 이동하시겠습니까?`)
        ? navigate('/cart')
        : console.log(false);
    }
  };

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
      const idx = cart.indexOf(found);
      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        thumnail: product.thumbnail,
        quantity: quantity,
      };
      setCart([...cart.slice(0, idx), cartItem, ...cart.slice(idx + 1)]);
    };

    const foundDuplication = cart.find((elment) => elment.id === cartItem.id);
    foundDuplication ? setQuantity(cartItem.id, foundDuplication.quantity + count) : setCart([...cart, cartItem]);

    moveTocart();
  };

  return (
    <Container>
      <Header />
      <Navbar />
      <ProductWrap>
        <ImageWrap>
          <img src={product.photo} alt={`${product.title} 상세이미지`} />
        </ImageWrap>
        <Sidebar>
          <div>
            <Category>
              <li>{copyTags[0]}</li>
              <li>{copyTags[1]}</li>
            </Category>

            <Info>
              <li>{product.title}</li>
              <li>{product.price}원</li>
            </Info>
          </div>
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
                [가죽 및 스웨이드] <br /> 가벼운 세탁의 경우, 젖은 천을 이용하는 것이 좋습니다. 더 깨끗하게 세탁해야 하는 경우에는 전문가에 의한 세탁을 추천합니다.{' '}
              </dd>
            </div>
            <div>
              <dt>
                <button>SHIPPING & RETURN</button>
              </dt>
              <dd>기본 배송 기간 모든 주문에 기본 배송 기간은 주문 결제 이후, 1~10일(영업일 기준)입니다. 재고 상황으로 인해 기본 배송 기간이 초과될 수 있으며, 사전에 이에 대한 알림을 보내드립니다.</dd>
            </div>
          </Tab>
          <Btns>
            <Link to={'/order'}>
              <button>BUY NOW</button>
            </Link>
            <button onClick={handleCart}>ADD TO CART</button>
          </Btns>
        </Sidebar>
      </ProductWrap>
    </Container>
  );
};

const Container = styled.div``;
const ProductWrap = styled.main`
  padding: 100px 0;
`;
const ImageWrap = styled.div`
  display: flex;
  justify-content: center;
  img {
    width: 500px;
  }
`;
const Sidebar = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 40px;
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
  li:first-child {
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: 700;
  }
`;
const Tab = styled.dl`
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

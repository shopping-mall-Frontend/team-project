import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getProductDetail } from '../utils/useAPI';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';

const ProductdetailsPage = () => {
  const [loading, setLoading] = useState(true);

  ////////// header 검색창 버그 해결 ///////////////////
  const location = useLocation();

  /////////////// 단일 제품상세 불러오기 ///////////////
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const getServerProduct = async (id) => {
      setLoading(true);
      try {
        const json = await getProductDetail(id);
        setProduct(json);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getServerProduct(id);
  }, [location.pathname]);

  //브랜드명, 상세 카테고리 변수에 담기
  const copyTags = { ...product.tags };

  /////////////// 장바구니 담기 ////////////////////////
  let cart = [];
  const getSsesionData = JSON.parse(sessionStorage.getItem('cart'));
  if (getSsesionData) {
    cart = getSsesionData;
  }

  const setSsesionData = (cartProducts) => {
    if (cartProducts && Object.keys(cartProducts).length !== 0) {
      sessionStorage.setItem('cart', JSON.stringify(cartProducts));
    }
  };

  //수량
  const [count, setCount] = useState(1);

  //confirm창(상품 담기 확인 및 장바구니 이동)
  const navigate = useNavigate();
  const moveTocart = () => {
    if (window.confirm(`상품을 장바구니에 담았습니다. \n장바구니로 이동하시겠습니까?`)) {
      navigate('/cart');
    }
  };

  //Add to cart 버튼 클릭시
  const handleCart = () => {
    const cartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      quantity: count,
    };

    //중복된 제품에 대한 수량 처리
    const setQuantity = (id, quantity) => {
      const findIndex = parseInt(cart.findIndex((elment) => elment.id === id));
      // console.log(typeof findIndex);
      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        quantity: quantity,
      };

      cart = [...cart.slice(0, findIndex), cartItem, ...cart.slice(findIndex + 1)];
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

  /////////////// 결제정보 관련 ////////////////////////
  let order = [];
  //장바구니 최초접속시, 결제정보 초기화
  order.push(product);
  sessionStorage.setItem('order', JSON.stringify());
  //주문하기 클릭시, 세션스토리지로 결제 정보 전달
  const orderSsesionData = (orderProducts) => {
    sessionStorage.setItem('order', JSON.stringify(orderProducts));
  };

  return (
    <div>
      <Header />
      <Container>
        {product && Object.keys(product).length !== 0 ? (
          <>
            <ImageWrap>
              <img src={product.thumbnail} alt={`${product.title} 썸네일`} />
              <img src={product.photo} alt={`${product.title} 상세이미지`} />
            </ImageWrap>

            <Sidebar>
              <Category>
                <li>
                  <Link to={'/category/all'}>Category</Link>
                </li>
                <li>
                  {copyTags[1] === '가방' ? (
                    <Link to={'/category/bags'}>{copyTags[1]}</Link>
                  ) : (
                    <Link to={'/category/clothes'}>{copyTags[1]}</Link>
                  )}
                </li>
                <li>
                  {copyTags[0] === 'LOUIS VUITTON' ? (
                    <Link to={`/category/all/LOUIS`}>{copyTags[0]}</Link>
                  ) : (
                    <Link to={`/category/all/${copyTags[0]}`}>{copyTags[0]}</Link>
                  )}
                </li>
              </Category>

              <Info>
                <li>
                  <h2>{product.title}</h2>
                </li>
                <li>${parseInt(product.price).toLocaleString()}</li>
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
                {product.isSoldOut ? (
                  <button className="soldout">SOLD OUT</button>
                ) : (
                  <div>
                    <Link to={'/order'}>
                      <button onClick={() => orderSsesionData(order)}>BUY NOW</button>
                    </Link>
                    <button onClick={handleCart}>ADD TO CART</button>
                  </div>
                )}
              </Btns>
            </Sidebar>
          </>
        ) : (
          ''
        )}
        {loading && <Loading />}
      </Container>
      <Footer />
    </div>
  );
};

const Container = styled.main`
  width: 1200px;
  margin: 0 auto;
  padding: 100px 0;
`;

const ImageWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 500px;
  }

  img:first-child {
    margin-bottom: 150px;
    border: 1px solid #000;
  }

  img:last-child {
    padding-top: 50px;
  }
`;

const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 190px;
  right: 0;
  width: 400px;
  padding: 20px;

  background-color: #fff;

  z-index: 1;
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
  button {
    width: 100%;
    margin-top: 10px;
    padding: 10px 0;
    border: 1px solid #000;
    cursor: pointer;
  }

  .soldout {
    color: #a6a6a6;
  }
`;

export { ProductdetailsPage };

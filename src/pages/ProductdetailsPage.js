import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import styles from '../css/ProductdetailsPage.module.css';
import { getProductDetail, headers } from '../utils/useAPI';
import Header from '../components/Header';

const ProductdetailsPage = ({ cart, setCart }) => {
  /////////////// 제품 상세 불러오기 ///////////////
  const { id } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    //이게 왜 안되는지 몰겠어요.. 살려주세요...
    // const getState = async (id) => {
    //   const json = await getProductDetail(id);
    //   setProduct(json);
    // };
    const getState = async () => {
      const json = await (
        await fetch(`https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/${id}`, {
          method: 'GET',
          headers,
        })
      ).json();
      setProduct(json);
    };
    getState();
  }, []);

  /////////////// 장바구니 담기 ///////////////
  const [count, setCount] = useState(1);

  const HandleCart = () => {
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
  };
  console.log(cart);

  return (
    <div>
      <Header />
      {/* 헤더에 들어갈 링크, 임시 표기 */}
      <div>
        <Link to={`/`}>
          <button>메인</button>
        </Link>
        <Link to={`/product`}>
          <button>제품 목록</button>
        </Link>
        <Link to={`/cart`}>
          <button>장바구니</button>
        </Link>
        <Link to={`/user`}>
          <button>user님</button>
        </Link>
      </div>
      {product && (
        <div>
          <img src={product.thumbnail} />
          <ol>
            <li>상품명 : {product.title}</li>
            <li>가격 : {product.price}원</li>
            <li>설명 : {product.description}</li>
            <button onClick={HandleCart}>ADD TO CART</button>
          </ol>
          <img src={product.photo} />
        </div>
      )}
    </div>
  );

  //CSS 추후 추가
  // const Container = styled.div``;
  // const Product = styled.div``;
  // const Sidebar = styled.div``;
  // const Info = styled.div``;
  // const Tab = styled.div``;
  // const Links = styled.ul``;
  // const Image = styled.div``;

  // <Container>
  //   <Header />
  //   {product === null ? (
  //     <p>"제품을 조회할 수 없습니다."</p>
  //   ) : (
  //     <Product className={styles.productwrap}>
  //       <Sidebar className={styles.sidebar}>
  //         <Info>
  //           <ol className={styles.category}>
  //             <li>카테고리</li>
  //             <li>카테고리2</li>
  //             <li>카테고리3</li>
  //           </ol>
  //           <ul className={styles.description}>
  //             <li>{product.title}</li>
  //             <li>{product.price}원</li>
  //             <li>{product.tags}</li>
  //           </ul>
  //         </Info>
  //         <Tab className={styles.tab}>
  //           <li>DETAILS</li>
  //           <div className={styles.tabdesc}>{product.description}</div>
  //         </Tab>
  //         <Links className={styles.links}>
  //           <li>
  //             <Link to="#">
  //               <button>BUY NOW</button>
  //             </Link>
  //           </li>
  //           <li>
  //             <button>ADD TO CART</button>
  //           </li>
  //         </Links>
  //       </Sidebar>
  //       <Image className={styles.img}>{product.photo ? <img className={styles.imgdetail} alt="상품 상세이미지" src={product.photo} /> : "상품 상세이미지 없음"}</Image>
  //     </Product>
  //   )}
  // </Container>
};

export { ProductdetailsPage };

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import styles from "../css/Productpage.module.css";
import Header from "../components/Header";
import { getProductDetail } from "../utils/useAPI";

const Container = styled.div``;
const Product = styled.div``;
const Sidebar = styled.div``;
const Info = styled.div``;
const Tab = styled.div``;
const Links = styled.ul``;
const Image = styled.div``;

const ProductdetailsPage = () => {
  const { id } = useParams();
  console.log(id);

  //단일 상품 조회
  const [product, setProduct] = useState("");
  useEffect(() => {
    const getState = async () => {
      const product = await getProductDetail();
      setProduct(product);
    };
    getState();
  }, []);

  //장바구니 담기
  const [cart, setCart] = useState([]);
  const [count, setCount] = useState(1);

  //같은 상품일 때 수량만 변경
  const setQuantity = (id, quantity) => {
    const found = cart.filter((el) => el.id === id)[0];
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

  const handleCart = () => {
    const cartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      thumnail: product.thumbnail,
      quantity: count,
    };

    const found = cart.find((el) => el.id === cartItem.id);

    if (found) setQuantity(cartItem.id, found.quantity + count);
    else setCart([...cart, cartItem]);
  };
  console.log(cart);

  return (
    <Container>
      <Header />
      {product === null ? (
        <p>"제품을 조회할 수 없습니다."</p>
      ) : (
        <Product className={styles.productwrap}>
          <Sidebar className={styles.sidebar}>
            <Info>
              <ol className={styles.category}>
                <li>카테고리</li>
                <li>카테고리2</li>
                <li>카테고리3</li>
              </ol>
              <ul className={styles.description}>
                <li>{product.title}</li>
                <li>{product.price}원</li>
                <li>{product.tags}</li>
              </ul>
            </Info>
            <Tab className={styles.tab}>
              <span>DETAILS</span>
              <div className={styles.tabdesc}>{product.description}</div>
            </Tab>
            <Links className={styles.links}>
              <li>
                <Link to="#">
                  <button>BUY NOW</button>
                </Link>
              </li>
              <li>
                <button onClick={handleCart}>ADD TO CART</button>
              </li>
            </Links>
          </Sidebar>
          <Image className={styles.img}>{product.photo ? <img className={styles.imgdetail} alt="상품 상세이미지" src={product.photo} /> : "상품 상세이미지 없음"}</Image>
        </Product>
      )}
    </Container>
  );
};

export { ProductdetailsPage };

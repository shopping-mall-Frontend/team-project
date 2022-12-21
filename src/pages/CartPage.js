import React from "react";
import styled from "styled-components";
import styles from "../css/CartPage.module.css";
import Header from "../components/Header";

const Container = styled.div``;
const Step = styled.ul``;
const Products = styled.section``;
const CartHeader = styled.div``;
const CartList = styled.div``;
const Price = styled.div``;

const CartPage = () => {
  return (
    <Container>
      <Header />
      <Step className={styles.step}>
        <li>01 SHOPPING BAG</li>
        <li>02 ORDER</li>
        <li>03 ORDER CONFIRMED</li>
      </Step>
      <Products className={styles.productwrap}>
        <CartHeader className={styles.carthead}>
          <input type="checkbox" />
          <span>상품정보</span>
          <span>수량</span>
          <span>주문금액</span>
          <span>배송비</span>
        </CartHeader>
        <CartList className={styles.cartlist}>
          <input type="checkbox" />
          <img src="" alt="" />
          <p>지갑</p>
          <div>
            <span>5</span>
          </div>
          <span>50000원</span>
          <span>2500원</span>
        </CartList>
      </Products>
      <button className={styles.cartlist} type="button">
        선택상품삭제
      </button>
      <Price className={styles.prices}>
        <ol>
          <li>
            <div>상품금액</div>
            <span>??,???원</span>
          </li>
          <li>
            <div>배송비</div>
            <span>2,500원</span>
          </li>
          <li>
            <div>총 상품금액</div>
            <span>??,???원</span>
          </li>
        </ol>
        <button class="btn" type="button">
          주문하기
        </button>
      </Price>
    </Container>
  );
};

export { CartPage };

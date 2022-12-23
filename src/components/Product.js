import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/Product.module.css';

const Product = ({ id, product }) => {
  return (
    <li>
      <Link to={`/product/${id}`}>
        <img src={product.thumbnail} alt="상품 이미지" />
      </Link>
      <span>{product.tags}</span>
      <span>{product.title}</span>
      <span>{`${product.price}원`}</span>
    </li>
  );
};

export default Product;

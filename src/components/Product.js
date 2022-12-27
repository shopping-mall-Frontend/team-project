import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
const PrdList = styled.li`
  a {
    display: block;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  ${(props) =>
    props.isCategory
      ? css`
          border: 2px solid red;
          padding: 10px;
          width: calc(25% - 15px);
          a {
            height: 400px;
            margin-bottom: 10px;
          }
        `
      : css`
          width: calc(20% - 15px);
          a {
            height: 225px;
            margin-bottom: 10px;
          }

          text-align: center;
        `}
`;

const PrdBrand = styled.p`
  margin-bottom: 5px;
`;
const PrdTitle = styled.p`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.02rem;
`;
const PrdPrice = styled.p`
  font-size: 0.9rem;
`;
const Product = ({ id, product, isCategory }) => {
  return (
    <PrdList isCategory={isCategory}>
      <Link to={`/product/${id}`} style={{ backgroundImage: `url(${product.thumbnail})` }} />
      <PrdBrand className="product-brand">[{product.tags[0]}]</PrdBrand>
      <PrdTitle>{product.title}</PrdTitle>
      <PrdPrice>{`${product.price.toLocaleString()}$`}</PrdPrice>
    </PrdList>
  );
};

export default Product;

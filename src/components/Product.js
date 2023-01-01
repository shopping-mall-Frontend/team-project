import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
const PrdList = styled.li`
  a {
    background-image: url(${(props) => props.url});
    display: block;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    font-size: 0;
  }
  ${(props) =>
    props.isCategory
      ? css`
          position: relative;
          padding: 10px;
          padding-bottom: 50px;
          width: calc(20% - 15px);
          a {
            height: 225px;
            margin-top: 20px;
            margin-bottom: 10px;

            ${(props) => (props.isSoldOut ? '' : '&:hover')} {
              font-size: 20px;
              font-weight: bolder;
              line-height: 225px;
              text-align: center;
              color: ${(props) => (props.isSoldOut ? 'red' : 'black')};
              background-image: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),
                url(${(props) => props.url});
            }
          }
          .product-brand {
            width: 70%;
            font-family: 'Marcellus';
            position: absolute;
            top: -10px;
            left: 50%;
            transform: translate(-50%, 0);
            border-bottom: 1px solid #dee2e6;
            padding-bottom: 10px;
          }
          text-align: center;
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
    <PrdList isCategory={isCategory} url={product.thumbnail} isSoldOut={product.isSoldOut}>
      <Link to={`/product/${id}`}>{product.isSoldOut ? 'Sold Out' : 'Go Details'}</Link>
      <PrdBrand className="product-brand">[{product.tags[0]}]</PrdBrand>
      <PrdTitle>{product.title}</PrdTitle>
      <PrdPrice>${`${product.price.toLocaleString()}`}</PrdPrice>
    </PrdList>
  );
};

export default Product;

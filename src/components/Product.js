import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
const PrdList = styled.li`
  width:calc(20% - 15px);
  
  a {
    display:block;
    height:200px;
    margin-bottom:10px;
    background-position:center;
    background-size:cover;
    background-repeat: no-repeat;
  }
`;
const PrdBrand = styled.p`
  margin-bottom:5px;
`
const PrdTitle = styled.p`
  display:block;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
  font-size:1.02rem;
`
const PrdPrice = styled.p`
  font-size:0.9rem;
`
const Product = ({ id, product }) => {
  return (
    <PrdList>
      <Link to={`/product/${id}`} style={{'backgroundImage':`url(${product.thumbnail})`}} />
      <PrdBrand  className='product-brand'>[{product.tags[0]}]</PrdBrand>
      <PrdTitle>{product.title}</PrdTitle>
      <PrdPrice>{`${product.price.toLocaleString()}원`}</PrdPrice>
    </PrdList>
  );
};
export default Product;
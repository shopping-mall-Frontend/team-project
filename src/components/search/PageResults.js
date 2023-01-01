import React from 'react';
import Product from '../Product';

const PageResults = ({ products, count, limit }) => {
  return (
    <>
      {products.slice(count, count + limit).map((product) => (
        <Product key={product.id} id={product.id} product={product} isCategory={true} />
      ))}
    </>
  );
};

export default PageResults;

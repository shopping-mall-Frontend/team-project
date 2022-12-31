import React from 'react';
import Product from '../Product';

const PageResults = ({ products }) => {
  return (
    <>
      {products.slice(0, 10).map((product) => (
        <Product key={product.id} id={product.id} product={product} isCategory={true} />
      ))}
    </>
  );
};

export default PageResults;

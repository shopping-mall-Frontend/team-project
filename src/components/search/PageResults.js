import React from 'react';
import { useNavigate } from 'react-router-dom';
import Product from '../Product';

const PageResults = ({ products }) => {
  return (
    <div>
      <ol>
        {products.slice(0, 10).map((product) => (
          <Product key={product.id} id={product.id} product={product} isCategory={true} />
        ))}
      </ol>
    </div>
  );
};

export default PageResults;

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getAllProduct } from '../utils/useAPI';
import Product from '../components/Product';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

const Container = styled.div`
  ol {
    display: flex;
    flex-wrap: wrap;
    margin: 80px 300px;
  }
`;

const ProductPage = ({ products, setProducts }) => {
  //제품 전체 목록 한번만 조회
  useEffect(() => {
    const getState = async () => {
      const json = await getAllProduct(true);
      setProducts(json);
    };
    getState();
  }, []);

  return (
    <Container>
      <Header />
      <Navbar />
      {/* 제품 목록 */}
      <ol>
        {products.map((product) => (
          <Product key={product.id} id={product.id} product={product} />
        ))}
      </ol>
    </Container>
  );
};

export { ProductPage };

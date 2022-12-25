import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/Productpage.module.css';
import { getAllProduct } from '../utils/useAPI';
import Product from '../components/Product';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

const ProductPage = ({ products, setProducts }) => {
  //제품 전체 목록 한번만 조회
  useEffect(() => {
    const getState = async () => {
      const data = await getAllProduct(true);
      setProducts(data);
    };
    getState();
  }, []);

  return (
    <div>
      <Header />
      <Navbar />
      {/* 제품 목록 */}
      <ol>
        {products.map((product) => (
          <Product key={product.id} id={product.id} product={product} />
        ))}
      </ol>
    </div>
  );
};

export { ProductPage };

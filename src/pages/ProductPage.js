import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/Productpage.module.css';
import { getAllProduct } from '../utils/useAPI';
import Product from '../components/Product';

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
      <Link to={`/`}>
        <button>메인</button>
      </Link>
      <Link to={`/cart`}>
        <button>장바구니</button>
      </Link>
      {products.map((product) => (
        <Product key={product.id} id={product.id} product={product} />
      ))}
    </div>
  );
};

export { ProductPage };

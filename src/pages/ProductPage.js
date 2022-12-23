import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/ProductPage.module.css';
import { getAllProduct } from '../utils/useAPI';
import Product from '../components/Product';
import Header from '../components/Header';

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
      {/* 헤더에 들어갈 링크, 임시 표기 */}
      <div>
        <Link to={`/`}>
          <button>메인</button>
        </Link>
        <Link to={`/cart`}>
          <button>장바구니</button>
        </Link>
        <Link to={`/user`}>
          <button>user님</button>
        </Link>
      </div>
      {products.map((product) => (
        <Product key={product.id} id={product.id} product={product} />
      ))}
    </div>
  );
};

export { ProductPage };

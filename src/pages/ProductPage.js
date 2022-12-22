import { useEffect } from "react";
import styles from "../css/Productpage.module.css";
import { getAllProduct } from "../utils/useAPI";
import Product from "../components/Product";

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
    <main>
      {products.map((product) => (
        <Product key={product.id} id={product.id} product={product} />
      ))}
    </main>
  );
};

export { ProductPage };

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProduct } from "../utils/useAPI";

const ProductPage = ({ product }) => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const getState = async () => {
      const products = await getAllProduct(true);
      setProductList(products);
      console.log(products);
    };
    getState();
  }, []);

  return (
    <div>
      {productList.map((item) => (
        <Link to={`/productdetails/${item.id}`}>
          <li key={item.id}>
            <span>제품 이름: {item.title}</span>
            <span>제품 이름: {item.id}</span>
          </li>
        </Link>
      ))}
    </div>
  );
};

export { ProductPage };

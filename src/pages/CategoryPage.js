import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Product from '../components/Product';
import { getAllProduct } from '../utils/useAPI';

const CategoryPage = React.memo(({ products }) => {
  // 모든 제품 출력
  const category = ['전체보기', '의류', '가방'];
  const [productList, setProductList] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(category[0]);

  const getProduct = async () => {
    const newData = await getAllProduct(true);
    setProductList(newData);
  };

  useEffect(() => {
    if (products.length === 0) {
      console.log('아직 정보를 못불러왔나바요!');
      getProduct();
    }
    category.forEach((ele) => {
      if (ele === '전체보기') {
        const newData = products;
        setProductList(newData);
      } else if (ele === currentCategory) {
        const newData = products.filter((item) => item.tags[1] === currentCategory);
        setProductList(newData);
      }
    });
  }, [currentCategory]);

  return (
    <>
      <Header />
      <Container>
        <ul>
          {category.map((item) => {
            return currentCategory === item ? (
              <CategoryMenuLi key={item} isCurrent={true}>
                {item}
              </CategoryMenuLi>
            ) : (
              <CategoryMenuLi
                key={item}
                onClick={() => {
                  setCurrentCategory(item);
                }}
              >
                {item}
              </CategoryMenuLi>
            );
          })}
        </ul>
        {/* 제품 목록 */}
        <ol>
          {productList.map((product) => (
            <Product key={product.id} id={product.id} product={product} isCategory={true} />
          ))}
        </ol>
      </Container>
    </>
  );
});

const Container = styled.main`
  border: 2px solid green;
  ol {
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const CategoryMenuLi = styled.li`
  color: ${(props) => (props.isCurrent ? 'red' : 'black')};
`;
export { CategoryPage };

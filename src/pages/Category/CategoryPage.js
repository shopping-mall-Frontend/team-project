import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../components/Header';
import PageOption from '../../components/PageOption';
import Product from '../../components/Product';
import { getAllProduct } from '../../utils/useAPI';

const CategoryPage = React.memo(({ products }) => {
  const { pathname } = window.location;
  const [currentCategory, setCurrentCategory] = useState(pathname.split('/')[2]);
  const category = [
    ['all', '전체보기'],
    ['clothes', '의류'],
    ['bags', '가방'],
  ];
  const [productList, setProductList] = useState([]);

  const brand = ['ALL', 'GUCCI', 'BOTTEGA VENETA', 'CHANEL', 'LOUIS VUITTON'];
  const [currentBrand, setCurrentBrand] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);

  // 페이지네이션에 필요한 변수들
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);
  const maxPage = Math.ceil(productList.length / limit);

  const getProduct = async () => {
    const newData = await getAllProduct(true);
    setProductList(newData);
    return newData;
  };

  useEffect(() => {
    setCount((page - 1) * limit + 1);
  }, [page]);

  const getCategories = (data) => {
    category.forEach((ele) => {
      if (currentCategory === 'all') {
        const newData = data;
        setProductList(newData);
        setCategoryProducts(newData);
      } else if (ele[0] === currentCategory) {
        const newData = data.filter((item) => item.tags[1] === ele[1]);
        setProductList(newData);
        setCategoryProducts(newData);
      }
    });
  };

  useEffect(() => {
    const test = async () => {
      if (products.length === 0) {
        console.log('아직 정보를 못불러왔나바요!');
        const newData = await getProduct();
        getCategories(newData);
      } else {
        getCategories(products);
      }
    };
    test();
  }, [currentCategory]);

  useEffect(() => {
    brand.forEach((ele) => {
      if (currentBrand === 'ALL') {
        const newData = categoryProducts;
        setProductList(newData);
      } else if (ele === currentBrand) {
        const newData = categoryProducts.filter((item) => item.tags[0] === ele);
        setProductList(newData);
      }
    });
  }, [currentBrand]);

  return (
    <>
      <Header />
      <Link to={'/category/all'} onClick={() => setCurrentCategory('all')}>
        전체보기
      </Link>
      <Link to={'/category/clothes'} onClick={() => setCurrentCategory('clothes')}>
        의류
      </Link>
      <Link to={'/category/bags'} onClick={() => setCurrentCategory('bags')}>
        가방
      </Link>
      <Container>
        <OptionDiv>
          <ul>
            {brand.map((item) => {
              return currentCategory === item ? (
                <CategoryMenuLi key={item} isCurrent={true}>
                  {item}
                </CategoryMenuLi>
              ) : (
                <CategoryMenuLi
                  key={item}
                  onClick={() => {
                    setCurrentBrand(item);
                  }}
                >
                  {item}
                </CategoryMenuLi>
              );
            })}
          </ul>
          <div>
            <PageOption page={page} maxPage={maxPage} setPage={setPage} />
          </div>
        </OptionDiv>
        {/* 제품 목록 */}
        <ol>
          {productList.slice(count, count + limit).map((product) => (
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

const OptionDiv = styled.div`
  display: flex;
`;
export { CategoryPage };

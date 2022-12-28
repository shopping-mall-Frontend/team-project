import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../components/Header';
import PageOption from '../../components/PageOption';
import Product from '../../components/Product';

const CategoryPage = React.memo(({ products }) => {
  const { pathname } = window.location;
  // 머지.. 이거 없으면 렌더링 안됩니다.
  const location = useLocation();
  const [currentCategory, setCurrentCategory] = useState(pathname.split('/')[2]);
  useEffect(() => {
    setCurrentCategory(pathname.split('/')[2]);
  }, [pathname]);

  const category = [
    ['all', '전체보기'],
    ['clothes', '의류'],
    ['bags', '가방'],
  ];
  const [productList, setProductList] = useState([]);

  const brand = ['ALL', 'GUCCI', 'BOTTEGA VENETA', 'CHANEL', 'LOUIS VUITTON'];
  const [currentBrand, setCurrentBrand] = useState('ALL');
  const [categoryProducts, setCategoryProducts] = useState(products);

  // 페이지네이션에 필요한 변수들
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const maxPage = Math.ceil(productList.length / limit);

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
    setCount((page - 1) * limit);
  }, [page]);

  useEffect(() => {
    console.log('!!');
    getCategories(products);
  }, [products, currentCategory]);

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
      <Container>
        <OptionDiv>
          <CategoryUl>
            {brand.map((item) => {
              return currentBrand === item ? (
                <CategoryMenuLi key={item} isCurrent={true}>
                  <Link to={`/category/${currentCategory}/${item.split(' ')[0]}`} onClick={() => setCurrentBrand(item)}>
                    {item}
                  </Link>
                </CategoryMenuLi>
              ) : (
                <CategoryMenuLi
                  key={item}
                  onClick={() => {
                    setCurrentBrand(item);
                  }}
                  logo={`/images/logo/${item.split(' ')[0]}_logo.png`}
                >
                  <Link to={`/category/${currentCategory}/${item.split(' ')[0]}`} onClick={() => setCurrentBrand(item)}>
                    {item}
                  </Link>
                </CategoryMenuLi>
              );
            })}
          </CategoryUl>
          <PageSectionWrap>
            <PageOption page={page} maxPage={maxPage} setPage={setPage} />
          </PageSectionWrap>
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
  ol {
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const CategoryMenuLi = styled.li`
  color: ${(props) => (props.isCurrent ? 'red' : 'black')};
  font-size: 15px;
  padding-right: 20px;
  cursor: pointer;
  &:hover {
    color: grey;
  }
`;

const CategoryUl = styled.ul`
  display: flex;
`;

const OptionDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px;
`;

const PageSectionWrap = styled.div``;
export { CategoryPage };

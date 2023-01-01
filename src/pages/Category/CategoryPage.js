import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import PageOption from '../../components/PageOption';
import Product from '../../components/Product';

const CategoryPage = React.memo(({ products }) => {
  const { pathname } = window.location;
  const brandPath = pathname.split('/')[3];

  // 머지.. 이거 없으면 렌더링 안됩니다.
  const location = useLocation();
  const [currentCategory, setCurrentCategory] = useState(pathname.split('/')[2]);

  const category = [
    ['all', '전체보기'],
    ['clothes', '의류'],
    ['bags', '가방'],
  ];
  const [productList, setProductList] = useState([]);

  const brand = ['ALL', 'GUCCI', 'BOTTEGA VENETA', 'CHANEL', 'LOUIS VUITTON'];
  const [currentBrand, setCurrentBrand] = useState(brandPath);
  const [categoryProducts, setCategoryProducts] = useState(products);

  // 페이지네이션에 필요한 변수들
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const maxPage = Math.ceil(productList.length / limit);

  useEffect(() => {
    setCurrentCategory(pathname.split('/')[2]);
    setCurrentBrand(brandPath ? brandPath : '');
  }, [pathname]);

  const getCategories = (data) => {
    category.forEach((ele) => {
      let newData = data;
      if (currentCategory === 'all') {
        newData = data;
        setProductList(newData);
        setCategoryProducts(newData);
      } else if (ele[0] === currentCategory) {
        newData = data.filter((item) => item.tags[1] === ele[1]);
        setProductList(newData);
        setCategoryProducts(newData);
      }
      brand.forEach((ele, i) => {
        if (i !== 0 && ele.split(' ')[0] === currentBrand) {
          newData = newData.filter((item) => item.tags[0] === ele);
          setProductList(newData);
        }
      });
    });
  };

  useEffect(() => {
    setCount((page - 1) * limit);
  }, [page]);

  useEffect(() => {
    getCategories(products);
  }, [products, currentCategory]);

  useEffect(() => {
    brand.forEach((ele) => {
      if (currentBrand === 'ALL') {
        const newData = categoryProducts;
        setProductList(newData);
      } else if (ele.split(' ')[0] === currentBrand) {
        const newData = categoryProducts.filter((item) => item.tags[0] === ele);
        setProductList(newData);
      }
    });
  }, [currentBrand]);

  return (
    <>
      <Header />
      <Container>
        <h2>{currentCategory.toUpperCase()} Category</h2>
        <OptionDiv>
          <CategoryUl>
            {brand.map((item) => {
              return currentBrand === item.split(' ')[0] ? (
                <CategoryMenuLi key={item} isCurrent={true}>
                  <Link
                    to={`/category/${currentCategory}/${item.split(' ')[0]}`}
                    onClick={() => setCurrentBrand(item.split(' ')[0])}
                  >
                    {item}
                  </Link>
                </CategoryMenuLi>
              ) : (
                <CategoryMenuLi
                  key={item}
                  onClick={() => {
                    setCurrentBrand(item.split(' ')[0]);
                  }}
                  logo={`/images/logo/${item.split(' ')[0]}_logo.png`}
                >
                  <Link
                    to={`/category/${currentCategory}/${item.split(' ')[0]}`}
                    onClick={() => setCurrentBrand(item.split(' ')[0])}
                  >
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
      <Footer />
    </>
  );
});

const Container = styled.main`
  width: 1200px;
  margin: 0 auto;
  padding-bottom: 300px;
  margin-top: 50px;
  h2 {
    font-family: 'Marcellus', serif;
    font-size: 20px;
    padding: 0 20px;
  }
  ol {
    margin-top: 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 15px;
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
  padding: 20px;
`;

const PageSectionWrap = styled.div``;
export { CategoryPage };

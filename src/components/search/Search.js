import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDebounce } from '../../hooks/useDebounce';
import { searchProduct } from '../../utils/useAPI';
import Loading from '../Loading';
import PageOption from '../PageOption';
import PageResults from './PageResults';
import ResultsBox from './ResultsBox';
import SearchBar from './SearchBar';

const Search = ({ isSearchPage }) => {
  // 쿼리 파라미터
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let query = useQuery().get('q');
  let queryBrand = useQuery().get('b');
  let queryType = useQuery().get('t');

  // 검색 창 관리 state
  const [inputValue, setInputValue] = useState(isSearchPage ? query : '');
  const [products, setProducts] = useState([]);
  const [openSearchBox, setOpenSearchBox] = useState(true);

  const searchQuery = useDebounce(inputValue, 500);

  // 페이지네이션
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [maxPage, setMaxPage] = useState(Math.ceil(products.length / limit));

  // 기타(useRef, navigation)
  const containerRef = useRef();
  const navigate = useNavigate();

  // 로딩
  const [isLoad, setIsLoad] = useState(true);

  const handleChange = (e) => {
    if (!e.target.value && !isSearchPage) {
      setProducts([]);
    }

    setInputValue(e.target.value);
  };

  const fetchSearchProducts = async (data, tags = []) => {
    setIsLoad(true);
    const newData = await searchProduct(data, tags);
    setProducts(newData);
    setIsLoad(false);
  };

  const onSubmit = async (data) => {
    data.tags = [];
    let url = `/search?q=${data.searchText}`;
    if (data.brand !== 'none') {
      url += `&b=${data.brand}`;
      data.tags.push(data.brand);
      delete data.brand;
    }
    if (data.type !== 'none') {
      url += `&t=${data.type}`;
      data.tags.push(data.type);
      delete data.type;
    }

    navigate(url);
    await fetchSearchProducts(data.searchText, data.tags);
  };

  useEffect(() => {
    if (!isSearchPage) {
      searchQuery ? fetchSearchProducts(searchQuery) : setProducts([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (isSearchPage) {
      // console.log(queryBrand);
      const tags = [];
      if (queryBrand) tags.push(queryBrand);
      if (queryType) tags.push(queryType);
      query ? fetchSearchProducts(query, tags) : setProducts([]);
    }
  }, [query]);

  useEffect(() => {
    setMaxPage(Math.ceil(products.length / limit));
  }, [products]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  useEffect(() => {
    setCount((page - 1) * limit);
  }, [page]);

  const handleClickOutside = (event) => {
    if (containerRef && !containerRef.current.contains(event.target)) {
      setOpenSearchBox(false);
    } else {
      setOpenSearchBox(true);
    }
  };

  const handleClick = () => {
    navigate(`/search?q=${inputValue}`);
  };

  // 헤더 검색 바
  if (!isSearchPage) {
    return (
      <Container ref={containerRef}>
        <SearchBar
          isSearchPage={isSearchPage}
          handleChange={handleChange}
          onSubmit={onSubmit}
          handleClick={handleClick}
        />
        {products.length > 0 ? (
          <ResultsBox products={products} openSearchBox={openSearchBox} isSearchPage={isSearchPage} />
        ) : (
          ''
        )}
      </Container>
    );
  } else {
    // 검색 페이지 검색 바
    return (
      <>
        <PageWrap ref={containerRef}>
          <SearchBar
            isSearchPage={isSearchPage}
            handleChange={handleChange}
            onSubmit={onSubmit}
            currentValue={query}
            inputValue={inputValue}
          />
          <OptionWrap>
            <PageOption page={page} maxPage={maxPage} setPage={setPage} />
          </OptionWrap>
          {products.length > 0 ? (
            <>
              <LengthP>Search Result: {products.length} items </LengthP>
              <ol>
                <PageResults count={count} limit={limit} products={products} />
              </ol>
            </>
          ) : (
            <Blank>
              <p>"{query}" 와 일치하는 검색결과가 없습니다.</p>
            </Blank>
          )}
        </PageWrap>
        {isLoad && <Loading />}
      </>
    );
  }
};

const Container = styled.div`
  position: absolute;
  z-index: 9999;
`;
const PageWrap = styled.div`
  position: relative;
  ol {
    margin-top: 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 15px;
  }
`;

const LengthP = styled.p`
  margin-top: 40px;
  font-size: 20px;
  color: #495057;
  font-family: 'Marcellus';
`;

const OptionWrap = styled.div`
  width: 20%;
  position: absolute;
  right: 0;
`;

const Blank = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  width: 100%;
  margin-top: 100px;
  padding: 150px 0;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;

  p {
    font-size: 25px;
  }
`;
export default Search;

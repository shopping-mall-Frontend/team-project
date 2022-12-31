import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDebounce } from '../../hooks/useDebounce';
import { searchProduct } from '../../utils/useAPI';
import PageResults from './PageResults';
import ResultsBox from './ResultsBox';
import SearchBar from './SearchBar';

const Search = ({ isSearchPage }) => {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let query = useQuery().get('q');

  const [inputValue, setInputValue] = useState(isSearchPage ? query : '');
  const [products, setProducts] = useState([]);
  const [openSearchBox, setOpenSearchBox] = useState(true);

  const containerRef = useRef();
  const navigate = useNavigate();

  const searchQuery = useDebounce(inputValue, 500);

  const handleChange = (e) => {
    if (!e.target.value && !isSearchPage) {
      setProducts([]);
    }

    setInputValue(e.target.value);
  };

  const fetchSearchProducts = async (data) => {
    const newData = await searchProduct(data);
    setProducts(newData);
  };

  const onSubmit = async (data) => {
    console.log(data);
    let url = `/search?q=${data.searchText}`;
    if (data.brand !== 'none') {
      url += `&brand=${data.brand}`;
    }
    if (data.type !== 'none') {
      url += `&type=${data.type}`;
    }

    navigate(url);
  };
  useEffect(() => {
    if (!isSearchPage) {
      searchQuery ? fetchSearchProducts(searchQuery) : setProducts([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (isSearchPage) {
      query ? fetchSearchProducts(query) : setProducts([]);
    }
  }, [query]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
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
      <PageWrap ref={containerRef}>
        <SearchBar
          isSearchPage={isSearchPage}
          handleChange={handleChange}
          onSubmit={onSubmit}
          currentValue={query}
          inputValue={inputValue}
        />
        <ol>{products.length > 0 ? <PageResults products={products} /> : ''}</ol>
      </PageWrap>
    );
  }
};

const Container = styled.div`
  position: absolute;
  z-index: 9999;
`;
const PageWrap = styled.div`
  ol {
    margin-top: 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export default Search;

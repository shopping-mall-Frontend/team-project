import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDebounce } from '../../hooks/useDebounce';
import { searchProduct } from '../../utils/useAPI';
import ResultsBox from './ResultsBox';

const Search = () => {
  const [inputValue, setInputValue] = useState('');
  const [products, setProducts] = useState([]);
  const [openSearchBox, setOpenSearchBox] = useState(true);

  const containerRef = useRef();

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const navigate = useNavigate();

  let query = useQuery();

  const searchQuery = useDebounce(inputValue, 500);

  const handleChange = (e) => {
    if (!e.target.value) {
      setProducts([]);
    }
    setInputValue(e.target.value);
  };

  const fetchSearchProducts = async (data) => {
    const newData = await searchProduct(data);
    setProducts(newData);
  };

  const handleSubmit = (e) => {
    navigate(`/search?q=${inputValue}`);
  };

  useEffect(() => {
    searchQuery ? fetchSearchProducts(searchQuery) : setProducts([]);
  }, [searchQuery]);

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

  return (
    <Container ref={containerRef}>
      <SearchWrap>
        <SearchInput placeholder="검색어를 입력하세요." onChange={handleChange} />
        <button onClick={handleSubmit}>
          <span className="material-symbols-outlined">search</span>
        </button>
      </SearchWrap>
      {products.length > 0 ? <ResultsBox products={products} openSearchBox={openSearchBox} /> : ''}
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  z-index: 9999;
`;

const SearchWrap = styled.div`
  display: flex;
  border-bottom: 0.5px solid #ece7e0;
  margin-left: 30px;
  padding-bottom: 5px;
`;
const SearchInput = styled.input`
  &::placeholder {
    color: #ced4da;
  }
`;
export default Search;

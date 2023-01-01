import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';

const tagValues = {
  brand: ['GUCCI', 'BOTTEGA VENETA', 'LOUIS VUITTON', 'CHANEL'],
  type: ['가방', '의류'],
};

const SearchBar = React.memo(({ isSearchPage, onSubmit, handleChange, handleClick }) => {
  const { register, handleSubmit, setValue } = useForm();
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let query = useQuery().get('q');

  const activeEnter = (e) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };

  useEffect(() => {
    setValue('searchText', query);
  }, [query]);

  return isSearchPage ? (
    <SearchForm onSubmit={handleSubmit(onSubmit)}>
      <SearchWrap isSearchPage={isSearchPage}>
        <SearchInput placeholder="검색어를 입력하세요." {...register('searchText')} />
        <button type="submit">
          <span className="material-symbols-outlined">search</span>
        </button>
      </SearchWrap>
      <select {...register('brand')}>
        <option value="none">=== 브랜드 선택 ===</option>
        {tagValues.brand.map((item) => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          );
        })}
      </select>
      <select {...register('type')}>
        <option value="none">=== 종류 선택 ===</option>
        {tagValues.type.map((item) => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </SearchForm>
  ) : (
    <SearchWrap isSearchPage={isSearchPage}>
      <SearchInput placeholder="검색어를 입력하세요." onChange={handleChange} onKeyDown={(e) => activeEnter(e)} />
      <button onClick={handleClick}>
        <span className="material-symbols-outlined">search</span>
      </button>
    </SearchWrap>
  );
});

const SearchForm = styled.form`
  margin: 0 auto;
  select {
    border: none;
    border-bottom: 1px solid #ced4da;
    margin-top: 20px;
  }
`;

const SearchWrap = styled.div`
  display: flex;
  border-bottom: 1px solid #ced4da;
  margin-left: 30px;
  padding-bottom: 5px;
  ${(props) =>
    props.isSearchPage
      ? css`
          margin: 0 auto;
          width: 100%;
          input {
            width: 100%;
            font-size: 25px;
          }
          span {
            font-size: 40px;
          }
        `
      : ''};
`;
const SearchInput = styled.input`
  &::placeholder {
    color: #ced4da;
  }
`;
export default SearchBar;

import React from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Search from '../components/search/Search';

const SearchPage = () => {
  return (
    <>
      <Header />
      <Main>
        <Search isSearchPage={true} />
      </Main>
      <Footer />
    </>
  );
};

const Main = styled.main`
  width: 1200px;
  margin: 0 auto;
  padding-bottom: 300px;
  margin-top: 50px;
`;
export default SearchPage;

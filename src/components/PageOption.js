import React from 'react';
import styled from 'styled-components';

const PageOption = ({ page, maxPage, setPage }) => {
  return (
    <OptionWrap>
      <EndButton onClick={() => setPage(1)}>&laquo;</EndButton>
      <ArrowButton onClick={() => setPage(page - 1)} disabled={page === 1}>
        {'<'}Prev
      </ArrowButton>
      <div> {page} </div>
      <ArrowButton onClick={() => setPage(page + 1)} disabled={page === maxPage}>
        Next{'>'}
      </ArrowButton>
      <EndButton onClick={() => setPage(maxPage)}>&raquo;</EndButton>
    </OptionWrap>
  );
};

const OptionWrap = styled.div`
  display: flex;
  justify-content: space-between;
  div {
    padding: 0px 12px;
    text-align: center;
    border: 3px solid black;
    border-radius: 5px;
    font-size: 20px;
    margin: 10px 0;
  }
`;

const EndButton = styled.button`
  display: block;
  font-size: 25px;
  line-height: 0px;
  cursor: pointer;
`;

const ArrowButton = styled.button`
  display: block;
  cursor: pointer;
  font-size: 20px;
`;
export default PageOption;

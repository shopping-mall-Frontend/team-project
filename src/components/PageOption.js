import React from 'react';
import styled from 'styled-components';

const PageOption = ({ page, maxPage, setPage }) => {
  return (
    <OptionWrap>
      <EndButton onClick={() => setPage(1)}>&laquo;</EndButton>
      <ArrowButton onClick={() => setPage(page - 1)} disabled={page === 1}>
        {'< '} Prev
      </ArrowButton>
      <div> {page} </div>
      <ArrowButton onClick={() => setPage(page + 1)} disabled={page === maxPage}>
        Next{' >'}
      </ArrowButton>
      <EndButton onClick={() => setPage(maxPage)}>&raquo;</EndButton>
    </OptionWrap>
  );
};

const OptionWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
  div {
    padding: 2px 0px;
    text-align: center;
    font-weight: bolder;
    font-size: 15px;
    margin: 0px 10px;
  }
`;

const EndButton = styled.button`
  display: block;
  font-size: 25px;
  line-height: 0px;
  cursor: pointer;
  &:hover {
    color: #ced4da;
  }
`;

const ArrowButton = styled.button`
  display: block;
  color: black;
  border-radius: 5px;
  padding: 2px 10px;
  cursor: pointer;
  font-size: 15px;
  &:hover {
    color: grey;
  }
  &:disabled {
    border: none;
    background-color: white;
    color: #ced4da;
    cursor: not-allowed;
  }
`;
export default PageOption;

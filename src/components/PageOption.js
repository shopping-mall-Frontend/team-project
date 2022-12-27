import React from 'react';
import styled from 'styled-components';

const PageOption = ({ page, maxPage, setPage }) => {
  return (
    <OptionWrap>
      <p> {page} Page</p>
      <div>
        <button onClick={() => setPage(1)}>Fir</button>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          ◀
        </button>
        <button onClick={() => setPage(page + 1)} disabled={page === maxPage}>
          ▶
        </button>
        <button onClick={() => setPage(maxPage)}>End</button>
      </div>
    </OptionWrap>
  );
};

const OptionWrap = styled.div`
  width: 50vw;
  display: flex;
  justify-content: space-between;
`;
export default PageOption;

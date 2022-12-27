import React from 'react';

const PageOption = ({ page, maxPage, setPage }) => {
  return (
    <div>
      <span> {page} Page</span>
      <button onClick={() => setPage(1)}>Fir</button>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        ◀
      </button>
      <button onClick={() => setPage(page + 1)} disabled={page === maxPage}>
        ▶
      </button>
      <button onClick={() => setPage(maxPage)}>End</button>
    </div>
  );
};

export default PageOption;

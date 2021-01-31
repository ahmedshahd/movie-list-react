import React from "react";
import _ from "lodash";

const Pagination = (props) => {
  const { itemsCount, pageSize, onPageChange, currentPage } = props;
  const pagesCount = Math.ceil(itemsCount / pageSize);
  const pages = _.range(1, pagesCount + 1);
  if (pagesCount === 0) return null;
  console.log(currentPage);
  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => {
          return (
            <li
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
              key={page}
            >
              <a className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination;

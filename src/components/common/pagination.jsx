import React from "react";
import _ from "lodash";

const Pagination = (props) => {
  const { itemsCount, pageSize } = props;
  const pagesCount = Math.ceil(itemsCount / pageSize);
  console.log(pagesCount);
  const pages = _.range(1, pagesCount + 1);
  if (pagesCount === 0) return null;
  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => {
          return (
            <li className="page-item" key={page}>
              <a className="page-link" onClick={props.onPageChange}>
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

import React from "react";
import './paging.css';
import Pagination from "react-js-pagination";

const Paging = ({page, totalItem, setPage}) => {
  if (totalItem>0) {
    return (
      <Pagination
        activePage={page}
        itemsCountPerPage={10}
        totalItemsCount={totalItem}
        pageRangeDisplayed={5}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={setPage}
        itemClass="page-item"
        linkClass="page-link"
      />
    );
  }
};

export default Paging;
import React from "react";
import Pagination from "react-js-pagination";
import "./Paging.css";
 
const Paging = ({ page, count, setPage }) => {

  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <div>
      <Pagination
        activePage={page}
        itemsCountPerPage={5}
        totalItemsCount={count}
        pageRangeDisplayed={5}
        prevPageText={"<"}
        nextPageText={">"}
        onChange={handlePageChange}
      />
    </div>
  );
};
 
export default Paging;
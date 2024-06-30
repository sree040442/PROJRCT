import React from "react";

const Pagination = (props) => {
  const { nPages, currentPage, setCurrentPage } = props;

  const pageNumbers = nPages > 0 ? [...Array(nPages + 1).keys()].slice(1) : 0;

  const nextPage = () => {
    if (currentPage !== nPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item" onClick={prevPage}>
            <a className="page-link" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>

          {pageNumbers.length > 0
            ? pageNumbers.map((pgNumber) => {
                return (
                  <li
                    className="page-item"
                    key={pgNumber}
                    onClick={() => setCurrentPage(pgNumber)}
                  >
                    <a className="page-link">
                      {pgNumber}{" "}
                    </a>
                  </li>
                );
              })
            : ""}
          <li className="page-item" onClick={nextPage}>
            <a className="page-link" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Pagination;

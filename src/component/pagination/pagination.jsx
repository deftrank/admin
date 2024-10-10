// @ts-nocheck
import { useState } from "preact/hooks";
import { Pagination } from "react-bootstrap";

export default function Pagination(props) {
  const { btnName, btnClass, onClick, style, height, color } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = 100; // total number of items
  const itemsPerPage = 10; // items per page
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPaginationItems = () => {
    let items = [];

    if (totalPages <= 7) {
      // Show all pages if total pages are less than or equal to 7
      for (let number = 1; number <= totalPages; number++) {
        items.push(
          <Pagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </Pagination.Item>
        );
      }
    } else {
      // Show first, last, and ellipsis for large number of pages
      items.push(
        <Pagination.Item
          key={1}
          active={1 === currentPage}
          onClick={() => handlePageChange(1)}
        >
          1
        </Pagination.Item>
      );

      if (currentPage > 4) {
        items.push(<Pagination.Ellipsis key="start-ellipsis" />);
      }

      // Show the middle range around the current page
      let startPage = Math.max(2, currentPage - 2);
      let endPage = Math.min(totalPages - 1, currentPage + 2);

      for (let number = startPage; number <= endPage; number++) {
        items.push(
          <Pagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </Pagination.Item>
        );
      }

      if (currentPage < totalPages - 3) {
        items.push(<Pagination.Ellipsis key="end-ellipsis" />);
      }

      items.push(
        <Pagination.Item
          key={totalPages}
          active={totalPages === currentPage}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </Pagination.Item>
      );
    }

    return items;
  };

  return (
    <>
      <Pagination>
        <Pagination.First
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        />
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {renderPaginationItems()}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
        <Pagination.Last
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </>
  );
}

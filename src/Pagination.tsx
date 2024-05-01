interface IProps {
  elementsPerPage: number;
  quantity: number;
  handlePage: (a: number) => void;
  currentPage: number;
}

const Pagination = ({
  elementsPerPage,
  quantity,
  handlePage,
  currentPage,
}: IProps) => {
  const paginationNumbers = [];

  for (let index = 0; index < Math.ceil(quantity / elementsPerPage); index++) {
    paginationNumbers.push(index);
  }

  return (
    <div className="pagination">
      {paginationNumbers.map((pageNumber) => (
        <button
          className={currentPage === pageNumber ? "active" : ""}
          key={pageNumber}
          onClick={() => handlePage(pageNumber)}
        >
          {" "}
          {pageNumber}{" "}
        </button>
      ))}
    </div>
  );
};

export default Pagination;

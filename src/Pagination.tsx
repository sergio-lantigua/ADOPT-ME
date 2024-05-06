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
  const paginationNumbers: number[] = [];

  for (let index = 0; index < Math.ceil(quantity / elementsPerPage); index++) {
    paginationNumbers.push(index);
  }

  const showPagination = paginationNumbers.length > 2;

  return showPagination ? (
    <div className="mb-3 flex items-center justify-center">
      {paginationNumbers.map((pageNumber) => (
        <button
          className={`${currentPage !== pageNumber ? "bg-gray-200" : "bg-gray-600"} mr-1 rounded-none p-2`}
          key={pageNumber}
          onClick={() => handlePage(pageNumber)}
        >
          {" "}
          {pageNumber}{" "}
        </button>
      ))}
    </div>
  ) : null;
};

export default Pagination;

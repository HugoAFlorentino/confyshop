import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';

const PaginationContainer = () => {
  const { meta } = useLoaderData();
  const { pageCount, page } = meta.pagination;

  const maxPagesToShow = 5;
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  if (pageCount < 2) return null;

  const getVisiblePages = () => {
    if (pageCount <= maxPagesToShow) {
      return Array.from({ length: pageCount }, (_, index) => index + 1);
    }

    const startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(pageCount, startPage + maxPagesToShow - 1);

    const pages = [];
    if (startPage > 1) pages.push(1, '...');
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    if (endPage < pageCount) pages.push('...', pageCount);

    return pages;
  };

  return (
    <div className='mt-16 flex justify-end'>
      <div className='join rounded-md'>
        <button
          className='btn btn-xs sm:btn-md join-item'
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Prev
        </button>
        {getVisiblePages().map((pageNumber, index) => (
          <button
            key={index}
            onClick={() =>
              typeof pageNumber === 'number' && handlePageChange(pageNumber)
            }
            className={`btn btn-xs sm:btn-md border-none join-item ${
              pageNumber === page ? 'bg-base-300 border-base-300' : ''
            }`}
          >
            {pageNumber}
          </button>
        ))}
        <button
          className='btn btn-xs sm:btn-md join-item'
          onClick={() => handlePageChange(page + 1)}
          disabled={page === pageCount}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationContainer;

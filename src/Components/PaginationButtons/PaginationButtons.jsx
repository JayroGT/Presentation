import React from "react"; //sacar useeffect
import { useDispatch } from "react-redux";
import { changePage } from "../../redux/actions";

const PaginationButtons = ({ totalProductos, currentPage }) => {
  const dispatch = useDispatch();

  const generatePageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalProductos; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <nav
      aria-label='Page Navigation'
      className='mx-auto my-10 flex max-w-xs justify-between space-x-2 rounded-md bg-white py-2'>
      {/* <button
        className='flex items-center space-x-1 font-medium hover:text-blue-600'
        aria-label='First Page'
        onClick={() => handlePageClick(1)}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='h-4 w-4'>
          <path
            fillRule='evenodd'
            d='M13.28 3.97a.75.75 0 010 1.06L6.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0zm6 0a.75.75 0 010 1.06L12.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z'
            clipRule='evenodd'
          />
        </svg>
      </button> */}
      <button
        className={`${
          currentPage === 0 &&
          "flex items-center space-x-1 font-medium hover:text-blue-600"
        } flex items-center space-x-1 font-medium hover:text-blue-600`}
        aria-label='Previous Page'
        onClick={() => dispatch(changePage("prev"))}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='h-4 w-4'>
          <path
            fillRule='evenodd'
            d='M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z'
            clipRule='evenodd'
          />
        </svg>
      </button>
      <ul className='flex items-center'>
        {generatePageNumbers().map((pageNumber) => (
          <li key={pageNumber}>
            <button
              className={`px-2 text-lg font-medium ${
                currentPage + 1 === pageNumber
                  ? "text-blue-600"
                  : "text-gray-400"
              } sm:px-3 hover:text-blue-600`}
              aria-label={`Page ${pageNumber}`}>
              {pageNumber}
            </button>
          </li>
        ))}
      </ul>
      <button
        className={` ${
          currentPage >= totalProductos - 1 ? "hidden" : null
        } flex items-center space-x-1 font-medium hover:text-blue-600`}
        aria-label='Next Page'
        onClick={() => dispatch(changePage("next"))}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='h-4 w-4'>
          <path
            fillRule='evenodd'
            d='M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z'
            clipRule='evenodd'
          />
        </svg>
      </button>
      {/* <button
        className='flex items-center space-x-1 font-medium hover:text-blue-600'
        aria-label='Last Page'
        onClick={() => handlePageClick(totalPages)}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='h-4 w-4'>
          <path
            fillRule='evenodd'
            d='M4.72 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 010-1.06zm6 0a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 010-1.06z'
            clipRule='evenodd'
          />
        </svg>
      </button> */}
    </nav>
  );
};

export default PaginationButtons;

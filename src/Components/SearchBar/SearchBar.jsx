import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterName } from "../../redux/actions";

export const SearchBar = () => {
  const [productId, setProductId] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setProductId(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (productId.trim() !== "") {
      dispatch(filterName(productId));
      setProductId("");
    }
  };
  return (
    // <div className='mx-2 my-10 rounded-xl border bg-white px-4 py-5 max-w-lg mx-auto'>
    <form
      onSubmit={handleSearch}
      className='border-b-2 focus-within:border-none focus-within:ring-1 focus-within:ring-offset-2 focus-within:ring-orange-300 focus-within:ring-offset-#97572a focus-within:rounded-md my-10 flex h-10 items-center justify-start border-b-2 bg-gray-100 leading-4 sm:w-96'>
      <input
        type='text'
        value={productId}
        name='search'
        onChange={handleChange}
        id='search'
        placeholder='Buscar producto'
        className='peer ml-2 flex-grow bg-transparent text-gray-900 outline-none  '
      />
      <button
        type='submit'
        className='peer-focus:mr-2 z-20 cursor-pointer text-#97572a outline-none duration-150 hover:scale-125'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='#eac14b'
          className='class="h-6 w-6 stroke-2" viewBox="0 0 32 32" fill="none"'>
          <circle
            cx='15'
            cy='14'
            r='8'
            stroke='#eac14b'
            fill='transparent'></circle>
          <line
            x1='21.1514'
            y1='19.7929'
            x2='26.707'
            y2='25.3484'
            stroke='#eac14b'
            fill='transparent'></line>
        </svg>
      </button>
    </form>
    // </div>
  );
};

//se agrega nuevo diseño

import React from "react";

const CartItem = ({
  id,
  title,
  category,
  image,
  quantity,
  price,
  stock,
  handleEliminar,
  handleIncrementar,
  handleDecrementar,
}) => {
  return (
    <div className='mb-6 justify-between rounded-lg bg-gray-200 p-6 shadow-md sm:flex sm:justify-start'>
      <img
        src={image}
        alt='product-image'
        className='w-full rounded-lg sm:w-40'
      />
      <div className='sm:ml-4 sm:flex sm:w-full sm:justify-between'>
        <div className='mt-5 sm:mt-0'>
          <h2 className='text-lg font-bold text-gray-900'>{title}</h2>
          <p className='text-lg mt-1 text-gray-900'>{price}</p>
          <p className='mt-1 text-xs text-gray-700'>{category}</p>
          <p className='mt-1 text-xs text-gray-700'>Inventario: {stock}</p>
        </div>
        <div className='mt-4 flex justify-between sm:mt-0 sm:block sm:space-x-6'>
          <div className='flex items-center border-gray-100'>
            <span
              className='cursor-pointer rounded-lg bg-gray-100 px-3 py-1 duration-100 hover:bg-amber-500 hover:text-gray-200'
              onClick={() => handleDecrementar(id)}>
              -
            </span>
            <span className='text-md h-8 w-8 border bg-white py-1 text-center outline-none'>
              {quantity}
            </span>
            <span
              className='cursor-pointer rounded-lg bg-gray-100 px-3 py-1 duration-100 hover:bg-amber-500 hover:text-gray-200'
              onClick={() => handleIncrementar(id)}>
              +
            </span>
          </div>
          <p
            className='justify-left flex cursor-pointer items-center text-center text-xs text-gray-600 hover:text-red-600'
            onClick={() => handleEliminar(id)}>
            Remove
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

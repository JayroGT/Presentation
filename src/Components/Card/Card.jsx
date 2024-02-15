import React from "react";
import { FaCartPlus, FaCartArrowDown } from "react-icons/fa";
import { BiDetail } from "react-icons/bi";
import { Link } from "react-router-dom";

const Card = ({ id, title, price, image, category }) => {
  return (
    <div
      key={id}
      className='group my-10 flex w-full flex-col overflow-hidden rounded-lg border border-black-100 bg-gradient-to-b from-yellow-400 to-gray-600 shadow-md'>
      <Link
        className='relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl'
        to={`/DetailProduct/${id}`}>
        <img
          className='peer absolute top-0 right-0 h-full w-full object-cover'
          src={image}
          alt='product image'
        />
      </Link>
      <div className='mt-4 px-5 pb-5'>
        <h5 className='text-xl tracking-tight text-slate-900'>{title}</h5>
        <p className='text-sm font-bold bg-amber-600 inline-block px-5 py-1 text-white rounded-lg'>
          {category}
        </p>

        <div className='mt-2 mb-5 flex items-center justify-between'>
          <p>
            <span className='text-3xl font-bold text-slate-900'>${price}</span>
          </p>
        </div>
        <Link
          to={`/DetailProduct/${id}`}
          className='flex items-center justify-center mb-2 rounded-md bg-amber-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-amber-700 focus:outline-none focus:ring-4 focus:ring-blue-300'>
          <BiDetail className='text-4xl pr-2' />

          <span className='text-white uppercase'>Ver Detalles</span>
        </Link>
      </div>
    </div>
  );
};

export default Card;

import React from "react";
import { Link } from "react-router-dom";


const Success = () => {
  return (
    <div className='flex justify-center flex-col items-center bg-amber-500 w-60 m-auto h-80 mt-10 rounded-lg '>
      <h2 className='text-xl p-4 text-center font-semibold text-white'>
        Pagado satisfactoriamente
      </h2>
      <Link
        to='/tienda'
        className='bg-green-600 rounded-lg px-2 py-3 text-white font-bold mt-10'>
        Seguir Comprando{" "}
      </Link>
    </div>
  );
};

export default Success;

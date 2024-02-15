import React from "react";
import style from "./Banner.module.css";

const Banner = ({ banner }) => {
  if (!banner) {
    return null; 
  }
  return (
    <>
      <div className='relative  container-fluid'>
        <div className='h-[300px]'>
          <img
            className='w-full h-full  object-cover'
            src={banner.imagen}
            alt={banner.texto}
          />

          <div className='text-white absolute top-20 bottom-0 left-0 right-0 text-center font-bold text-6xl'>
            <h1> {banner.texto}</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProductos } from "../../redux/actions";
import Card from "../Card/Card";

const Cards = ({ productos }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductos());
  }, [dispatch]);
  return (
    <>
      <div className='m-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-3 xl:gap-x-5'>
        {productos?.map((producto) => (
          <Card
            key={producto.id}
            id={producto.id}
            title={producto.title}
            image={producto.image}
            price={producto.price}
            category={producto.category}
          />
        ))}
      </div>
    </>
  );
};

export default Cards;

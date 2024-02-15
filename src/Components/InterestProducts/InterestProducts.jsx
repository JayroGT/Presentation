import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductos } from "../../redux/actions";
import styles from "./InterestProducts.module.css";
import Card from "../Card/Card";

const InterestProducts = () => {
  const allProductos = useSelector((state) => state.productos);
  const dispatch = useDispatch();
  const [selectedProductos, setSelectedProductos] = useState([]);

  useEffect(() => {
    dispatch(getProductos());
  }, [dispatch]);

  useEffect(() => {
    // Seleccionar tres productos al azar
    const shuffledProductos = allProductos.sort(() => 0.5 - Math.random());
    const selected = shuffledProductos.slice(0, 3);
    setSelectedProductos(selected);
  }, [allProductos]);

  return (
    <>
      <h2 className={styles.interestTitle}>Lo que te puede interesar:</h2>
      <div className={styles.interestGrid}>
        {selectedProductos.map((producto) => (
          <Card
            key={producto.id}
            id={producto.id}
            title={producto.title}
            image={producto.image}
            price={producto.price}
            category={producto.category}
            className={styles.interestCard} // Añadir una clase para el estilo de la tarjeta
          />
        ))}
      </div>
    </>
  );
};

export default InterestProducts;

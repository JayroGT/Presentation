import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDetail } from "../../redux/actions";
import { useParams, useNavigate, Link } from "react-router-dom";
import styles from "./Detail.module.css";
import CartContext from "../../context/CartContext";
import { useAuth0 } from "@auth0/auth0-react";

const DetailProduct = () => {
  const { id } = useParams();
  const { isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { agregarAlCarrito } = useContext(CartContext);
  const productDetail = useSelector((state) => state.productDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(id));
  }, [id, dispatch]);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (isAuthenticated && user && user.email) {
      try {
        const email = user.email;
        const { id } = productDetail;

        const item = {
          email,
          id,
          quantity,
        };
        await agregarAlCarrito(productDetail, quantity);
        const { data } = await axios.post(
          "https://animaliashop-backend.onrender.com/cart",
          item
        );
      } catch (error) {
        throw new Error("Error en el pedido al back " + error.message);
      }
    } else {
      await agregarAlCarrito(productDetail, quantity);
    }
  };

  const handleBuyNow = async (e) => {
    e.preventDefault();
    agregarAlCarrito(productDetail, quantity);
    navigate("/carrito");
  };

  const handleIncrement = () => {
    quantity < productDetail.stock && setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    quantity > 1 && setQuantity(quantity - 1);
  };

  return (
    <>
      <div>
        <Link
          to='/tienda'
          className='bg-green-500 text-white px-3 py-4 mt-10 inline-block ml-10 rounded-lg hover:bg-green-400 text-lg font-bold uppercase'>
          Volver a la Tienda
        </Link>
      </div>
      <div className={styles.container}>
        <h1 className={styles.title}>{productDetail.name}</h1>
        <img
          src={productDetail.image}
          alt={productDetail.name}
          style={{ width: "90%" }}
        />
        <p className={styles.description}>
          {" "}
          Descripcion: {productDetail.description}
        </p>
        <p className={styles.description}>
          Categoría: {productDetail.category}
        </p>
        <p className={styles.price}>Precio: ${productDetail.price}</p>
        <p className={styles.category}>Stock: {productDetail.stock} unidades</p>
        <div className='mt-8 flex items-center border-gray-100'>
          <span
            onClick={handleDecrement}
            className='cursor-pointer rounded-l bg-gray-100 px-3.5 py-1 duration-100 hover:bg-amber-500 hover:text-gray-200'>
            -
          </span>
          <span className='text-m h-8 w-8 border bg-white py-1 text-center outline-none'>
            {quantity}
          </span>
          <span
            onClick={handleIncrement}
            className='cursor-pointer rounded-r bg-gray-100 px-3 py-1 duration-100 hover:bg-amber-500 hover:text-gray-200'>
            +
          </span>
          <span className='ml-4 text-sm font-medium text-gray-500'>
            Inventory:{" "}
            {productDetail.stock > 0 ? productDetail.stock : "SIN STOCK"}
          </span>
        </div>
        <form className='mt-10 flex'>
          <div className='mr-4 w-1/2'>
            {productDetail.stock === 0 ? (
              <button
                className='flex w-full cursor-not-allowed items-center justify-center rounded-md border border-transparent bg-gray-500 px-8 py-3 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2'
                disabled>
                Add to cart
              </button>
            ) : (
              <button
                type='submit'
                className='flex w-full items-center justify-center rounded-md border border-transparent bg-amber-500 px-8 py-3 text-base font-medium text-white hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2'
                onClick={handleAddToCart}>
                Add to cart
              </button>
            )}
          </div>
          <div className='w-1/2'>
            {productDetail.stock === 0 ? (
              <button
                className='flex w-full cursor-not-allowed items-center justify-center rounded-md border border-transparent bg-gray-500 px-8 py-3 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2'
                disabled>
                Comprar Ahora
              </button>
            ) : (
              <button
                type='submit'
                className='flex w-full items-center justify-center rounded-md border border-transparent bg-green-500 px-8 py-3 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2'
                onClick={handleBuyNow}>
                Comprar Ahora
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default DetailProduct;

import { createContext, useEffect, useState } from "react";

const CartContext = createContext();

const carritoInicial = JSON.parse(localStorage.getItem("carrito")) || [];

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(carritoInicial);

  const agregarAlCarrito = async (
    productDetail,
    quantity,
    shouldUpdate = true
  ) => {
    const itemAgregado = { ...productDetail, quantity };
    const nuevoCarrito = [...carrito];
    const estaEnElCarrito = nuevoCarrito.find(
      (producto) => producto.id === itemAgregado.id
    );
    if (estaEnElCarrito) {
      estaEnElCarrito.quantity += quantity;
    } else {
      nuevoCarrito.push(itemAgregado);
    }
    if (shouldUpdate) {
      setCarrito(nuevoCarrito);
    }
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };
  const eliminarDelCarrito = (id) => {
    const nuevoCarrito = carrito.filter((producto) => producto.id !== id);
    setCarrito(nuevoCarrito);
  };
  const cantidadEnElCarrito = () => {
    return carrito.reduce((acc, prd) => acc + prd.quantity, 0);
  };
  const precioTotal = () => {
    const total = carrito.reduce(
      (acc, prod) => acc + prod.price * prod.quantity,
      0
    );
    return parseFloat(total.toFixed(2));
  };
  const precioFinalIva = () => {
    const precioFinal = Number(
      (precioTotal() + precioTotal() * 0.08).toFixed(2)
    );
    return precioFinal;
  };
  const vaciarCarrito = () => {
    setCarrito([]);
    localStorage.removeItem("carrito");
  };
  const incremento = (id) => {
    const nuevoCarrito = carrito.map((producto) =>
      producto.id === id
        ? {
            ...producto,
            quantity:
              producto.quantity < producto.stock
                ? producto.quantity + 1
                : producto.quantity,
          }
        : producto
    );
    setCarrito(nuevoCarrito);
  };

  const decremento = (id) => {
    const nuevoCarrito = carrito.map((producto) =>
      producto.id === id
        ? {
            ...producto,
            quantity:
              producto.quantity > 1 ? producto.quantity - 1 : producto.quantity,
          }
        : producto
    );
    setCarrito(nuevoCarrito);
  };

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  return (
    <CartContext.Provider
      value={{
        carrito,
        setCarrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        cantidadEnElCarrito,
        precioTotal,
        vaciarCarrito,
        incremento,
        decremento,
        precioFinalIva,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;

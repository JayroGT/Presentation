import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomeDashboard = () => {
  const [productData, setProductData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  const [deleteCategoryMessage, setDeleteCategoryMessage] = useState(null);
  const [deleteProductMessage, setDeleteProductMessage] = useState(null);

  const ObtenerDatos = async () => {
    try {
      const responseProduct = await fetch(
        "https://animaliashop-backend.onrender.com/products"
      );
      const dataProducts = await responseProduct.json();

      const responseCategory = await fetch(
        "https://animaliashop-backend.onrender.com/categories"
      );
      const dataCategories = await responseCategory.json();

      setProductData(dataProducts);
      setCategoryData(dataCategories);
    } catch (error) {
      console.log("Error al obtener estadísticas:", error);
    }
  };

  const handleDeleteCategory = async (categoryName) => {
    const confirmDelete = window.confirm(
      `¿Está seguro que desea eliminar la categoría "${categoryName}"?`
    );

    if (confirmDelete) {
      try {
        const response = await fetch(
          `https://animaliashop-backend.onrender.com/deleteCategories/${categoryName}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setDeleteCategoryMessage("Categoría eliminada con éxito");
          ObtenerDatos();
          setTimeout(() => setDeleteCategoryMessage(null), 3000);
        } else {
          setDeleteCategoryMessage("Error al eliminar la categoría");
        }
      } catch (error) {
        setDeleteCategoryMessage("Error en la solicitud DELETE");
      }
    }
  };

  const handleDeleteProduct = async (productId) => {
    const confirmDelete = window.confirm(
      "¿Está seguro que desea eliminar este producto?"
    );

    if (confirmDelete) {
      try {
        const response = await fetch(
          `https://animaliashop-backend.onrender.com/deleteProduct/${productId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setDeleteProductMessage("Producto eliminado con éxito");
          ObtenerDatos();
          setTimeout(() => setDeleteProductMessage(null), 3000);
        } else {
          setDeleteProductMessage("Error al eliminar el producto");
        }
      } catch (error) {
        setDeleteProductMessage("Error en la solicitud DELETE");
      }
    }
  };

  useEffect(() => {
    ObtenerDatos();
  }, []);

  return (
    <div className='flex flex-col md:flex-row bg-gradient-to-r from-blue-500 via-blue-400 to-green-500 text-white min-h-screen'>
      <div className='flex-1 p-8'>
        <div className='flex justify-between items-center mb-4'>
          <Link
            to='/dashboard'
            className='text-sm bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded text-center'>
            Admin users
          </Link>
        </div>
        <div className='flex justify-between max-w-md mx-auto mb-4'>
          <div className='w-1/2 mr-2'>
            <Link
              to='/dashboard/creationProduct'
              className='block py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded text-center'>
              Creación de Producto
            </Link>
          </div>
          <div className='w-1/2 ml-2'>
            <Link
              to='/dashboard/creationCategory'
              className='block py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded text-center'>
              Creación de Categoría
            </Link>
          </div>
        </div>

        {/* Datos Productos*/}
        <div>
          {deleteProductMessage && (
            <div className='bg-green-200 text-green-800 rounded-md p-4 mb-4'>
              {deleteProductMessage}
            </div>
          )}
          <h2 className='text-2xl font-semibold mb-2 text-center text-black mb-4'>
            Lista de productos:
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {productData.map((product) => (
              <div
                key={product.id}
                className='bg-white p-4 rounded shadow text-black mb-4'>
                <h3 className='text-lg font-bold mb-2 text-center text-gray-900'>
                  {product.title}
                </h3>

                <img
                  src={product.image}
                  alt={product.title}
                  className='mx-auto mb-4 max-w-full'
                  style={{ height: "200px" }}
                />
                <p className='text-sm text-gray-600'>Stock: {product.stock}</p>
                <p className='text-sm text-gray-600'>Precio: {product.price}</p>
                <p className='text-sm text-gray-600'>
                  Descripción: {product.description}
                </p>
                <p className='text-sm text-gray-600 mb-4'>
                  Categoría: {product.category}
                </p>

                <div className='flex justify-center'>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2'>
                    Eliminar
                  </button>
                  <Link
                    to={`/dashboard/modifications/product/${product.id}`}
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                    Editar
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Datos categorias*/}
        <div>
          {deleteCategoryMessage && (
            <div className='bg-green-200 text-green-800 rounded-md p-4 mb-4'>
              {deleteCategoryMessage}
            </div>
          )}
          <h2 className='text-2xl font-semibold mb-2 text-center text-black mb-4'>
            Lista de Categorías:
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {categoryData.map((category, index) => (
              <div
                key={index}
                className='bg-gray-100 rounded-lg shadow-md p-4 text-center'>
                <h3 className='text-xl font-semibold mb-4 text-black'>
                  {category.category}
                </h3>
                <img
                  src={category.image}
                  alt={category.category}
                  className='mx-auto mb-4 max-w-full'
                  style={{ height: "200px" }}
                />
                <div className='flex justify-center'>
                  <button
                    onClick={() => handleDeleteCategory(category.category)}
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2'>
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;

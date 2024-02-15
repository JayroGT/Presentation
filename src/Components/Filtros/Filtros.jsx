import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterProductsByCategory,
  restart,
  sortProductsByPrice,
} from "../../redux/actions";
import { ButtonList } from "../ButtonList/ButtonList";

export const Filtros = () => {
  const filtroIcono = `<svg class="bi bi-filter" fill="currentColor" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/></svg>`;

  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.backupProductos);
  // console.log('All Products:', allProducts);

  const allCategories = [
    "All",
    ...new Set(allProducts.map((product) => product.category.toLowerCase())),
  ];

  const filterCategory = (category) => {
    if (category === "All") {
      dispatch(restart()); // Reiniciar la lista de productos
    } else {
      dispatch(filterProductsByCategory(category)); // Filtrar por categoría
    }
  };
  const handleSortByPrice = (order) => {
    if (order === "none") {
      return;
    }
    // console.log('Sorting by Price:', order);

    dispatch(sortProductsByPrice(order));
  };
  // console.log(filteredProducts);

  return (
    <div className='mt-4 flex flex-col items-center'>
      <div>
        <ButtonList
          categories={allCategories}
          filterCategory={filterCategory}
        />
      </div>
      <br />
      <div className='text-center ml-auto flex items-center'>
        <label
          className='mr-2'
          dangerouslySetInnerHTML={{ __html: filtroIcono }}
        />
        <span className='mr-2'>Filtrar:</span>
        <select
          className='text-black py-2 px-2'
          onChange={(e) => handleSortByPrice(e.target.value)}>
          <option value='asc'>Precio mas bajo</option>
          <option value='desc'>Precio mas alto</option>
        </select>
      </div>
    </div>
  );
};

//se agrega nuevo diseño

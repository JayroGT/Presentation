import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchBar } from "../../Components/SearchBar/SearchBar";
import Cards from "../../Components/Cards/Cards";
import { getProductos } from "../../redux/actions";
import PaginationButtons from "../../Components/PaginationButtons/PaginationButtons";
import { Filtros } from "../../Components/Filtros/Filtros";

const Tienda = () => {
  const productos = useSelector((state) => state.productos);
  const currentPage = useSelector((state) => state.currentPage);
  const totalProductos = useSelector((state) => state.totalProductos);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductos());
  }, []);

  return (
      <div>
      <div>
        <div>
          <div className='w-full flex justify-center'>
            <SearchBar />
          </div>
          <div className='mt-4 mb-4'>
            <Filtros />
          </div>
        </div>
        <div>
          <Cards productos={productos} />
          <PaginationButtons
            totalProductos={totalProductos}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Tienda;

//se agrega nuevo diseño

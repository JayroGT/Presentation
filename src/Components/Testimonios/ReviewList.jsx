import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews } from '../../redux/actions';
import Review from './Review';

const ReviewList = () => {
    const dispatch = useDispatch();
    const reviews = useSelector((state) => state.reviews);
  
    // Estado para controlar si se deben mostrar todas las reseñas o solo algunas
    const [showAllReviews, setShowAllReviews] = useState(false);
  
    useEffect(() => {
  const fetchData = async () => {
    try {
      console.log('Componente montado');
      // Llama a la acción para obtener las revisiones desde el servidor
      await dispatch(fetchReviews());
      console.log('Reviews after fetch:', reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  fetchData();

  return () => {
    console.log('Componente desmontado');
  };
}, [dispatch]);
  
    // Filtrar las reseñas dependiendo de si se deben mostrar todas o solo algunas
    const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);
  
    return (
      <section className="bg-white">
        <div className="container px-6 py-10 mx-auto">
          <h1 className="text-2xl font-semibold text-center text-gray-600 capitalize lg:text-3xl">
            testimonios <span className="text-orange-400">de</span> clientes
          </h1>
  
          <p className="max-w-2xl mx-auto mt-6 text-center text-gray-600">
            Descubre lo que dicen nuestros clientes satisfechos. Testimonios reales que hablan de experiencias positivas. ¡Explora ahora!
          </p>
        </div>
        
        <section className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 lg:grid-cols-3 xl:grid-cols-3 bg-white">
          {displayedReviews.map((review, index) => (
            <div key={index}>
              <Review
                key={review?.id}
                id={review?.id}
                testimonio={review?.content}
                score={review?.score}
                createdAt={review?.createdAt}
              />
            </div>
          )).reverse()}
        </section>
  
        {/* Botón para mostrar más/menos reseñas */}
        <div className="text-center mt-6">
          <button
            className="text-blue-500 hover:underline"
            onClick={() => setShowAllReviews(!showAllReviews)}
          >
            {showAllReviews ? 'Mostrar Menos' : 'Mostrar Más'}
          </button>
        </div>
      </section>
    );
  };
  
  export default ReviewList;

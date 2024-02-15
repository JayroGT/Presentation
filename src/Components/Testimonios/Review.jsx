import React from 'react';

const Review = ({ id, testimonio, score, createdAt }) => {
  // Función para generar estrellas en función del puntaje
  const renderStars = (score) => {
    const starArray = Array.from({ length: 5 }, (_, index) => index + 1);
    return (
      <div className="flex items-center">
        {starArray.map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${star <= score ? 'text-yellow-300' : 'text-gray-300'}`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="p-8 border rounded-lg">
      <p className="leading-loose text-gray-500">“{testimonio}”.</p>

      <div className="flex items-center mt-8 -mx-2">
        <div className="mx-2">
          <h1 className="text-sm text-gray-800">{id}</h1>
          <span className="text-sm text-gray-700">
            Score: {renderStars(score)}
          </span>
          <br />
        </div>
      </div>
    </div>
  );
};

export default Review;

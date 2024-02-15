import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postReview } from '../../redux/actions';
import { useAuth0 } from '@auth0/auth0-react';
import ReviewList from './ReviewList';

const InputReview = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth0();

  const [testimonio, setTestimonio] = useState('');
  const [puntuacion, setPuntuacion] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica que el testimonio no esté vacío antes de enviar
    if (testimonio.trim() === '') {
      console.error('El testimonio no puede estar vacío');
      return;
    }

    // Objeto con la información del testimonio
    const newReview = {
      content: testimonio,
      score: puntuacion,
      // Otros campos según tus necesidades
    };

    // Llama a la acción para enviar el nuevo testimonio
    await dispatch(postReview(newReview));

    // Limpia el formulario después de enviar el testimonio
    setTestimonio('');
    setPuntuacion(0);
  };

  return (
    <div>
      <div className='mb-6'>
      <ReviewList />
      </div>

      {isAuthenticated && (
        <form className="max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="testimonio" className="block text-gray-700 text-sm font-bold mb-2">
              Testimonio:
            </label>
            <textarea
              id="testimonio"
              name="testimonio"
              value={testimonio}
              onChange={(e) => setTestimonio(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="4"
              placeholder="Escribe tu testimonio aquí..."
            />
          </div>
          <div className="mb-4">
            <label htmlFor="puntuacion" className="block text-gray-700 text-sm font-bold mb-2">
              Puntuación:
            </label>
            <input
              type="number"
              id="puntuacion"
              name="puntuacion"
              value={puntuacion}
              onChange={(e) => setPuntuacion(Number(e.target.value))}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              min="0"
              max="5"
              placeholder="Ingresa la puntuación (0-5)"
            />
          </div>
          <button
            type="submit"
            className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
          >
            Enviar Testimonio
          </button>
        </form>
      )}
    </div>
  );
};

export default InputReview;

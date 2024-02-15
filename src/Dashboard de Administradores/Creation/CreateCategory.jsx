import { useState, useEffect } from "react";
import axios from "axios";
import validation from "./validationCategory";
import { Link } from "react-router-dom";

const CreateCategory = () => {
  const [formData, setFormData] = useState({
    category: "",
    image: null,
  });

  // const URL = 'http://localhost:3001'
  const URL = "https://animaliashop-backend.onrender.com";

  const [formErrors, setFormErrors] = useState({});
  const [formHasErrors, setFormHasErrors] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [previewImage, setPreviewImage] = useState([]);

  useEffect(() => {
    const errors = validation(formData);
    setFormErrors(errors);
  }, [formData]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

    setFormHasErrors(false);
  };

  const handleImage = async (event) => {
    const selectedImage = event.target.files[0];

    if (selectedImage) {
      setPreviewImage(URL.createObjectURL(selectedImage));

      try {
        const formData = new FormData();
        formData.append("image", selectedImage);

        const cloudinaryResponse = await fetch(`${URL}/uploadImage`, {
          method: "POST",
          body: formData,
        });

        if (cloudinaryResponse.ok) {
          const cloudinaryData = await cloudinaryResponse.json();
          setFormData((prevData) => ({
            ...prevData,
            image: cloudinaryData.imageUrl,
          }));
        }
      } catch (error) {
        console.error("Error al enviar la imagen a Cloudinary:", error);
      }
    } else {
      setPreviewImage("");
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const errors = validation(formData);

    if (Object.values(errors).some((error) => error !== "")) {
      setFormHasErrors(true);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("category", formData.category);
      formDataToSend.append("image", formData.image);

      const response = await axios.post(`${URL}/create`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setSuccessMessage("Categoría creada con éxito");

        setFormData({
          category: "",
          image: null,
        });
        setFormErrors({});
        setPreviewImage("");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud al backend:", error);
    }
  };

  return (
    <div className='max-w-md mx-auto bg-white p-6 rounded-md shadow-md mt-8 border border-gray-700'>
      <h2 className='text-2xl font-bold mb-4 text-center text-blue-500'>
        Creación de Nueva Categoría
      </h2>
      {successMessage && (
        <p className='text-green-500 mb-2'>{successMessage}</p>
      )}

      <form onSubmit={onSubmit} encType='multipart/form-data'>
        <div className='mb-4'>
          <label className='block text-sm font-bold mb-2' htmlFor='category'>
            Nueva Categoría:
          </label>
          <input
            name='category'
            value={formData.category}
            onChange={handleChange}
            className='w-full px-3 py-2 border rounded'
          />
          {formErrors.category && (
            <p className='text-red-500 text-xs mt-1'>{formErrors.category}</p>
          )}
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-bold mb-2' htmlFor='image'>
            Image:
          </label>
          <input
            type='file'
            accept='image/*'
            onChange={handleImage}
            name='image'
            className='w-full px-3 py-2 border rounded'
          />
          {previewImage && (
            <img
              src={previewImage}
              alt='Vista Previa'
              className='mt-2 max-w-full h-auto'
            />
          )}
          {formErrors.image && (
            <p className='text-red-500 text-xs mt-1'>{formErrors.image}</p>
          )}
        </div>

        <button
          type='submit'
          className={`p-2 mt-4 w-full rounded ${
            formHasErrors
              ? "bg-red-500 text-white cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-700 cursor-pointer"
          }`}
          disabled={formHasErrors}>
          Crear Categoría
        </button>
      </form>

      <Link
        to='/dashboard/HomeDashboard'
        className='block mt-4 text-center text-blue-500 hover:underline'>
        Volver a HomeDshboard
      </Link>
    </div>
  );
};

export default CreateCategory;

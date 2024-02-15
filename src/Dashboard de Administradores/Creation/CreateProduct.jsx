import { useState, useEffect } from "react";
import validation from "./validationProduct";
import "tailwindcss/tailwind.css";
import { Link } from "react-router-dom";

const CrearProducto = () => {
  // const URL = 'http://localhost:3001'
  const URL = "https://animaliashop-backend.onrender.com";

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: null,
  });

  const [formErrors, setFormErrors] = useState({});
  const [formHasErrors, setFormHasErrors] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${URL}/categories`);
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          console.error(
            "Error al obtener las categorías:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };

    fetchCategories();
  }, []);

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
        } else {
          console.error(
            "Error al subir la imagen a Cloudinary:",
            cloudinaryResponse.statusText
          );
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
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("stock", formData.stock);
      formDataToSend.append("image", formData.image);

      const response = await fetch(`${URL}/createProduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          price: formData.price,
          category: formData.category,
          stock: formData.stock,
          imageUrl: formData.image,
        }),
      });

      if (response.ok) {
        setSuccessMessage("Producto creado con éxito");
        setFormData({
          title: "",
          description: "",
          price: "",
          category: "",
          stock: "",
          image: null,
        });
        setFormErrors({});
        setPreviewImage("");
      } else {
        console.error("Error al crear el producto:", response.statusText);
      }
    } catch (error) {
      console.error("Error al enviar la solicitud al backend:", error);
    }
  };

  return (
    <div className='max-w-md mx-auto bg-white p-6 rounded-md shadow-md mt-8 border border-gray-700'>
      <h2 className='text-2xl font-bold mb-4 text-center text-blue-500'>
        Creación de Nuevo Producto
      </h2>
      {successMessage && (
        <p className='text-green-500 mb-2'>{successMessage}</p>
      )}
      <form onSubmit={onSubmit} encType='multipart/form-data'>
        <div className='mb-4'>
          <label className='block text-sm font-bold mb-2' htmlFor='title'>
            Title:
          </label>
          <input
            name='title'
            value={formData.title}
            onChange={handleChange}
            className='w-full px-3 py-2 border rounded'
          />
          {formErrors.title && (
            <p className='text-red-500 text-xs mt-1'>{formErrors.title}</p>
          )}
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-bold mb-2' htmlFor='description'>
            Description:
          </label>
          <input
            name='description'
            value={formData.description}
            onChange={handleChange}
            className='w-full px-3 py-2 border rounded'
          />
          {formErrors.description && (
            <p className='text-red-500 text-xs mt-1'>
              {formErrors.description}
            </p>
          )}
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-bold mb-2' htmlFor='price'>
            Price:
          </label>
          <input
            name='price'
            value={formData.price}
            onChange={handleChange}
            step='0.01'
            className='w-full px-3 py-2 border rounded'
          />
          {formErrors.price && (
            <p className='text-red-500 text-xs mt-1'>{formErrors.price}</p>
          )}
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-bold mb-2' htmlFor='category'>
            Categoría:
          </label>
          <select
            name='category'
            value={formData.category}
            onChange={handleChange}
            className='w-full px-3 py-2 border rounded'>
            <option value='' disabled>
              Seleccione una categoría
            </option>
            {categories.map((category, index) => (
              <option key={index} value={category.category}>
                {category.category}
              </option>
            ))}
          </select>
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

        <div className='mb-4'>
          <label className='block text-sm font-bold mb-2' htmlFor='stock'>
            Stock:
          </label>
          <input
            name='stock'
            value={formData.stock}
            onChange={handleChange}
            className='w-full px-3 py-2 border rounded'
          />
          {formErrors.stock && (
            <p className='text-red-500 text-xs mt-1'>{formErrors.stock}</p>
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
          Enviar
        </button>
      </form>

      <Link
        to='/dashboard/HomeDashboard'
        className='block mt-4 text-center text-blue-500 hover:underline'>
        Volver a HomeDashboard
      </Link>
    </div>
  );
};

export default CrearProducto;

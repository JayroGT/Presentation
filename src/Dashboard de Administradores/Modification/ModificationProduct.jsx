//  import React from "react";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const ModificationProduct = () => {
  // const URL = "http://localhost:3001"
  const URL = "https://animaliashop-backend.onrender.com";

  const { id } = useParams();

  const [categories, setCategories] = useState([]);
  const [previewImage, setPreviewImage] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    available: "",
    image: null,
  });

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`${URL}/products/${id}`);
        const productData = response.data;
        setFormData(productData);
      } catch (error) {
        console.error("Error al obtener datos del producto:", error.message);
      }
    };

    fetchProductData();
  }, [id]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${URL}/products/${id}`, {
        ...formData,
      });

      console.log("Solicitud PUT exitosa:", response.data);
    } catch (error) {
      console.error("Error al enviar la solicitud PUT:", error.message);
    }
  };

  return (
    <div className='max-w-md mx-auto bg-white p-6 rounded-md shadow-md mt-8 border border-gray-700'>
      <h2 className='text-2xl font-bold mb-4 text-center text-blue-500'>
        Edicion de Producto
      </h2>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
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
        </div>

        <button type='submit'>Enviar</button>
      </form>
      <Link
        to='/dashboard/HomeDashboard'
        className='block mt-4 text-center text-blue-500 hover:underline'>
        Volver a Home Dashboard
      </Link>
    </div>
  );
};

export default ModificationProduct;

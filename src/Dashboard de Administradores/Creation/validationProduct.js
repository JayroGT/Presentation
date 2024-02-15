const validation = (formData) => {
  const errors = {};

  if (formData.title.trim() === "") {
    errors.title = "El título es obligatorio";
  } else if (!/^[A-Za-z\s]+$/.test(formData.title.trim())) {
    errors.title = "Ingresa un título válido con solo letras y espacios";
  }

  if (formData.description.trim() === "") {
    errors.description = "La descripción es obligatoria";
  } else if (formData.description.length < 10) {
    errors.description = "La descripción debe tener al menos 10 caracteres";
  }

  if (formData.price.trim() === "") {
    errors.price = "El precio es obligatorio";
  } else if (parseFloat(formData.price) <= 0) {
    errors.price = "El precio debe ser mayor a 0";
  }

  if (formData.category.trim() === "") {
    errors.category = "La categoría es obligatoria";
  }

  if (!formData.image) {
    errors.image = "La imagen es obligatoria";
  }

  if (formData.stock.trim() === "") {
    errors.stock = "El stock es obligatorio";
  } else if (parseInt(formData.stock) <= 0) {
    errors.stock = "El stock debe ser mayor a 0 y entero ";
  }

  return errors;
};

export default validation;

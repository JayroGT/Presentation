const validation = (formData) => {
  const errors = {};

  if (formData.category.trim() === "") {
    errors.category = "La categoria es obligatorio";
  } else if (!/^[A-Za-z\s]+$/.test(formData.category.trim())) {
    errors.category = "Ingresa una categoria válida con solo letras y espacios";
  }

  if (!formData.image) {
    errors.image = "La imagen es obligatoria";
  }

  return errors;
};

export default validation;

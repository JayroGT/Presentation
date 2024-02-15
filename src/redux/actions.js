import {
  FILTER_BY_NAME,
  SET_PRODUCTS,
  RESTART,
  PAGINATION,
  SORT_PRODUCTS_BY_PRICE,
  FILTER_PRODUCTS_BY_CATEGORY,
  ADD_TO_CART,
  GET_DETAIL,
  REMOVE_ALL_FROM_CART,
  REMOVE_ONE_FROM_CART,
  SET_INITIAL_CART,
  CREATE_USER,
  SET_REVIEWS,
  ADD_REVIEW,
  GET_CART,
} from "./actionTypes";
import axios from "axios";

const URL = "https://animaliashop-backend.onrender.com";

export const getProductos = () => async (dispatch) => {
  try {
    const { data } = await axios(`${URL}/products`);
    return dispatch({
      type: SET_PRODUCTS,
      payload: data,
    });
  } catch (error) {
    console.log("SUCEDIO UN ERROR AL REQUERIR LOS PRODUCTOS...");
  }
};

export const filterName = (name) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${URL}/products/title/${name}`);
      console.log("Response from server:", response.data);
      return dispatch({
        type: FILTER_BY_NAME,
        payload: response.data,
      });
    } catch (error) {
      console.error(
        "Error fetching items:",
        error.response?.data || error.message
      );
    }
  };
};

export const restart = () => async (dispatch) => {
  try {
    return dispatch({
      type: RESTART,
    });
  } catch (error) {
    alert(error.response.data.error);
  }
};

export const changePage = (order) => async (dispatch) => {
  console.log(order);

  try {
    return dispatch({
      type: PAGINATION,
      payload: order,
    });
  } catch (error) {
    alert(error.response.data.error);
  }
};

export const getDetail = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/products/${id}`);
      return dispatch({
        type: GET_DETAIL,
        payload: response.data,
      });
    } catch (error) {
      console.error(`Error getting product detail: ${error}`);
    }
  };
};

//   export const getById = (id) => {
//     return async function (dispatch) {
//       try {
//         if (!id) {
//           console.error("Invalid id:", id);
//           return;
//         }

//         const response = await axios.get(`${URL}/products/${id}`);
//         console.log("Response from server:", response.data);
//         dispatch({
//           type: GET_BY_ID,
//           payload: response.data,
//         });
//       } catch (error) {
//         console.error("Error fetching item by id:", error.response?.data || error.message);
//         throw error;
//       }
//     };
//   };
///////////////////// F I L T E R S /////////////////////////////////////////

export const filterProductsByCategory = (category) => async (dispatch) => {
  try {
    const response = await axios.get(`${URL}/products`, {
      params: {
        category: category,
      },
    });
    console.log("Response from server:", response.data);
    return dispatch({
      type: FILTER_PRODUCTS_BY_CATEGORY,
      payload: response.data,
    });
  } catch (error) {
    console.error(
      "Error filtering products by category:",
      error.response?.data || error.message
    );
  }
};

export const sortProductsByPrice = (order) => (dispatch, getState) => {
  const { filteredProductos } = getState();

  // (ascendente o descendente)
  const sortedProducts = [...filteredProductos].sort((a, b) => {
    if (order === "asc") {
      return a.price - b.price;
    } else if (order === "desc") {
      return b.price - a.price;
    }
    return 0;
  });

  dispatch({
    type: SORT_PRODUCTS_BY_PRICE,
    payload: sortedProducts,
  });
};
//////////////////////////////////////////////////////////////////////////////////////7

// Actions para el carrito

export const addToCart = (id) => async (dispatch) => {
  try {
    return dispatch({
      type: ADD_TO_CART,
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteFromCart =
  (id, all = false) =>
  (dispatch) => {
    try {
      {
        all
          ? dispatch({
              type: REMOVE_ALL_FROM_CART,
              payload: id,
            })
          : dispatch({
              type: REMOVE_ONE_FROM_CART,
              payload: id,
            });
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

// Guardando el estado actual del carrito
export const setInitialCart = (cart) => (dispatch) => {
  return dispatch({
    type: SET_INITIAL_CART,
    payload: cart,
  });
};

//CREACION DE USUARIOS
// export const createUser = (email) => {
//   const endpoint = `${URL}/users`;
//   return async (dispatch) => {
//     try {
//       const { data } = await axios.post(endpoint, email);
//       console.log(data);

//       if (!data) throw new Error("There was no data");
//       return dispatch({
//         type: CREATE_USER,
//       });
//     } catch (error) {
//       throw new Error(error.message);
//     }
//   };
// };

export const createUser = (email, name, picture) => {
  const endpoint = "users";

  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${URL}/${endpoint}`, {
        email,
        name,
        picture,
      });
      if (!data) throw new Error("There was no data");
      return dispatch({
        type: CREATE_USER,
        payload: data,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

// export const sendCartinBack = (productos) => async (dispatch) => {
//   const response = await axios.post("/createOrder", productos);
//   console.log(response);

//   if (response.status === 200) {
//     console.log("Carrito enviado con exito al backend");
//   }
// };

export const getCart = (email) => async (dispatch) => {
  try {
    const { data } = await axios(`${URL}/cart`, { params: { email: email } });

    await dispatch({
      type: GET_CART,
      payload: data,
    });
  } catch (error) {
    throw new Error("Error GET cart products:", error);
  }
};

//////////// R E V I E W //////////////////
// Acción para establecer las revisiones en el estado
export const setReviews = (reviews) => ({
  type: SET_REVIEWS,
  payload: reviews,
});

// Acción para agregar una revisión al estado
export const addReview = (review) => ({
  type: ADD_REVIEW,
  payload: review,
});

// Acción para obtener todas las revisiones desde el servidor
export const fetchReviews = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/review`);
      console.log("Complete response from server:", response);
      if (response.data) {
        dispatch(setReviews(response.data));
      } else {
        // console.error('Invalid response format:', response);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };
};

// Acción para enviar una nueva revisión al servidor
export const postReview = (reviewData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/upreview`, reviewData);
      dispatch(addReview(response.data.review));
    } catch (error) {
      console.error("Error al enviar la revisión:", error);
    }
  };
};

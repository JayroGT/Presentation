import {
  ADD_TO_CART,
  CLEAR_CART,
  FILTER_BY_NAME,
  FILTER_PRODUCTS_BY_CATEGORY,
  GET_CART,
  GET_DETAIL,
  PAGINATION,
  REMOVE_ALL_FROM_CART,
  REMOVE_ONE_FROM_CART,
  RESTART,
  SET_INITIAL_CART,
  // GET_BY_ID,
  // GET_TITLES,
  SET_PRODUCTS,
  SORT_PRODUCTS_BY_PRICE,
  SET_REVIEWS,
  ADD_REVIEW,
} from "./actionTypes";

const initialState = {
  productos: [],
  backupProductos: [],
  filteredProductos: [],
  filter: false,
  currentPage: 0,
  totalProductos: 0,
  carrito: [],
  productDetail: {},
  reviews: [],
};

const rootReducer = (state = initialState, action) => {
  const ITEM_PER_PAGE = 3;
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        productos: [...action.payload].splice(0, ITEM_PER_PAGE),
        currentPage: 0,
        backupProductos: action.payload,
        filteredProductos: action.payload,
        totalProductos: Math.ceil(
          [...state.backupProductos].length / ITEM_PER_PAGE
        ),
      };

    case FILTER_BY_NAME:
      return {
        ...state,
        filteredProductos: action.payload,
        productos: action.payload,
        totalProductos: Math.ceil(action.payload.length / ITEM_PER_PAGE),
        filter: true,
      };

    case RESTART:
      return {
        ...state,
        productos: [...state.backupProductos].splice(0, ITEM_PER_PAGE),
        filteredProductos: [...state.backupProductos],
        currentPage: 0,
        totalProductos: Math.ceil(
          [...state.backupProductos].length / ITEM_PER_PAGE
        ),
      };

    case GET_DETAIL:
      return {
        ...state,
        productDetail: action.payload,
      };

    case PAGINATION:
      // if (state.filter) {
      //   nextPage = state.currentPage + 1;
      //   prevPage = state.currentPage - 1;
      // } else {
      //   nextPage = Math.min(state.currentPage + 1, state.totalProductos);
      //   prevPage = Math.max(state.currentPage - 1, 1);
      // }

      const nextPage = state.currentPage + 1;
      const prevPage = state.currentPage - 1;

      const firstIndex = // 'next' 1 * 5 = 5
        action.payload === "next"
          ? nextPage * ITEM_PER_PAGE
          : prevPage * ITEM_PER_PAGE;

      if (state.filter) {
        if (
          action.payload === "next" &&
          firstIndex >= state.filteredProductos.length
        ) {
          return state;
        }

        if (action.payload === "prev" && prevPage < 0) return state;

        return {
          ...state,
          productos: [...action.filteredProductos].splice(
            firstIndex,
            ITEM_PER_PAGE
          ),
          currentPage: action.payload === "next" ? nextPage : prevPage,
          filter: true,
          totalProductos: Math.ceil(
            [...state.filteredProductos].length / ITEM_PER_PAGE
          ),
        };
      }

      if (
        action.payload === "next" &&
        firstIndex >= state.backupProductos.length
      )
        return state;

      if (action.payload === "prev" && prevPage < 0) return state;

      return {
        ...state,
        productos: [...state.backupProductos].splice(firstIndex, ITEM_PER_PAGE),
        currentPage: action.payload === "next" ? nextPage : prevPage,
        filter: false,
        totalProductos: Math.ceil(
          [...state.backupProductos].length / ITEM_PER_PAGE
        ),
      };

    //////////////////////////////// F I L T E R S ////////////////////////////
    case FILTER_PRODUCTS_BY_CATEGORY:
      // const filteredCategories = [...state.filteredProductos].filter(
      //   (product) => product.category === action.payload
      // );

      return {
        ...state,
        productos: [...action.payload].splice(0, ITEM_PER_PAGE),
        filteredProductos: action.payload,
        totalProductos: Math.ceil(action.payload.length / ITEM_PER_PAGE),
        filter: true,
      };

    case SORT_PRODUCTS_BY_PRICE:
      return {
        ...state,
        filteredProductos: [...state.filteredProductos].sort((a, b) => a + b),
        productos: action.payload.splice(0, ITEM_PER_PAGE),
        totalProductos: Math.ceil(action.payload.length / ITEM_PER_PAGE),
        filter: true,
      };

    ///////////////////////////////////////////////////////////////////////////

    // Reducer para el carrito

    // case ADD_TO_CART:
    //   const newProduct = state.backupProductos.find(
    //     (product) => product.id === action.payload
    //   );

    //   // newItem = busca el id que es pasado por el action en la base de datos
    //   const isCart = state.carrito.find(
    //     (product) => product.id === newProduct.id
    //   );

    //   const availableStock = newProduct.stock - (isCart ? isCart.cantidad : 0);

    //   if (availableStock <= 0) {
    //     console.log("No hay suficiente stock");
    //     return state;
    //   }

    //   console.log(isCart);
    //   // busca el id en el carrito de compras
    //   return isCart
    //     ? {
    //         ...state,
    //         carrito: state.carrito.map((product) =>
    //           product.id === newProduct.id
    //             ? { ...product, cantidad: product.cantidad + 1 }
    //             : product
    //         ),
    //       }
    //     : {
    //         ...state,
    //         carrito: [...state.carrito, { ...newProduct, cantidad: 1 }],
    //       };

    // case REMOVE_ONE_FROM_CART:
    //   const SearchProductCart = state.carrito.find(
    //     (item) => item.id === action.payload
    //   );

    //   return SearchProductCart.cantidad > 1
    //     ? {
    //         ...state,
    //         carrito: state.carrito.map((item) =>
    //           item.id === action.payload
    //             ? {
    //                 ...item,
    //                 cantidad: item.cantidad - 1,
    //               }
    //             : item
    //         ),
    //       }
    //     : {
    //         ...state,
    //         carrito: state.carrito.filter((item) => item.id !== action.payload),
    //       };

    // case REMOVE_ALL_FROM_CART:
    //   return {
    //     ...state,
    //     carrito: state.carrito.filter((item) => item.id !== action.payload),
    //   };
    // case SET_INITIAL_CART:
    //   return {
    //     ...state,
    //     carrito: action.payload,
    //   };
    case GET_CART:
      return {
        ...state,
        carrito: action.payload,
      };

    ////////// R E V I E W S ////////////////////////////
    case SET_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };

    case ADD_REVIEW:
      return {
        ...state,
        reviews: [...state.reviews, action.payload],
      };
    /////////////////////////////////////////////////////

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;

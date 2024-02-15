import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "./reducer";

const composeAlt = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancedCompose = composeAlt(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancedCompose);

export default store;

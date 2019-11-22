import { combineReducers, applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import coffeeShop from './utilities/coffeeShop';
const rootReducer = combineReducers({coffeeShop});
const middleware = applyMiddleware(thunkMiddleware);
const store = createStore(rootReducer, middleware);
export default store;
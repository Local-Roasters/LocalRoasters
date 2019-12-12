import { combineReducers, applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import coffeeShop from './utilities/coffeeShop';
import userPref from './utilities/userPref';
const rootReducer = combineReducers({ coffeeShop, userPref });
const middleware = applyMiddleware(thunkMiddleware);
const store = createStore(rootReducer, middleware);
export default store;
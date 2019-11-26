const GET_COFFEE_SHOPS = "GET_COFFEE_SHOPS";
const SELECT_COFFEE_SHOP = "SELECT_COFFEE_SHOP";
const STORE_COFFEE_SHOP = "STORE_COFFEE_SHOP";

const getCoffeeShop = () =>{
    return {
        type: GET_COFFEE_SHOPS
    }
}

const selectCoffeeShop = (id) =>{
    return {
        type: SELECT_COFFEE_SHOP,
        payload: id
    }
}

const storeCoffeeShop = (coffeeShop) =>{
    return{
        type: STORE_COFFEE_SHOP,
        payload: coffeeShop
    }
}

export const getCoffeeShopThunk = () => (dispatch) =>{
    dispatch(getCoffeeShop());
}

export const selectCoffeeShopThunk = (id) => (dispatch) =>{
    dispatch(selectCoffeeShop(id));
}

export const storeCoffeeShopThunk = (coffeeShop) => (dispatch) =>{
    dispatch(storeCoffeeShop(coffeeShop));
}

export default coffeeShop = (state =[], action) =>{
    switch (action.type) {
        case GET_COFFEE_SHOPS:{
            return state
        }
        case SELECT_COFFEE_SHOP:{
            return {...state,id:action.payload}
        }
        case STORE_COFFEE_SHOP:{
            return {...state, coffeeShops:action.payload};
        }
        default:{
            return state;
        }
            
    }
}
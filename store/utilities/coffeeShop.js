const GET_COFFEE_SHOP = "GET_COFFEE_SHOP";
const STORE_COFFEE_SHOP = "STORE_COFFEE_SHOP";

const getCoffeeShop = () =>{
    return {
        type: GET_COFFEE_SHOP
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

export const storeCoffeeShopThunk = (coffeeShop) => (dispatch) =>{
    dispatch(storeCoffeeShop(coffeeShop));
}

export default coffeeShop = (state = [], action) =>{
    switch (action.type) {
        case GET_COFFEE_SHOP:{
            return state;
        }
        case STORE_COFFEE_SHOP:{
            return action.payload;
        }
        default:{
            return state;
        }
            
    }
}
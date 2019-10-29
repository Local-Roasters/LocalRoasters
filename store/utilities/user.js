const INITIAL_STATE = {
    roastPreference="",
    pricePreference="",
    seg1: 1,
    seg2: 1,
    seg3: 1,
    money1:1,
    money2:1,
    money3:1
};
export default userReducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_FEED:{
            return action.payload;
        }
        default:{
            return state;
        }
            
    }
}
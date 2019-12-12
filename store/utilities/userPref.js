const GET_USER_PREF = "GET_USER_PREF";
const STORE_USER_PREF = "STORE_USER_PREF";

const getUserPref = () => {
    return {
        type: GET_USER_PREF
    }
}

const storeUserPref = (preferences) => {
    return {
        type: STORE_USER_PREF,
        payload: preferences
    }
}

export const getUserPrefThunk = () => (dispatch) => {
    dispatch(getUserPref());
}

export const storeUserPrefThunk = (preferences) => (dispatch) => {
    dispatch(storeUserPref(preferences));
}

export default userReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_USER_PREF: {
            return state
        }
        case STORE_USER_PREF: {
            return action.payload
        }
        default: {
            return state;
        }

    }
}
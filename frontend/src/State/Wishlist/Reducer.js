import { ADD_TO_WISHLIST_FAILURE, ADD_TO_WISHLIST_REQUEST, ADD_TO_WISHLIST_SUCCESS, CLEAR_WISHLIST_FAILURE, CLEAR_WISHLIST_REQUEST, CLEAR_WISHLIST_SUCCESS, FETCH_WISHLIST_FAILURE, FETCH_WISHLIST_REQUEST, FETCH_WISHLIST_SUCCESS, IS_PRODUCT_IN_WISHLIST_FAILURE, IS_PRODUCT_IN_WISHLIST_REQUEST, IS_PRODUCT_IN_WISHLIST_SUCCESS, REMOVE_FROM_WISHLIST_FAILURE, REMOVE_FROM_WISHLIST_REQUEST, REMOVE_FROM_WISHLIST_SUCCESS } from "./ActionType";

const initalState = {
    wishlist: [],
    loading: false,
    message: null,
    error: null,
};

export default function wishlistReducer(state = initalState, action) {
    switch (action.type) {
        case FETCH_WISHLIST_REQUEST:
        case ADD_TO_WISHLIST_REQUEST:
        case REMOVE_FROM_WISHLIST_REQUEST:
        case CLEAR_WISHLIST_REQUEST:
        case IS_PRODUCT_IN_WISHLIST_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_WISHLIST_SUCCESS:
            return { ...state, loading: false, wishlist: action.payload };
        case ADD_TO_WISHLIST_SUCCESS:
            return { ...state, loading: false, message: action.payload };
        case REMOVE_FROM_WISHLIST_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload,
            };
        case CLEAR_WISHLIST_SUCCESS:
            return { ...state, loading: false, wishlist: [] };
        case IS_PRODUCT_IN_WISHLIST_SUCCESS:
            return { ...state, loading: false, message: action.payload };
        case FETCH_WISHLIST_FAILURE:
        case ADD_TO_WISHLIST_FAILURE:
        case REMOVE_FROM_WISHLIST_FAILURE:
        case CLEAR_WISHLIST_FAILURE:
        case IS_PRODUCT_IN_WISHLIST_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}
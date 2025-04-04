import { ADD_TO_WISHLIST_FAILURE, ADD_TO_WISHLIST_REQUEST, ADD_TO_WISHLIST_SUCCESS, CLEAR_WISHLIST_FAILURE, CLEAR_WISHLIST_REQUEST, CLEAR_WISHLIST_SUCCESS, FETCH_WISHLIST_FAILURE, FETCH_WISHLIST_REQUEST, FETCH_WISHLIST_SUCCESS, IS_PRODUCT_IN_WISHLIST_FAILURE, IS_PRODUCT_IN_WISHLIST_REQUEST, IS_PRODUCT_IN_WISHLIST_SUCCESS, REMOVE_FROM_WISHLIST_FAILURE, REMOVE_FROM_WISHLIST_REQUEST, REMOVE_FROM_WISHLIST_SUCCESS } from "./ActionType";
import { api } from "../../config/apiConfig";
import { toast } from "react-toastify";

export const fetchWishlist = (setList) => async (dispatch) => {
    dispatch({ type: FETCH_WISHLIST_REQUEST });
    try {
        const { data } = await api.get(`/api/wishlist/get`);
        const sortedData = data.sort((a, b) => a.id - b.id);
        setList(sortedData);
        dispatch({ type: FETCH_WISHLIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FETCH_WISHLIST_FAILURE, payload: error.message });
    }
};

export const addToWishlist = (productId) => async (dispatch) => {
    dispatch({ type: ADD_TO_WISHLIST_REQUEST });
    try {
        const { data } = await api.put(`/api/wishlist/add/${productId}`);
        toast.success("Product added to wishlist")
        dispatch({ type: ADD_TO_WISHLIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: ADD_TO_WISHLIST_FAILURE, payload: error.message });
    }
}

export const removeFromWishlist = (productId) => async (dispatch) => {
    dispatch({ type: REMOVE_FROM_WISHLIST_REQUEST });
    try {
        const { data } = await api.put(`/api/wishlist/remove/${productId}`);
        toast.success("Product removed from wishlist")
        dispatch({ type: REMOVE_FROM_WISHLIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: REMOVE_FROM_WISHLIST_FAILURE, payload: error.message });
    }
};

export const clearWishlist = (setList) => async (dispatch) => {
    dispatch({ type: CLEAR_WISHLIST_REQUEST });
    try {
        const { data } = await api.put(`/api/wishlist/clear`);
        setList([]);
        toast.success("Wishlist cleared");
        dispatch({ type: CLEAR_WISHLIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CLEAR_WISHLIST_FAILURE, payload: error.message });
    }
};

export const isProductInWishlist = (productId) => async (dispatch) => {
    dispatch({ type: IS_PRODUCT_IN_WISHLIST_REQUEST });
    try {
        const { data } = await api.get(`/api/wishlist/isProductInWishlist/${productId}`);
        dispatch({ type: IS_PRODUCT_IN_WISHLIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: IS_PRODUCT_IN_WISHLIST_FAILURE, payload: error.message });
    }
}

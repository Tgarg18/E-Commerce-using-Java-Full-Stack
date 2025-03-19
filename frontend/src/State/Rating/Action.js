import { api } from "../../config/apiConfig";
import {
    CREATE_RATING_REQUEST,
    CREATE_RATING_SUCCESS,
    CREATE_RATING_FAILURE,
    FETCH_RATINGS_REQUEST,
    FETCH_RATINGS_SUCCESS,
    FETCH_RATINGS_FAILURE,
} from "./ActionType";

export const createRating = (ratingData, toast, navigate, handleClose) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_RATING_REQUEST });
        const { data } = await api.post("/api/ratings/create", ratingData);
        toast.success("Rating added successfully");
        navigate(`/product/${ratingData.productId}`);
        handleClose();
        dispatch({ type: CREATE_RATING_SUCCESS, payload: data });
    } catch (error) {
        toast.error(error.response.data.message);
        dispatch({ type: CREATE_RATING_FAILURE, payload: error.response.data.message });
    }
};

export const fetchRatings = (productId) => async (dispatch) => {
    try {
        dispatch({ type: FETCH_RATINGS_REQUEST });
        const { data } = await api.get(`/api/ratings/product/${productId}`);
        dispatch({ type: FETCH_RATINGS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FETCH_RATINGS_FAILURE, payload: error.response.data.message });
    }
};
import { api } from "../../config/apiConfig";
import {
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_FAILURE,
  FETCH_REVIEWS_REQUEST,
  FETCH_REVIEWS_SUCCESS,
  FETCH_REVIEWS_FAILURE,
} from "./ActionType";

export const createReview = (reviewData, toast, navigate, handleClose) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_REVIEW_REQUEST });
    const { data } = await api.post("/api/reviews/create", reviewData);
    toast.success("Review created successfully!");
    navigate(`/product/${reviewData.productId}`);
    handleClose();
    dispatch({ type: CREATE_REVIEW_SUCCESS, payload: data });
  } catch (error) {
    toast.error("Failed to create review!");
    dispatch({ type: CREATE_REVIEW_FAILURE, payload: error.response.data.message });
  }
};

export const fetchReviews = (productId) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_REVIEWS_REQUEST });
    const { data } = await axios.get(`/api/reviews/product/${productId}`);
    dispatch({ type: FETCH_REVIEWS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_REVIEWS_FAILURE, payload: error.response.data.message });
  }
};
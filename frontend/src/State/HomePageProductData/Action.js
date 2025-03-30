import axios from "axios";
import { FETCH_HOME_PAGE_DATA_FAILURE, FETCH_HOME_PAGE_DATA_REQUEST, FETCH_HOME_PAGE_DATA_SUCCESS } from "./ActionType";

export const fetchHomePageData = () => async (dispatch) => {
    dispatch({ type: FETCH_HOME_PAGE_DATA_REQUEST });
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/auth/home/getHomePageData`);
        dispatch({ type: FETCH_HOME_PAGE_DATA_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_HOME_PAGE_DATA_FAILURE, payload: error.response.data.message });
    }
};
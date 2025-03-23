import { CONTINUE_WITH_GOOGLE_FAILURE, CONTINUE_WITH_GOOGLE_REQUEST, CONTINUE_WITH_GOOGLE_SUCCESS } from "./ActionType";
import axios from "axios";

export const continueWithGoogle = (credentialResponse, navigate, toast) => async (dispatch) => {
    dispatch({ type: CONTINUE_WITH_GOOGLE_REQUEST }); 
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/auth/google`, {
            token: credentialResponse.credential,
        }); 
        dispatch({ type: CONTINUE_WITH_GOOGLE_SUCCESS, payload: response.data });
        localStorage.setItem("jwt", response?.data?.jwt);
        toast.success("Sign-In Successful!");
        navigate("/"); 
    } catch (error) {
        dispatch({ type: CONTINUE_WITH_GOOGLE_FAILURE, payload: error.response?.data?.message || error.message });
        toast.error(error?.response?.data?.message || error?.message);
        navigate("/login");
    }
};
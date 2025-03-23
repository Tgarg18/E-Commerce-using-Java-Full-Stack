import axios from "axios";
import { SEND_OTP_FORGOT_PASSWORD_FAILURE, SEND_OTP_FORGOT_PASSWORD_REQUEST, SEND_OTP_FORGOT_PASSWORD_SUCCESS, SET_NEW_PASSWORD_FAILURE, SET_NEW_PASSWORD_REQUEST, SET_NEW_PASSWORD_SUCCESS, VERIFY_OTP_FORGOT_PASSWORD_FAILURE, VERIFY_OTP_FORGOT_PASSWORD_REQUEST, VERIFY_OTP_FORGOT_PASSWORD_SUCCESS } from "./ActionType";

export const sendForgotPasswordOtp = (email, navigate, toast) => async (dispatch) => {
    dispatch({ type: SEND_OTP_FORGOT_PASSWORD_REQUEST });
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/auth/forgot-password-initiate?email=${email}`);
        dispatch({ type: SEND_OTP_FORGOT_PASSWORD_SUCCESS, payload: response.data });
        toast.success("OTP sent to your email. Please verify.");
        navigate("/verify-forgot-password");
    } catch (error) {
        dispatch({ type: SEND_OTP_FORGOT_PASSWORD_FAILURE, payload: error.response?.data?.message || error.message });
        toast.error("Failed to send OTP. Please try again.");
        navigate("/forgot-password");
    }
}

export const verifyForgotPasswordOtp = (email, otp, navigate, toast) => async (dispatch) => {
    dispatch({ type: VERIFY_OTP_FORGOT_PASSWORD_REQUEST });
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/auth/forgot-password-verify?email=${email}&otp=${otp}`);
        dispatch({ type: VERIFY_OTP_FORGOT_PASSWORD_SUCCESS, payload: response.data });
        toast.success("OTP verified successfully! Please set a new password.");
        navigate("/forgot-password-new-password");
    } catch (error) {
        dispatch({ type: VERIFY_OTP_FORGOT_PASSWORD_FAILURE, payload: error.response?.data?.message || error.message });
        toast.error("Failed to verify OTP. Please try again.");
        navigate("/forgot-password");
    }
}

export const setNewPassword = (email, password, navigate, toast) => async (dispatch) => {
    dispatch({ type: SET_NEW_PASSWORD_REQUEST });
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/auth/reset-password?email=${email}&password=${password}`);
        dispatch({ type: SET_NEW_PASSWORD_SUCCESS, payload: response.data });
        toast.success("Password changed successfully! Please login with your new password.");
        navigate("/login");
    } catch (error) {
        dispatch({ type: SET_NEW_PASSWORD_FAILURE, payload: error.response?.data?.message || error.message });
        toast.error("Failed to change password. Please try again.");
        navigate("/forgot-password");
    }
}
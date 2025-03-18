import axios from "axios";
import {
    REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE,
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
    SEND_OTP_REQUEST, SEND_OTP_SUCCESS, SEND_OTP_FAILURE,
    VERIFY_OTP_REQUEST, VERIFY_OTP_SUCCESS, VERIFY_OTP_FAILURE,
    GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE,
    LOGOUT
} from './ActionType';

// Send OTP for signup
export const sendSignupOtp = (userData, navigate) => async (dispatch) => {
    dispatch({ type: SEND_OTP_REQUEST });
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/auth/signup`, userData);
        console.log(response);
        navigate("/verify-otp-signup")
        dispatch({ type: SEND_OTP_SUCCESS, payload: response.data.message });
    } catch (error) {
        dispatch({ type: SEND_OTP_FAILURE, payload: error.response?.data?.message || error.message });
        navigate("/signup")
    }
};

// Verify OTP and register user
export const verifySignupOtp = (email, otp, userData, toast, navigate) => async (dispatch) => {
    dispatch({ type: VERIFY_OTP_REQUEST });
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/auth/verify-signup?email=${email}&otp=${otp}`, userData);
        const user = response.data;
        if (user.jwt) localStorage.setItem('jwt', user.jwt);
        dispatch({ type: VERIFY_OTP_SUCCESS, payload: user.jwt });
        toast.success("Signup successful!");
        navigate("/")
    } catch (error) {
        dispatch({ type: VERIFY_OTP_FAILURE, payload: error.response?.data?.message || error.message });
        toast.error("OTP verification failed.");
        navigate("/signup")
    }
};

// Send OTP for login
export const sendLoginOtp = (userData, toast, navigate) => async (dispatch) => {
    dispatch({ type: SEND_OTP_REQUEST });
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/auth/signin`, userData);
        dispatch({ type: SEND_OTP_SUCCESS, payload: response.data.message });
        toast.success("OTP sent to your email.");
        navigate("/verify-otp-signin")
    } catch (error) {
        dispatch({ type: SEND_OTP_FAILURE, payload: error.response?.data?.message || error.message });
        toast.error("Failed to send OTP.");
        navigate("/login")

    }
};

// Verify OTP and login user
export const verifyLoginOtp = (email, otp, toast, navigate) => async (dispatch) => {
    dispatch({ type: VERIFY_OTP_REQUEST });
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/auth/verify-signin?email=${email}&otp=${otp}`);
        const user = response.data;
        if (user.jwt) {
            localStorage.setItem('jwt', user.jwt);
            dispatch({ type: VERIFY_OTP_SUCCESS, payload: user.jwt });
            toast.success("Login successful!");
            navigate("/");
        }
    } catch (error) {
        dispatch({ type: VERIFY_OTP_FAILURE, payload: error.response?.data?.message || error.message });
        toast.error("Invalid OTP.");
        navigate("/login")
    }
};

// Get user profile
export const getUser = (jwt) => async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/users/profile`, {
            headers: { "Authorization": `Bearer ${jwt}` }
        });
        dispatch({ type: GET_USER_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_USER_FAILURE, payload: error.response?.data?.message || error.message });
    }
};

// Logout user
export const logout = () => (dispatch) => {
    localStorage.removeItem('jwt');
    dispatch({ type: LOGOUT });
};

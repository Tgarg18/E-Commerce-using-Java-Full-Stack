import axios from "axios";
import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from './ActionType'

const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = (user) => ({ type: REGISTER_SUCCESS, payload: user });
const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload: error });


export const register = (userData) => async (dispatch) => {
    dispatch(registerRequest());
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/auth/signup`, userData)
        const user = response.data;
        if (user.jwt)
            localStorage.setItem('jwt', user.jwt);
        dispatch(registerSuccess(user));
    } catch (error) {
        dispatch(registerFailure(error.message));
    }
}

const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user });
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

export const login = (userData, toast) => async (dispatch) => {
    dispatch(loginRequest());
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/auth/signin`, userData)
        const user = response.data;
        if (user.jwt) {
            localStorage.setItem('jwt', user.jwt);
            toast.success('Logged in successfully');
            dispatch(loginSuccess(user.jwt));
        }
    } catch (error) {
        console.log(error);
        dispatch(loginFailure(error.message));
    }
}

const getUserRequest = () => ({ type: GET_USER_REQUEST });
const getUserSuccess = (user) => ({ type: GET_USER_SUCCESS, payload: user });
const getUserFailure = (error) => ({ type: GET_USER_FAILURE, payload: error });
export const getUser = (jwt) => async (dispatch) => {
    dispatch(getUserRequest());
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/users/profile`, {
            headers: {
                "Authorization": `Bearer ${jwt}`
            }
        })
        const user = response.data;
        dispatch(getUserSuccess(user));
    } catch (error) {
        dispatch(getUserFailure(error.message));
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('jwt');
    dispatch({ type: LOGOUT, payload: null });
}
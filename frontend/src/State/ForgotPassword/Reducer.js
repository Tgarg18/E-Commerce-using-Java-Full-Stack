import { SEND_OTP_FORGOT_PASSWORD_FAILURE, SEND_OTP_FORGOT_PASSWORD_REQUEST, SEND_OTP_FORGOT_PASSWORD_SUCCESS, SET_NEW_PASSWORD_FAILURE, SET_NEW_PASSWORD_REQUEST, SET_NEW_PASSWORD_SUCCESS, VERIFY_OTP_FORGOT_PASSWORD_FAILURE, VERIFY_OTP_FORGOT_PASSWORD_REQUEST, VERIFY_OTP_FORGOT_PASSWORD_SUCCESS } from "./ActionType";

const initialState = {
    loading: false,
    error: null,
    message: null,
};

export const forgotPasswordReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_OTP_FORGOT_PASSWORD_REQUEST:
            return { ...state, loading: true, error: null };
        case SEND_OTP_FORGOT_PASSWORD_SUCCESS:
            return { ...state, loading: false, message: action.payload };
        case SEND_OTP_FORGOT_PASSWORD_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case VERIFY_OTP_FORGOT_PASSWORD_REQUEST:
            return { ...state, loading: true, error: null };
        case VERIFY_OTP_FORGOT_PASSWORD_SUCCESS:
            return { ...state, loading: false, message: action.payload };
        case VERIFY_OTP_FORGOT_PASSWORD_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case SET_NEW_PASSWORD_REQUEST:
            return { ...state, loading: true, error: null };
        case SET_NEW_PASSWORD_SUCCESS:
            return { ...state, loading: false, message: action.payload };
        case SET_NEW_PASSWORD_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
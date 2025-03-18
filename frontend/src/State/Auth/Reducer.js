import { 
    REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, 
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, 
    SEND_OTP_REQUEST, SEND_OTP_SUCCESS, SEND_OTP_FAILURE, 
    VERIFY_OTP_REQUEST, VERIFY_OTP_SUCCESS, VERIFY_OTP_FAILURE, 
    GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE, 
    LOGOUT 
} from "./ActionType";

const initialState = {
    user: null,
    isLoading: false,
    error: null,
    jwt: null,
    otpSent: false,
    otpVerified: false,
    message: null
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_OTP_REQUEST:
        case VERIFY_OTP_REQUEST:
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
            return { ...state, isLoading: true, error: null };

        case SEND_OTP_SUCCESS:
            return { ...state, isLoading: false, otpSent: true, message: action.payload };

        case VERIFY_OTP_SUCCESS:
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return { ...state, isLoading: false, jwt: action.payload, otpVerified: true, message: "Success" };

        case GET_USER_SUCCESS:
            return { ...state, isLoading: false, user: action.payload };

        case SEND_OTP_FAILURE:
        case VERIFY_OTP_FAILURE:
        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case GET_USER_FAILURE:
            return { ...state, isLoading: false, error: action.payload, otpSent: false, otpVerified: false };

        case LOGOUT:
            return { ...initialState };

        default:
            return state;
    }
};

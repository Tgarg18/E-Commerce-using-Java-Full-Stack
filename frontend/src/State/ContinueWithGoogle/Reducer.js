import { CONTINUE_WITH_GOOGLE_FAILURE, CONTINUE_WITH_GOOGLE_REQUEST, CONTINUE_WITH_GOOGLE_SUCCESS } from "./ActionType";

const initialState = {
    loading: false,
    error: null,
    jwt: null,
    message: null,
};

export const continueWithGoogleReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONTINUE_WITH_GOOGLE_REQUEST:
            return {...state, loading: true, error: null };
        case CONTINUE_WITH_GOOGLE_SUCCESS:
            return {...state, loading: false, jwt: action.payload.token };
        case CONTINUE_WITH_GOOGLE_FAILURE:
            return {...state, loading: false, error: action.payload };
        default:
            return state;
    }
}
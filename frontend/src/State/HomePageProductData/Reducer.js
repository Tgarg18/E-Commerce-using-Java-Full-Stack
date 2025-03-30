import { FETCH_HOME_PAGE_DATA_FAILURE, FETCH_HOME_PAGE_DATA_REQUEST, FETCH_HOME_PAGE_DATA_SUCCESS } from "./ActionType";

const initialState = {
    isLoading: true,
    error: null,
    data: null,
};

export const homePageDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_HOME_PAGE_DATA_REQUEST:
            return { ...state, isLoading: true, error: null };
        case FETCH_HOME_PAGE_DATA_SUCCESS:
            return { ...state, isLoading: false, data: action.payload };
        case FETCH_HOME_PAGE_DATA_FAILURE:
            return { ...state, isLoading: false, error: action.payload };
        default:
            return state;
    }
};
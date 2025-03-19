import {
    CREATE_RATING_REQUEST,
    CREATE_RATING_SUCCESS,
    CREATE_RATING_FAILURE,
    FETCH_RATINGS_REQUEST,
    FETCH_RATINGS_SUCCESS,
    FETCH_RATINGS_FAILURE,
} from "./ActionType";

const initialState = {
    ratings: [],
    loading: false,
    error: null,
};

const ratingReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_RATING_REQUEST:
        case FETCH_RATINGS_REQUEST:
            return { ...state, loading: true, error: null };

        case CREATE_RATING_SUCCESS:
            return { ...state, loading: false, ratings: [...state.ratings, action.payload] };

        case FETCH_RATINGS_SUCCESS:
            return { ...state, loading: false, ratings: action.payload };

        case CREATE_RATING_FAILURE:
        case FETCH_RATINGS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export default ratingReducer;

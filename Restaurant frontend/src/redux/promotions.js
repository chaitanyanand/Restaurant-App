import * as ActionTypes from './ActionTypes';

export const Promos = (state = {
    isLoading: true,
    errMess: null,
    promos: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PROMOS:
            return { ...state, isLoading: false, errMess: null, promos: action.payload };

        case ActionTypes.PROMOS_LOADING:
            return { ...state, isLoading: true, errMess: null, promos: [] };

        case ActionTypes.PROMOS_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, promos: [] };
        case ActionTypes.ADD_PROMO:
            return { ...state, isLoading: false, errMess: null, promos: state.promos.concat(action.payload) }
        case ActionTypes.DELETE_PROMO:
            return { ...state, isLoading: false, errMess: null, promos: state.promos.filter((promo) => promo._id !== action.payload) }
        case ActionTypes.UPDATE_PROMO:
            return { ...state, isLoading: false, errMess: null, promos: state.promos.map((promo) => (promo._id === action.payload._id ? action.payload : promo)) }

        default:
            return state;
    }
}
import * as ActionTypes from './ActionTypes';

export const Dishes = (state = {
    isLoading: true,
    errMess: null,
    dishes: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_DISHES:
            return { ...state, isLoading: false, errMess: null, dishes: action.payload };

        case ActionTypes.DISHES_LOADING:
            return { ...state, isLoading: true, errMess: null, dishes: [] };

        case ActionTypes.DISHES_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, dishes: [] };
        case ActionTypes.ADD_DISH:
            return { ...state, isLoading: false, errMess: null, dishes: state.dishes.concat(action.payload) }
        case ActionTypes.DELETE_DISH:
            return { ...state, isLoading: false, errMess: null, dishes: state.dishes.filter((dish) => dish._id !== action.payload) }
        case ActionTypes.UPDATE_DISH:
            return { ...state, isLoading: false, errMess: null, dishes: state.dishes.map((dish) => (dish._id === action.payload._id ? action.payload : dish)) }
        default:
            return state;
    }
}
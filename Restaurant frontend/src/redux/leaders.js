import * as ActionTypes from './ActionTypes';

export const Leaders = (state = {
    isLoading: true,
    errMess: null,
    leaders: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_LEADERS:
            return { ...state, isLoading: false, errMess: null, leaders: action.payload };

        case ActionTypes.LEADERS_LOADING:
            return { ...state, isLoading: true, errMess: null, leaders: [] }

        case ActionTypes.LEADERS_FAILED:
            return { ...state, isLoading: false, errMess: action.payload };
        case ActionTypes.ADD_LEADER:
            return { ...state, isLoading: false, errMess: null, leaders: state.leaders.concat(action.payload) }
        case ActionTypes.DELETE_LEADER:
            return { ...state, isLoading: false, errMess: null, leaders: state.leaders.filter((leader) => leader._id !== action.payload) }
        case ActionTypes.UPDATE_LEADER:
            return { ...state, isLoading: false, errMess: null, leaders: state.leaders.map((leader) => (leader._id === action.payload._id ? action.payload : leader)) }
        default:
            return state;
    }
};
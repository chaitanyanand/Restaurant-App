import * as ActionTypes from './ActionTypes';

export const Tables = (state = {
    isLoading: true,
    errMess: null,
    tables: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_TABLES:
            return { ...state, isLoading: false, errMess: null, tables: action.payload };

        case ActionTypes.TABLES_LOADING:
            return { ...state, isLoading: true, errMess: null, tables: [] };

        case ActionTypes.TABLES_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, tables: [] };

        case ActionTypes.ADD_TABLE:
            return { ...state, isLoading: false, errMess: null, tables: state.tables.concat(action.payload) }

        case ActionTypes.DELETE_TABLE:
            return { ...state, isLoading: false, errMess: null, tables: state.tables.map((table) => table.Id !== action.payload) }

        default:
            return state;
    }
}
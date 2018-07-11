/* eslint-disable */
import { createStore } from "redux";

var defaultState = {
    activeFilters: []
};

function reducer(state = defaultState, action) {
    if(action.type === 'CLEAR_ALL_FILTERS'){
        return Object.assign({}, state, {activeFilters: []})
    }

    if(action.type === 'ADD_FILTER'){
        var filters = state.activeFilters;
        filters.push(action.data);

        return Object.assign({}, state, {activeFilters: filters})
    }

    if(action.type === 'REMOVE_FILTER'){
        var filters = state.activeFilters;
        filters.forEach((filter, index) => {
            if (filter.id === action.data) {
                filters.splice(index, 1);
            }
        });

        return Object.assign({}, state, {activeFilters: filters})
    }
}


var store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export { store }

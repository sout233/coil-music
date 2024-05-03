import { createStore } from "@reduxjs/toolkit";

const initialState = {
    sharedState: ""
};

function reducer(state = initialState, action:any) {
    switch (action.type) {
        case 'UPDATE_SHARED_STATE':
            return { ...state, sharedState: action.payload };
        default:
            return state;
    }
}

const store = createStore(reducer);
export default store;

import * as actionTypes from "constants/index.js"

const initialState = {};

export default function contractItem(state = initialState, action) {
    switch(action.type) {
        case actionTypes.GET_CONTRACT_ITEMINFO:
            return Object.assign({},state, action.result);
            break;
        default:
            return state
    }
}
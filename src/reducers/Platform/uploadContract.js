import * as actionTypes from "constants/index.js"

const initialState = {};

export default function uploadContractInfo(state = initialState,payload) {
    switch (payload.type) {
        case actionTypes.UPLOAD_CONTRACT_INFO:
            return Object.assign({}, state, payload.result);
            break;
        default:
            return state
    }
}
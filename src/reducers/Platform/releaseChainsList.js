import * as actionsTypes from 'constants/index.js'

const initialState = [];
export default function releaseChainsList(state = initialState, action) {
    switch (action.type) {
        case actionsTypes.GET_RELEASE_CHAINS_LIST:
            return [...action.result]
            break;
        case actionsTypes.RELEASE_LIST_SHOW_AND_HIDE:
            return [...action.result]
            break;
        case actionsTypes.SEARCH_RELEASE_CHAINS_LIST:
            return [...action.result]
            break;
        default:
            return state
    }
}
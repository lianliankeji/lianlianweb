import * as actionsTypes from 'constants/index.js'

const initialState = [];
export default function testChainsList(state = initialState, action) {
    switch (action.type) {
        case actionsTypes.GET_TEST_CHAINS_LIST:
            return [...action.result];
            break;
        case actionsTypes.TEST_LIST_SHOW_AND_HIDE:
            return [...action.result];
            break;
        case actionsTypes.SEARCH_TEST_CHAINS_LIST:
            return [...action.result];
            break;
        default:
            return state
    }
}
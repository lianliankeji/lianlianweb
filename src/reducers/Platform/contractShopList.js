import * as actionsTypes from 'constants/index.js'

const initialState = [];
export default function contractShopList(state = initialState, action) {
    switch (action.type) {
        case actionsTypes.GET_CONTRACT_SHOP_LIST:
            return [...action.result];
            break;
        case actionsTypes.CONTRACT_LIST_SHOW_AND_HIDE:
            return [...action.result];
            break;
        case actionsTypes.SHOP_LIST_SELECT:
            return [...action.result];
            break;
        default:
            return state;
    }
}
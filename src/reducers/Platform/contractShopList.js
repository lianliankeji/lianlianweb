import * as actionsTypes from 'constants/index.js'

const initialState = [];
export default function contractShopList(state = initialState, action) {
    switch (action.type) {
        case actionsTypes.GET_CONTRACT_SHOP_LIST:
            return [...action.result]
        case actionsTypes.CONTRACT_LIST_SHOW_AND_HIDE:
            return [...action.result]
        default:
            return state
    }
}
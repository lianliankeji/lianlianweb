import * as actionsTypes from 'constants/index.js'

const initialState = [
    {
        name: '',
        description: '',
        chainid: ""
    },
];
export default function chainsList(state = initialState, action) {
    switch (action.type) {
        case actionsTypes.GET_CHAINS_LIST:
            return [...action.result]
        case actionsTypes.SHOW_CHAINS_TABLE:
            return [...action.result]
        default:
            return state
    }
}
import * as actionsTypes from '../constants/index.js'

const initialState = {
	login: false,
	user: ""
}
export default function userinfo(state = initialState, action) {
	switch (action.type) {
		case actionsTypes.LOGIN:
			return Object.assign({}, state, action.result)
        case actionsTypes.UPDATE:
            return Object.assign({}, state, action.result)
		case actionsTypes.LOGOUT:
			return Object.assign({}, state, action.result)
		default:
			return state
	}
}
import * as actionsTypes from '../constants/userinfo.js'

const initialState = {
	login: false
}
export default function userifno(state = initialState, action) {
	switch (action.type) {
		case actionsTypes.LOGIN:
			return Object.assign({}, state, action.result)
		case actionsTypes.LOGOUT:
			return Object.assign({}, state, action.result)
		default:
			return state
	}
}
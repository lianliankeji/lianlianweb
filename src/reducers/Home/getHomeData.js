import * as actionsTypes from 'constants/index.js'

const initialState = {
	"latestBlock": 0,
	"nodesCnt": 0,
	"txRecords": [],
	"accountCnt": 0,
	"issuedAmt": 0,
	"totalAmt": 0,
	"issueBeg": "",
	"issueEnd": ""
}
export default function homesData(state = initialState, action) {
	switch (action.type) {
		case actionsTypes.GET_HOME_DATA:
			return Object.assign({}, state, action.result)
		default:
			return state
	}
}
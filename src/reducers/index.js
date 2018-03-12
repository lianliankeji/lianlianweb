import {
	combineReducers
} from 'redux'
import userinfo from './userinfo.js'
import homesData from './Home/getHomeData.js'
import chainsList from './Platform/chainsList.js'


export default combineReducers({
	homesData,
    chainsList,
	userinfo
})
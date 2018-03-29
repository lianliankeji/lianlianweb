import {
	combineReducers
} from 'redux'
import userinfo from './userinfo.js'
import homesData from './Home/getHomeData.js'
import chainsList from './Platform/chainsList.js'
import testChainsList from './Platform/testChainsList.js'
import contractShopList from './Platform/contractShopList.js'
import contractItem from './Platform/contractItem.js'


export default combineReducers({
	homesData,
    chainsList,
    testChainsList,
    contractShopList,
	userinfo,
    contractItem
})
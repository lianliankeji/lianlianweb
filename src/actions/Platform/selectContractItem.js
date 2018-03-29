import * as actionTypes from 'constants/index.js'
import axios from 'api/axios.js'
import {timeFormat} from 'utils/date.js'
import { createHashHistory } from 'history'

let BASE_URL = process.env.NODE_ENV == "production" ? "https://loulan.lianlianchains.com/" : ""

//选择的合约信息
export const saveSelectContractIteminfo = (payload) => {

    console.log(payload.data)

    return (dispatch) => {
        dispatch({
            type: actionTypes.GET_CONTRACT_ITEMINFO,
            result: payload.data
        });
        createHashHistory().push('/platform/contract/buy')
    }
}
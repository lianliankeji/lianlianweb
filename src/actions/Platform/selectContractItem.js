import * as actionTypes from 'constants/index.js'
import axios from 'api/axios.js'
import {timeFormat} from 'utils/date.js'
import { createHashHistory } from 'history'
import Config from "config/index.js"

let BASE_URL = Config[process.env.NODE_ENV].baseUrl;

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
import * as actionTypes from 'constants/index.js'
import axios from 'api/axios.js'
import {createHashHistory} from 'history'

let BASE_URL = process.env.NODE_ENV == "production" ? "https://loulan.lianlianchains.com/" : ""

//获取链列表
export const crateOrder = (payload) => {
    return (dispatch) => {
        return axios({
            method: 'post',
            url: BASE_URL + '/loulan/chain/generateOrder' ,
        }, {
            ...payload
        })
    }

}







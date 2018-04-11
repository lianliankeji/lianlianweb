import * as actionTypes from 'constants/index.js'
import axios from 'api/axios.js'
import Config from "config/index.js"

let BASE_URL = Config[process.env.NODE_ENV].baseUrl;

//获取链列表
export const crateOrder = (payload) => {
    return (dispatch) => {
        return axios({
            method: 'post',
            url: BASE_URL + 'loulan/chain/generateOrder' ,
        }, {
            ...payload
        })
    }

}







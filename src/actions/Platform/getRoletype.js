import * as actionTypes from 'constants/index.js'
import axios from 'api/axios.js'
import Config from "config/index.js"

let BASE_URL = Config[process.env.NODE_ENV].baseUrl;

export const getRoletype = (payload) => {
    return (dispatch) => {
        return axios({
            method: 'get',
            url: BASE_URL + 'loulan/user/role',
        }, {
            ...payload
        })

    }
};
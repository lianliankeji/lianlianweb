import * as actionTypes from 'constants/index.js'
import axios from 'api/axios.js'
import {timeFormat} from 'utils/date.js'
import Config from "config/index.js"

let BASE_URL = Config[process.env.NODE_ENV].baseUrl;

export const perform = (payload) => {
    return (dispatch) => {
        return axios({
            method: 'post',
            type: "json",
            url: BASE_URL + payload.url,
        }, {
            ...payload.data
        })
    }
}

export const query = (payload) => {
    return (dispatch) => {
        return axios({
            method: 'post',
            type: "json",
            url: BASE_URL + payload.url,
        }, {
            ...payload.data
        })
    }
}
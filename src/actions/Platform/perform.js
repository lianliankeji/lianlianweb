import * as actionTypes from 'constants/index.js'
import axios from 'api/axios.js'
import {timeFormat} from 'utils/date.js'
// import axios from 'axios'

let BASE_URL = process.env.NODE_ENV == "production" ? "https://loulan.lianlianchains.com/" : ""

export const perform = (payload) => {
    return (dispatch) => {
        return axios({
            method: 'post',
            url: BASE_URL + payload.url,
        }, {
            ...payload.data
        })
    }
}

export const query = (payload) => {
    return (dispatch) => {
        return axios({
            method: 'get',
            url: BASE_URL + payload.url,
        }, {
            ...payload.data
        })
    }
}
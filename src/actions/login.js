import * as actionTypes from 'constants/index.js'
import axios from 'api/axios.js'
import Config from "config/index.js"

let BASE_URL = Config[process.env.NODE_ENV].baseUrl;

var timers = (dispatch) => {
    var timer = setInterval(() => {
        axios({
            method: 'get',
            url: 'https://store.lianlianchains.com/kd/query?func=getInfoForWeb&ccId=&usr=centerBank&acc=centerBank',
        }, {
            /*firstName: 'Fred',
             lastName: 'Flintstone'*/
        }).then(function(response) {
            dispatch({
                type: actionTypes.GET_HOME_DATA,
                result: response.data.result
            })

            clearInterval(timers)
        }).catch(function(error) {
            console.log(error);
            clearInterval(timers)
        });
    }, 5000);
}



export const getQRCode = (data) => {

    return (dispatch) => {
        return axios({
            method: 'get',
            url: BASE_URL + 'loulan/generatelogin',
        }, {
            /*firstName: 'Fred',
             lastName: 'Flintstone'*/
        })

    }
}
import * as actionTypes from 'constants/index.js'
import axios from 'api/axios.js'
// import axios from 'axios'

let BASE_URL = process.env.NODE_ENV == "production" ? "https://loulan.lianlianchains.com/" : ""

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
        }).then((response) => {
           console.log(response);
           if(response.data.ec == "000000") {
               return axios({
                   method: 'get',
                   url: BASE_URL + '/loulan/getTwoBarCodes',
               }, {
                   uuid: response.data.data,
                   width: 400
               })
           }

        })
            .catch((error) => {
                console.log(error);
            });

    }
}
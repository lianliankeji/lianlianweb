import * as actionTypes from 'constants/index.js'
import axios from 'api/axios.js'
import {createHashHistory} from 'history'

let BASE_URL = process.env.NODE_ENV == "production" ? "https://loulan.lianlianchains.com/" : ""

//获取链列表
export const contractSave = (payload) => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: BASE_URL + '/loulan/chain/savecontract' ,
        }, {
            ...payload
        }).then((response) => {
            if(response.data.ec == "000000") {
                dispatch({
                    type: actionTypes.UPLOAD_CONTRACT_INFO,
                    result: response.data.data
                });
                createHashHistory().push("/platform/contract/verify")
            }
            console.log(response)
        })
            .catch((error) => {
                console.log(error);
            });
    }

}






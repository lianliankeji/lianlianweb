import * as actionTypes from 'constants/index.js'
import axios from 'api/axios.js'
import {timeFormat} from 'utils/date.js'
// import axios from 'axios'

let BASE_URL = process.env.NODE_ENV == "production" ? "https://loulan.lianlianchains.com/" : ""

//获取链列表
export const getChainsData = (payload) => {

    return (dispatch) => {
        axios({
            method: 'get',
            url: BASE_URL + 'loulan/chain/queryall',
        }, {
            /*firstName: 'Fred',
             lastName: 'Flintstone'*/
        }).then((response) => {
            let data = response.data.data;
            if(response.data.ec == "000000") {
                let array = data.map((item, index) => {
                    return Object.assign({}, item, { display : "none", data: []})
                })
                dispatch({
                    type: actionTypes.GET_CHAINS_LIST,
                    result: array
                })
            }
        })
            .catch((error) => {
                console.log(error);
            });

    }
}

//获取该链表格数据
export const getChainsTable = () => {
    let data = [];


}

//是否显示隐藏该链表格
export const showChainsTable = (payload) => {
    return (dispatch, getState) => {

        let chainsListData = payload.data;

        chainsListData.map((item, index) =>{
            if(index == payload.id) {
                axios({
                    method: 'get',
                    url: BASE_URL + '/llchain/getsometransonce',
                }, {
                    /*firstName: 'Fred',
                     lastName: 'Flintstone'*/
                }).then((response) => {
                    let data = response.data.result;
                    if(response.data.code == "0") {
                        item.data = data;
                        item.data.map((v,i) => {
                            v.seconds = timeFormat(v.seconds);
                            v.key = i;
                        })
                        dispatch({
                            type: actionTypes.SHOW_CHAINS_TABLE,
                            result: chainsListData
                        })

                    }
                })
                    .catch((error) => {
                        console.log(error);
                    });

            }
        })



    }
}
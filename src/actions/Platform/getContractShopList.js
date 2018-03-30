import * as actionTypes from 'constants/index.js'
import axios from 'api/axios.js'
// import axios from 'axios'

let BASE_URL = process.env.NODE_ENV == "production" ? "https://loulan.lianlianchains.com/" : ""

//获取链列表
export const getContractShopList = (payload) => {
    return (dispatch) => {
        axios({
            method: 'get',
            url: BASE_URL + '/loulan/chain/queryallcontract',
        }, {

        }).then((response) => {
            console.log(response);
            let array = response.data.data;
            let result = array.map((item, index) => {
                return Object.assign({}, item, {showAll: false})
            });

            dispatch({
                type: actionTypes.GET_CONTRACT_SHOP_LIST,
                result: result
            });
            // let data = response.data.result;
            // if(response.data.code == "0") {
            //     item.data = data;
            //     item.data.map((v,i) => {
            //         v.seconds = timeFormat(v.seconds);
            //         v.key = i;
            //     })
            //     dispatch({
            //         type: actionTypes.SHOW_CHAINS_TABLE,
            //         result: chainsListData
            //     })
            //
            // }
        })
            .catch((error) => {
                console.log(error);
            });
    }

}

export const showAndHide = (payload) => {
    return(dispatch, getState) => {
        let data = getState().contractShopList;

        data = data.map((item, i) => {
            if(i == payload.index) {
                item.showAll = payload.types
            }

            return item;
        })

        dispatch({
            type: actionTypes.CONTRACT_LIST_SHOW_AND_HIDE,
            result: data
        })
    }
}




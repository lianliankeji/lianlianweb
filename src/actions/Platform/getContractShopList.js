import * as actionTypes from 'constants/index.js'
import axios from 'api/axios.js'
import Config from "config/index.js"

let BASE_URL = Config[process.env.NODE_ENV].baseUrl;

//获取链列表
export const getContractShopList = (payload) => {
    return (dispatch) => {
        axios({
            method: 'get',
            url: BASE_URL + 'loulan/chain/queryallcontract',
        }, {

        }).then((response) => {
            console.log(response);
            let array = response.data.data;
            let result = array.map((item, index) => {
                return Object.assign({}, item, {showAll: false, active: false})
            }).filter((elem, i) =>{
                return elem.testflag == 3;
            });

            dispatch({
                type: actionTypes.GET_CONTRACT_SHOP_LIST,
                result: result
            });
        })
            .catch((error) => {
                console.log(error);
            });
    }

};

export const selectContract = (payload) => {
    return(dispatch, getState) => {
        let data = getState().contractShopList;

        data = data.map((item, i) => {
            if(item.active == true) {
                item.active = false
            }
            if(i == payload.index) {
                item.active = true
            }

            return item;
        })

        dispatch({
            type: actionTypes.SHOP_LIST_SELECT,
            result: data
        })
    }
};

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




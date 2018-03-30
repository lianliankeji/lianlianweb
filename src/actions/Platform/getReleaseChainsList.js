import * as actionTypes from 'constants/index.js'
import axios from 'api/axios.js'

let BASE_URL = process.env.NODE_ENV == "production" ? "https://loulan.lianlianchains.com/" : ""

//获取链列表
export const getReleaseChainsList = (payload) => {
    return (dispatch) => {
        axios({
            method: 'get',
            url: BASE_URL + '/loulan/chain/querycontractpass',
        }, {
            chainid: payload.chainid
        }).then((response) => {
            let data = response.data.data;
            if(response.data.ec == "000000") {
                let array = data.map((item, index) => {
                    return Object.assign({}, item, { showAll : false})
                })
                dispatch({
                    type: actionTypes.GET_RELEASE_CHAINS_LIST,
                    result: array
                });
            }
        })
            .catch((error) => {
                console.log(error);
            });

    }
}

//
export const seachReleaseChains = (payload) => {
    return (dispatch) => {
        axios({
            method: 'get',
            url: BASE_URL + '/loulan/chain/querycontractbyname',
        }, {
            name: payload.name,
            chainid: payload.chainid
        }).then((response) => {
            let data = response.data.data;
            if(response.data.ec == "000000") {
                let array = data.map((item, index) => {
                    return Object.assign({}, item, { showAll : false})
                })
                dispatch({
                    type: actionTypes.SEARCH_RELEASE_CHAINS_LIST,
                    result: array
                });
            }
        })
            .catch((error) => {
                console.log(error);
            });

    }
}

export const showAndHide = (payload) => {
    return(dispatch, getState) => {
        let data = getState().releaseChainsList;
        console.log(getState().testChainsList)

        data = data.map((item, i) => {
            if(i == payload.index) {
                item.showAll = payload.types
            }

            return item;
        })

        dispatch({
            type: actionTypes.RELEASE_LIST_SHOW_AND_HIDE,
            result: data
        })
    }
}



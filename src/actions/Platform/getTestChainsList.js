import * as actionTypes from 'constants/index.js'
import axios from 'api/axios.js'
import Config from "config/index.js"

let BASE_URL = Config[process.env.NODE_ENV].baseUrl;

//获取链列表
export const getTestChainsList = (payload) => {
    return (dispatch) => {
        axios({
            method: 'get',
            url: BASE_URL + 'loulan/chain/querycontractnopass',
        }, {
            chainid: payload.chainid
        }).then((response) => {
            let data = response.data.data;
            if(response.data.ec == "000000") {
                let array = data.map((item, index) => {
                    return Object.assign({}, item, { showAll : false, active: false})
                })
                dispatch({
                    type: actionTypes.GET_TEST_CHAINS_LIST,
                    result: array
                });
            }
        })
            .catch((error) => {
                console.log(error);
            });

    }
}

export const seachTestChains = (payload) => {
    return (dispatch) => {
        axios({
            method: 'get',
            url: BASE_URL + 'loulan/chain/querycontractbynameflag',
        }, {
            name: payload.name,
            chainid: payload.chainid,
            testflag: 0,
        }).then((response) => {
            let data = response.data.data;
            if(response.data.ec == "000000") {
                let array = data.map((item, index) => {
                    return Object.assign({}, item, { showAll : false})
                })
                dispatch({
                    type: actionTypes.SEARCH_TEST_CHAINS_LIST,
                    result: array
                });
            }
        })
            .catch((error) => {
                console.log(error);
            });

    }
}

export const selectContract = (payload) => {
    return(dispatch, getState) => {
        let data = getState().testChainsList.testChainsList;

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
            type: actionTypes.TEST_LIST_SELECT,
            result: data
        })
    }
};


export const showAndHide = (payload) => {
    return(dispatch, getState) => {
        let data = getState().testChainsList.testChainsList;

        data = data.map((item, i) => {
            if(i == payload.index) {
                item.showAll = payload.types
            }

            return item;
        })

        dispatch({
            type: actionTypes.TEST_LIST_SHOW_AND_HIDE,
            result: data
        })
    }
}

export const updateFlag = (payload) => {
    return(dispatch) => {
        return axios({
            method: 'post',
            url: BASE_URL + 'loulan/chain/updateFlag',
        }, {
            ...payload
        }).then((response) => {

        })
            .catch((error) => {
                console.log(error);
            });
    }
}




import * as actionTypes from 'constants/index.js'
import axios from 'api/axios.js'
// import axios from 'axios'

let BASE_URL = process.env.NODE_ENV == "production" ? "https://loulan.lianlianchains.com/" : ""

//获取链列表
export const getContractShopList = (payload) => {
    let array = [
        {
            title: "分润",
            description: "智能合约的管理，如合约查看、上传、修改、升级智能合约的管理，如合约查看、上传、修改、升级智能合约的管理，如合约查看、上传、修改、升级",
            showAll: false
        },
        {
            title: "分润",
            description: "智能合约的管理，如合约查看、上传、修改、升级智能合约的管理，如合约查看、上传、修改、升级智能合约的管理，如合约查看、上传、修改、升级",
            showAll: false
        },
        {
            title: "分润",
            description: "智能合约的管理，如合约查看、上传、修改、升级智能合约的管理，如合约查看、上传、修改、升级智能合约的管理，如合约查看、上传、修改、升级",
            showAll: false
        },
        {
            description: "智能合约的管理，如合约查看、上传、修改、升级智能合约的管理，如合约查看、上传、修改、升级智能合约的管理，如合约查看、上传、修改、升级",
            showAll: false
        },
        {
            title: "分润",
            description: "智能合约的管理，如合约查看、上传、修改、升级智能合约的管理，如合约查看、上传、修改、升级智能合约的管理，如合约查看、上传、修改、升级",
            showAll: false
        }
    ];

    return (dispatch) => {
        dispatch({
            type: actionTypes.GET_CONTRACT_SHOP_LIST,
            result: array
        });
    }



    // return (dispatch) => {
    //     axios({
    //         method: 'get',
    //         url: BASE_URL + 'loulan/chain/queryall',
    //     }, {
    //         /*firstName: 'Fred',
    //          lastName: 'Flintstone'*/
    //     }).then((response) => {
    //         let data = response.data.data;
    //         if(response.data.ec == "000000") {
    //             let array = data.map((item, index) => {
    //                 return Object.assign({}, item, { display : "none", data: []})
    //             })
    //             dispatch({
    //                 type: actionTypes.GET_TEST_CHAINS_LIST,
    //                 result: array
    //             })
    //         }
    //     })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    //
    // }
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




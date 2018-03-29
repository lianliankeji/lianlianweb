import * as actionTypes from 'constants/index.js'
import axios from 'api/axios.js'
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
    let data = [{
               node:1,
               txid: 2,
               txInfo:3,
               block:4,
               seconds:"1nian"
          }, {
             node:1,
             txid: 2,
             txInfo:3,
             block:4,
             seconds:"1nian"
          },{
              node:1,
              txid: 2,
              txInfo:3,
              block:4,
              seconds:"1nian"
          },]

          data.map((item, index) => {
              return item.key = JSON.stringify(index);
           });

          return data
}

//是否显示隐藏该链表格
export const showChainsTable = (payload) => {
    return (dispatch, getState) => {

        let chainsListData = payload.data;

        chainsListData.map((item, index) =>{
            if(index == payload.id) {
                item.data = [...getChainsTable()]
            }
        })
        dispatch({
            type: actionTypes.SHOW_CHAINS_TABLE,
            result: chainsListData
        })
    }
}
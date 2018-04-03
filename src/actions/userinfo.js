import * as actionTypes from '../constants/index.js'
import { message } from 'antd';
import {cookieUtil} from "utils/cookie.js"
import axios from '../api/axios.js'
import apiRoot from "../api/apiJson.js"
let BASE_URL = process.env.NODE_ENV == "production" ? apiRoot["release"].baseUrl : ""
let Path = process.env.NODE_ENV == "production" ? apiRoot.release.Route : apiRoot["dev"].Route
// import axios from 'axios'



export function login(payload) {
	return function(dispatch) {
		axios({
				method: 'post',
				url: BASE_URL + Path.Login.path,
			}, {
			...payload
			}).then(function(response) {
				console.log(response);
				if(response.data.ec == "000000") {
                    // message.success('登录成功');
                    setTimeout(() => {
                        location.replace("/#/platform")
					},1500)
                    cookieUtil.setItem("user",payload.phoneno,1)
                    dispatch({
                        type: actionTypes.LOGIN,
                        result: {
                            login: true,
                        	user: payload.phoneno
						}
                    })
				}
			})
			.catch(function(error) {
				console.log(error);
			});

	}
}

export function update(payload) {
    return function(dispatch) {
        axios({
            method: 'post',
            url: BASE_URL + Path.Update.path,
        }, {
            ...payload
        }).then(function(response) {
            message.success('密码重置成功');
            setTimeout(() => {
                location.replace("/#/platform")
            },1500)
            cookieUtil.setItem("user",payload.phoneno,1)
            dispatch({
                type: actionTypes.UPDATE,
                result: {
                	login: true,
                    user: payload.phoneno
                }
            })
        })
            .catch(function(error) {
                console.log(error);
            });

    }
}

export function sendMsg(data) {
    return function(dispatch) {
        return axios({
            method: 'post',
            url: BASE_URL + Path.SendMsg.path,
        }, {
			mobile: data.mobile
        })
    }
}

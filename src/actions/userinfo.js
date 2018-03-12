import * as actionTypes from '../constants/userinfo.js'
import axios from '../api/axios.js'
// import axios from 'axios'



export function login(data) {
	return function(dispatch) {
		axios({
				method: 'get',
				url: 'https://store.lianlianchains.com/kd/query?func=getInfoForWeb&ccId=&usr=centerBank&acc=centerBank',
			}, {
			/*firstName: 'Fred',
			lastName: 'Flintstone'*/
			}).then(function(response) {
				console.log(response);
				setTimeout(() => {
					dispatch({
						type: actionTypes.LOGIN,
						result: data
					})
				}, 2000)
			})
			.catch(function(error) {
				console.log(error);
			});

	}
}

export function logout(data) {
	return function(dispatch) {
		axios({
				method: 'post',
				url: 'http://127.0.0.1:5000/exchange/exchange/save',
				data: {
					firstName: 'Fred',
					lastName: 'Flintstone'
				}
			}).then(function(response) {
				console.log(response);
				setTimeout(() => {
					dispatch({
						type: actionTypes.LOGIN,
						result: data
					})
				}, 500)
			})
			.catch(function(error) {
				console.log(error);
			});

	}
}
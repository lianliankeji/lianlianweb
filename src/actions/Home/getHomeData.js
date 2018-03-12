import * as actionTypes from 'constants/index.js'
import axios from 'api/axios.js'
// import axios from 'axios'

var timers = (dispatch) => {
	var timer = setInterval(() => {
		axios({
			method: 'get',
			url: 'https://store.lianlianchains.com/kd/query?func=getInfoForWeb&ccId=&usr=centerBank&acc=centerBank',
		}, {
			/*firstName: 'Fred',
			lastName: 'Flintstone'*/
		}).then(function(response) {
			dispatch({
				type: actionTypes.GET_HOME_DATA,
				result: response.data.result
			})

			clearInterval(timers)
		}).catch(function(error) {
			console.log(error);
			clearInterval(timers)
		});
	}, 5000);
}



export const getHomesData = (data) => {

	return (dispatch) => {
		timers(dispatch);
		axios({
				method: 'get',
				url: 'https://store.lianlianchains.com/kd/query?func=getInfoForWeb&ccId=&usr=centerBank&acc=centerBank',
			}, {
				/*firstName: 'Fred',
				lastName: 'Flintstone'*/
			}).then((response) => {
				dispatch({
					type: actionTypes.GET_HOME_DATA,
					result: response.data.result
				})

			})
			.catch((error) => {
				console.log(error);
			});

	}
}
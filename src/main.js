import React from 'react';
import ReactDOM from 'react-dom';
import {
	Provider
} from 'react-redux';
import configureStore from './store'
import RouteMap from './router'

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
    	<RouteMap />
  	</Provider>,
	document.getElementById('root')
);
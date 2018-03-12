import {
	createStore,
	applyMiddleware,
	compose
} from 'redux'
import thunk from 'redux-thunk'
import rootReducers from '../reducers'



export default function configureStore() {

	const win = window;

	const storeEnhancers = compose(
		applyMiddleware(thunk),
		(win && win.devToolsExtension) ? win.devToolsExtension() : f => f
	);

	const store = createStore(rootReducers, storeEnhancers);

	return store
}
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Home from 'containers/Home/index.js'

import 'common/css/reset.css'

export default class NotFound extends React.Component {
	constructor(props) {
		super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {};
	}

	render() {
		return (
			<div>
                网页走丢了！
            </div>
		)
	}
}
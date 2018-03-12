import React, {
	Component
} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'

import {
	Anchor,
	Row,
	Col,
	Progress
} from 'antd';
const {
	Link
} = Anchor;

import './style.scss';


import Headerlogo from 'images/mobile/headerlogo.png';
import Logo from 'images/logo.png';

let screenH = window.screen.height;

class Header extends Component {
	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
		this.state = {
			headerNav: [{
				name: "首页"
			}, {
				name: "申请入驻"
			}, {
				name: "联系我们"
			}],

		}
	}

	toggleLogin = () => {
		this.props.logFn();
	}

	render() {
		return (
			<header className="header-mobile" style={{height: screenH}}>
				<div className="content">
					<img className="headerlogo" src={Headerlogo} />
					<p className="slogan">统一零售贸易平台与价值交换网络</p>
					<div className="button"><a href="/static/URT-Whitepaper.pdf">白皮书</a></div>
				</div>
            </header>

		)
	}
}

export default Header;
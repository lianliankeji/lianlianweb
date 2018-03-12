import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {
	connect
} from 'react-redux'
import {
	bindActionCreators
} from 'redux'
import {
	timeFormat
} from 'utils/date.js'
import {
	getHomesData
} from 'actions/Home/getHomeData.js'

import {
	Row,
	Col,
	Progress
} from 'antd';

//轮播图
// import ReactSwipe from 'react-swipe';
import SwipeableViews from 'react-swipeable-views';
import {
	autoPlay
} from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

import './style.scss'

import Loading from "components/Loading/index.js"
import Tables from 'components/Home/Tables/index.js'
import Footer from 'components/Home/FooterMobile/index.js'

import OpenLogo from 'images/mobile/open.png';
import SafeLogo from 'images/mobile/safe.png';
import EcologyLogo from 'images/mobile/ecology.png';
import Assetslogo from 'images/mobile/assetslogo.png';
import Block from 'images/mobile/block.png';
import Nodes from 'images/mobile/nodes.png';



//移动端
import HeaderMobile from 'components/Home/HeaderMobile/index.js'

class HomeMobile extends React.Component {
	constructor(props) {
		super(props);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			allianceList: [{
				img: OpenLogo,
				charac: "开放",
				descList: ["智能合约定制化", "联盟链共识节点可灵活扩展接入", "成熟的BAAS平台快速区块链赋能"]
			}, {
				img: SafeLogo,
				charac: "安全",
				descList: ["手机二次验证", "ECDSA数字证书", "决策委员会多重签名"]
			}, {
				img: EcologyLogo,
				charac: "生态",
				descList: ["零售行业互链互通", "零售供应链金融数字贸易"]
			}],
			th: ["时 间", "节 点", "交 易", "区 块", "信 息"]
		};
	}

	login = () => {
		let loginState = this.props.userinfo.login;


		if (loginState) {
			this.props.userinfoActions.logout({
				login: false
			})
		} else {
			this.props.userinfoActions.login({
				login: true
			})
		}
	}

	getTableColumns = () => {
		const columns = [{
			title: '节点',
			dataIndex: 'node',
			key: 'node'
		}, {
			title: '交易',
			dataIndex: 'txid',
			key: 'txid',
		}, {
			title: '交易信息',
			dataIndex: 'txInfo',
			key: 'txInfo',
			render: (text, row, index) => {

				return (
					<Popover placement="top" title={"交易信息"} content={text} trigger="hover">
						<span>{text.substr(0, 50)}</span>
					</Popover>
				);
			},
		}, {
			title: '区块',
			dataIndex: 'block',
			key: 'block',
		}, {
			title: '时间',
			dataIndex: 'seconds',
			key: 'seconds',
			render: (text, row, index) => {
				return timeFormat(text);
			}
		}];

		return columns;

	}

	getTableData = () => {
		const data = this.props.homesData.txRecords;


		data.map((item, index) => {
			return item.key = JSON.stringify(index);
		})


		return data;

	}

	componentWillMount() {
		this.props.getHomesData();
		// var oRoot = document.getElementById('root');
		// var socket = io.connect("https://store.lianlianchains.com");
		// socket.on("chainDataUpdt", function(data) {
		//     console.log(data);
		//     // oRoot.innerText = data.hello;
		//     // socket.emit("client", {my: "data"})
		// });
	}

	componentDidMount() {

	}

	render() {

		const percent = Number((this.props.homesData.issuedAmt / this.props.homesData.totalAmt) * 100).toFixed(0) + "%";

		const nowURTStyle = {
			marginLeft: percent
		}

		const swipeOptions = {
			auto: 3000,
			callback: function(index, elem) {},
			transitionEnd: function(index, elem) {}
		};

		return (
			<div>
				<HeaderMobile />
				<section className="alliance-chain-mobile">
					<header className="title">国内首条新零售业务联盟链</header>
					<Row type="flex" justify="center">
						<Col span={24}>
							<ul className="info">
								{
									this.state.allianceList.map((item, index) => {
										return (

											<li key={index} className="info-item">
												<img className="alliance-chain-img" src={item.img} alt={item.charac} />
												<div className="right">
													<div className="info-item-charac">{item.charac}</div>
													<div className="info-item-line"></div>
													<ul className="desc">
														{
															item.descList.map((elem, i) => {
																return (
																	<li key={i}>{elem}</li>
																)
															})
														}
													</ul>
												</div>

											</li>

										)
									})
								}
							</ul>
						</Col>
					</Row>
				</section>
				<section id="assets" className="assets-info-mobile">
					<Row type="flex" justify="center">
						<Col className="assetslogo" span={12}>
							<img className="pulse" src={Assetslogo} />
						</Col>
						<Col className="assets-info" span={12}>
							<div className="assets-info-top">
								<h1 className="title">联盟链</h1>
								{/*<div className="during">{`${this.props.homesData.issueBeg} ~ ${this.props.homesData.issueEnd}`}</div>*/}
							</div>
						</Col>
					</Row>
					{/*<Progress className="progress" percent={Number((this.props.homesData.circulateAmt / this.props.homesData.totalAmt) * 100).toFixed(0) - 0} status="active" />
					<div className="URT">
						<span>{this.props.homesData.circulateAmt} URT</span>
						<span>{this.props.homesData.totalAmt} URT</span>
					</div>*/}
					<div className="line"></div>
					<div className="assets-data">
						<div className="assets-data-item">
							<img className="img" src={Block} />
							<div>
								<h3 className="title">最新区块</h3>
								<div className="data">#{this.props.homesData.latestBlock}</div>
							</div>
						</div>
						<div className="assets-data-item">
							<img className="img" src={Nodes} />
							<div>
								<h3 className="title">节点数</h3>
								<div className="data">{`${this.props.homesData.nodesCnt} / ${this.props.homesData.accountCnt}`}</div>
							</div>
						</div>
					</div>
				</section>
				<section className="tables-mobile">
					<Row className="tables-content" type="flex" align="start" justify="center">
						<Col span={5}>
							<ul className="tables-head">
								{
									this.state.th.map((item, index) => {
										return <li key={index}>{item}</li>
									})
								}

							</ul>
						</Col>
						<Col span={19} className="tables-body-content">
							<AutoPlaySwipeableViews className="mySwipe" interval={5000}>
								{this.getTableData().map((item, index) => {
									return (
										<ul key={index} className="tables-body">
											<li className="oHide">{timeFormat(item.seconds)}</li>
											<li className="oHide">{item.node}</li>
											<li className="oHide">{item.txid}</li>
											<li className="oHide">{item.block}</li>
											<li className="oHide">{item.txInfo}</li>
										</ul>
									)
								})}
							</AutoPlaySwipeableViews>
						</Col>
					</Row>
				</section>
				<Footer />
				{/* <Loading /> */}
			</div>

		)
	}
}

function mapStateToProps(state) {
	return {
		homesData: state.homesData
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getHomesData: bindActionCreators(getHomesData, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HomeMobile)
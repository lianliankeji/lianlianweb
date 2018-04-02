import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {timeFormat} from 'utils/date.js'
import { getQRCode } from 'actions/login.js'
import {IWebSocket} from "utils/socket.js"

import {
    BackTop,
    Popover,
    Row,
    Col,
    Progress
} from 'antd';
import './style.scss'


import Header from './subpage/Header/index.js'
import Content from './subpage/Content/';
import Loading from "components/Loading/index.js"
import Tables from 'components/Home/Tables/index.js'
import Footer from 'components/Platform/Footer/index.js'

import OpenLogo from 'images/open.png';
import SafeLogo from 'images/safe.png';
import EcologyLogo from 'images/ecology.png';
import Assetslogo from 'images/assetslogo.png';
import Block from 'images/block.png';
import Nodes from 'images/nodes.png';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            qrcode: ""
        };
    }

    // login = (data) => {
    //     this.props.login(data)
    // }
    //
    // sendMsg = (data) => {
    //     this.props.sendMsg(data).then((res) => {
    //         console.log(res.data.code)
    //     }).catch((err) => {
    //         console.log(err)
    //     })
    // }

    _getQRCode() {
        this.props.getQRCode().then((response) => {
            console.log(response);
            this.setState({
                qrcode: response.data
            })

        })
            .catch((error) => {
                console.log(error);
            });
    }

    componentWillMount() {

    }

    componentDidMount() {
        this._getQRCode();
        var system = IWebSocket({
            uri:"store.lianlianchains.com/websocket"
            // 可以自定义四大事件
            ,onOpen: function(event) {
                console.log("阅读时长统计WebSocket开启！");
                // websockets.countReadTimes.timeout=setTimeout("plusReadTimes()", 60000);
            }
            ,onClose: function(event){
                console.log("阅读时长统计WebSocket关闭！");
                // if ("undefined"!=typeof websockets.countReadTimes.timeout) clearTimeout(websockets.countReadTimes.timeout);
            },onMessage: function(event) {
                console.log(event.toString())
            }
        });
    }

    render() {

        const percent = Number((this.props.homesData.issuedAmt / this.props.homesData.totalAmt) * 100).toFixed(0) + "%";

        const nowURTStyle = {
            marginLeft: percent
        }

        return (
            <div>
                <Header />
                <Content
                    qrcode={this.state.qrcode}
                />
                <Footer />
                <BackTop>
                    <div className="ant-back-top-inner">UP</div>
                </BackTop>
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
        // login: bindActionCreators(login, dispatch),
        // sendMsg: bindActionCreators(sendMsg, dispatch),
        getQRCode: bindActionCreators(getQRCode, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)
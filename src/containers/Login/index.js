import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {timeFormat} from 'utils/date.js'
import {getQRCode} from 'actions/login.js'
import {IWebSocket} from "utils/socket.js"
import {cookieUtil} from "utils/cookie.js"

import {BackTop} from 'antd';
import './style.scss'


import Header from './subpage/Header/index.js'
import Content from './subpage/Content/';

import Footer from 'components/Platform/Footer/index.js'

import Test from 'images/test.png';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            qrcode: "",
            loading: false
        };
    }


    _getQRCode() {
        this.props.getQRCode().then((response) => {
            console.log(response);
            if (response.data.ec == "000000") {

                this.setState({
                    qrcode: "https://loulan.lianlianchains.com/loulan/getTwoBarCodes?uuid=" + response.data.data + "&width=200",
                })
            }

        })
            .catch((error) => {
                console.log(error);
            });
    }

    componentWillMount() {

    }

    componentDidMount() {
        this._getQRCode()
        var system = IWebSocket({
            uri: "store.lianlianchains.com/websocket"
            // 可以自定义四大事件
            , onOpen: (event) => {
                console.log("WebSocket开启！");
                // websockets.countReadTimes.timeout=setTimeout("plusReadTimes()", 60000);
            }
            , onClose: (event) => {
                console.log("WebSocket关闭！");
                // if ("undefined"!=typeof websockets.countReadTimes.timeout) clearTimeout(websockets.countReadTimes.timeout);
            }, onMessage: (event) => {
                var data = JSON.parse(event.data);
                if (data.types == "0") {
                    system.onSend(JSON.stringify({types: "1", data: data.data }))
                    this.setState({
                        loading: true
                    });
                } else if (data.types == "2") {
                    cookieUtil.setItem("user", data.data, 1);
                    let timer = setTimeout(() => {
                        this.setState({
                            loading: false
                        });
                        // message.success('登录成功');
                        location.replace("/#/platform")
                        clearTimeout(timer)
                    }, 1500)
                }

            }
        });

        // console.log(system)
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
                    loading={this.state.loading}
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
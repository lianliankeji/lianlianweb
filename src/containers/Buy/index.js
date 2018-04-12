import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {timeFormat} from 'utils/date.js'
import {crateOrder} from 'actions/Platform/createOrder.js'
import {cookieUtil} from "utils/cookie.js"
import {IWebSocket} from "utils/socket.js"
import {createHashHistory} from "history"

import {BackTop} from 'antd';
import './style.scss'

import Header from 'components/Platform/Header/index.js'
import Footer from 'components/Platform/Footer/index.js'
import Content from './subpage/Content/';


class Buy extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            orderInfo: "",
            qrcode: "",
            loading: false
        };
    }

    startSocket = () => {
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
                    system.onSend(JSON.stringify({types: "1", data: data.data + ""}))
                    this.setState({
                        loading: true
                    });
                } else if (data.types == "2") {
                    let timer = setTimeout(() => {
                        this.setState({
                            loading: false
                        });
                        createHashHistory().push("/platform/contract/buysuccess")
                        clearTimeout(timer)
                    }, 1500)
                }

            }
        });
    }

    componentWillMount() {
        if(!cookieUtil.hasItem("user")){
            createHashHistory().push("/platform/login");
        }
    }

    componentDidMount() {
        let orderInfo = JSON.parse(localStorage.getItem("orderInfo"));
        this.startSocket();
        this.props.crateOrder({
            fee:orderInfo.price,
            description:orderInfo.description,
            openid: cookieUtil.getItem("user"),
            publisher:cookieUtil.publisher
        }).then((response) => {

            console.log(response.data.data.orderNo);
            this.setState({
                qrcode: "/loulan/OrderTwoBar?orderNo="+response.data.data.orderNo + "&width=200"
            })

        })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {

        let orderInfo = JSON.parse(localStorage.getItem("orderInfo"));

        return (
            <div>
                <Header />
                <Content
                    orderInfo={orderInfo}
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

    }
}

function mapDispatchToProps(dispatch) {
    return {
        crateOrder: bindActionCreators(crateOrder, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Buy)
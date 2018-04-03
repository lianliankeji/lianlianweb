import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {timeFormat} from 'utils/date.js'
import {crateOrder} from 'actions/Platform/createOrder.js'
import {cookieUtil} from "utils/cookie.js"

import {
    Button,
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

class Buy extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            orderInfo: ""
        };
    }

    componentDidMount() {
        let orderInfo = JSON.parse(localStorage.getItem("orderInfo"));
        this.props.crateOrder({
            fee:orderInfo.price,
            description:orderInfo.description,
            openid: cookieUtil.getItem("user"),
            publisher:cookieUtil.publisher
        }).then((response) => {

            console.log(response.data.data.orderNo);
            this.setState({
                qrcode: "https://loulan.lianlianchains.com/loulan/OrderTwoBar?orderNo="+response.data.data.orderNo + "&width=200"
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
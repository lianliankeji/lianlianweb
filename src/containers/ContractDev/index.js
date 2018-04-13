import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {withRouter} from "react-router-dom"
import {timeFormat} from 'utils/date.js'
import {getContractShopList, showAndHide} from 'actions/Platform/getContractShopList.js'
import {cookieUtil} from "utils/cookie.js"

import {BackTop} from 'antd';
import './style.scss'

import Header from 'components/Platform/Header/index.js'
import Content from './subpage/Content/';
import Footer from 'components/Platform/Footer/index.js'

class ContractDev extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {

        };
    }

    componentWillMount() {
        if(!cookieUtil.hasItem("user")){
            createHashHistory().push("/platform/login");
        }
    }

    componentDidMount() {
        console.log(this.props)
    }

    render() {


        return (
            <div>
                <Header />
                <Content />
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

    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(ContractDev))
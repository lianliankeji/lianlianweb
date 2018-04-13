import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {timeFormat} from 'utils/date.js'
import {getHomesData} from 'actions/Home/getHomeData.js'
import {cookieUtil} from "utils/cookie.js"
import {createHashHistory} from "history"
import Footer from 'components/Platform/Footer/index.js'

import {BackTop} from 'antd';
import './style.scss'

import Header from 'components/Platform/Header/index.js'
import Content from './subpage/Content/';


class Platform extends React.Component {
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

    }

    render() {

        const percent = Number((this.props.homesData.issuedAmt / this.props.homesData.totalAmt) * 100).toFixed(0) + "%";

        const nowURTStyle = {
            marginLeft: percent
        }

        return (
            <div>
                <Header page="Platform"/>
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
)(Platform)
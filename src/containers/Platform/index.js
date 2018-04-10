import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {timeFormat} from 'utils/date.js'
import {getHomesData} from 'actions/Home/getHomeData.js'
import {cookieUtil} from "utils/cookie.js"
import {createHashHistory} from "history"

import {BackTop} from 'antd';
import './style.scss'

import Header from './subpage/Header/index.js'
import Content from './subpage/Content/';
import Footer from 'components/Platform/Footer/index.js'


class Platform extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            a: 1
        };
    }

    timeout(ms) {
        console.log(111)
        return new Promise((resolve) => {
            setTimeout((()=>{
              resolve(ms)
            }), ms);
        });
    }

    async test(ms) {
        const cache = await this.timeout(ms);

        console.log(222)

        return cache
    }

    componentWillMount() {
        // if(!cookieUtil.hasItem("user")){
        //     createHashHistory().push("/platform/login");
        // }
    }

    componentDidMount() {
        this.test(5000).then(res => {
            console.log(res)
        })
    }

    render() {

        const percent = Number((this.props.homesData.issuedAmt / this.props.homesData.totalAmt) * 100).toFixed(0) + "%";

        const nowURTStyle = {
            marginLeft: percent
        }

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
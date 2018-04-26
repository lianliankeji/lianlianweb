import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {timeFormat} from 'utils/date.js'
import {contractPromote} from 'actions/Platform/contractPromote.js'
import {getChainsData} from 'actions/Platform/joinPlatforms.js'
import {cookieUtil} from "utils/cookie.js"
import {createHashHistory} from "history"

import {BackTop} from 'antd';
import './style.scss'

import Header from 'components/Platform/Header/index.js'
import Content from './subpage/Content/';
import Footer from 'components/Platform/Footer/index.js'

class ContractPromote extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {

        };
    }

    getChainsData = () => {
        const data = this.props.ChainsData;

        return data;

    }

    getInitial = () => {
        let data = JSON.parse(sessionStorage.getItem("promote"));

        return data;
    }

    componentWillMount() {
        if(!cookieUtil.hasItem("user")){
            createHashHistory().push("/platform/login");
        }
        this.props.getChainsData();
    }

    componentDidMount() {
        // console.log(this.props.match.params.id)
    }



    render() {


        return (
            <div>
                <Header />
                <Content
                    contractPromote = {this.props.contractPromote}
                    getChainsData = {this.props.ChainsData}
                    initial = {this.getInitial()}
                    user={cookieUtil.getItem("user")}
                />
                <Footer />
                <BackTop>
                    <div className="ant-back-top-inner">UP</div>
                </BackTop>
            </div>

        )
    }
}

function mapStateToProps(state) {

    return {
        ChainsData: state.chainsList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        contractPromote: bindActionCreators(contractPromote, dispatch),
        getChainsData: bindActionCreators(getChainsData, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContractPromote)
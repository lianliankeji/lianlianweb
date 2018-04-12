import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {timeFormat} from 'utils/date.js'
import {contractSave, checkDuplicate} from 'actions/Platform/contractSave.js'
import {getChainsData} from 'actions/Platform/joinPlatforms.js'
import {cookieUtil} from "utils/cookie.js"
import {createHashHistory} from "history"

import {BackTop} from 'antd';
import './style.scss'

import Header from 'components/Platform/Header/index.js'
import Footer from 'components/Platform/Footer/index.js'
import Content from './subpage/Content/';

class ContractUpload extends React.Component {
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

    componentWillMount() {
        if(!cookieUtil.hasItem("user")){
            createHashHistory().push("/platform/login");
        }
        this.props.getChainsData();
    }

    componentDidMount() {
        console.log(this.props.match.params.id)
    }



    render() {
        return (
            <div>
                <Header />
                <Content
                    contractSave = {this.props.contractSave}
                    getChainsData = {this.props.ChainsData}
                    checkDuplicate={this.props.checkDuplicate}
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
        contractSave: bindActionCreators(contractSave, dispatch),
        checkDuplicate: bindActionCreators(checkDuplicate, dispatch),
        getChainsData: bindActionCreators(getChainsData, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContractUpload)
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
import {cookieUtil} from "utils/cookie.js"
import {
    getChainsData,
    showChainsTable
} from 'actions/Platform/joinPlatforms.js'

import {BackTop} from 'antd';
import './style.scss'

import Header from 'components/Platform/Header/index.js'
import Footer from 'components/Platform/Footer/index.js'
import Content from './subpage/Content/';


class Chains extends React.Component {
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
        this.props.getChainsData();
    }

    componentDidMount() {
        console.log(this.props.match.params.id)
    }

    getChainsData = () => {
        return this.props.ChainsData
    }

    showChainsTable = (data, id) => {
        let payload = data.map((item, index) => {
            if(index == id) {
                if(item.display == "none") {
                    item  = Object.assign({}, item, {display: "block"})
                }else{
                    item  = Object.assign({}, item, {display: "none"})
                }
            }

            return item
        })
        this.props.showChainsTable(payload)
    }

    render() {


        return (
            <div>
                <Header />
                <Content
                    chainsList={this.getChainsData()}
                    showChainsTable={this.showChainsTable}
                    chainid={this.props.match.params.id}/>
                <Footer />                <BackTop>
                    <div className="ant-back-top-inner">UP</div>
                </BackTop>
                {/* <Loading /> */}
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
        getChainsData: bindActionCreators(getChainsData, dispatch),
        showChainsTable: bindActionCreators(showChainsTable, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chains)
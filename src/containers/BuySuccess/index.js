import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {timeFormat} from 'utils/date.js'
import {getContractShopList, showAndHide} from 'actions/Platform/getContractShopList.js'

import {BackTop} from 'antd';
import './style.scss'

import Header from './subpage/Header/index.js'
import Content from './subpage/Content/';

class BuySuccess extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {

        };
    }

    componentWillMount() {
        this.props.getContractShopList();
    }

    componentDidMount() {
        console.log(this.props.match.params.id)
    }

    getContractShopList = () => {
        return this.props.contractShopData
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

    showAndHide = (index, types) => {
        this.props.showAndHide({
            index,
            types
        })
    }

    render() {

        let orderInfo = JSON.parse(localStorage.getItem("orderInfo"));
        return (
            <div>
                <Header />
                <Content orderInfo = {orderInfo} />
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
        contractItem: state.contractItem
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getContractShopList: bindActionCreators(getContractShopList, dispatch),
        showAndHide: bindActionCreators(showAndHide, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BuySuccess)
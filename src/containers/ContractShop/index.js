import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {timeFormat} from 'utils/date.js'
import {getContractShopList, selectContract, showAndHide} from 'actions/Platform/getContractShopList.js'
import {createHashHistory} from "history"
import {saveSelectContractIteminfo} from "actions/Platform/selectContractItem.js"
import {cookieUtil} from "utils/cookie.js"

import { BackTop,} from 'antd';
import './style.scss'

import Header from 'components/Platform/Header/index.js'
import Content from './subpage/Content/';


class ContractShop extends React.Component {
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
        this.props.getContractShopList();
    }

    componentDidMount() {

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

    saveSelectContractIteminfo = (data) => {
        this.props.saveSelectContractIteminfo(data);
        localStorage.setItem("orderInfo", JSON.stringify(data.data));

    }

    selectContract = (item,index) => {

        this.props.selectContract(
            Object.assign({},item,{index:index})
        )
    }

    render() {


        return (
            <div>
                <Header />
                <Content
                    selectContract={this.selectContract}
                    contractShopList={this.getContractShopList()}
                    showAndHide={this.showAndHide}
                    saveSelectContractIteminfo = {this.saveSelectContractIteminfo}
                />
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
        contractShopData: state.contractShopList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getContractShopList: bindActionCreators(getContractShopList, dispatch),
        showAndHide: bindActionCreators(showAndHide, dispatch),
        selectContract: bindActionCreators(selectContract, dispatch),
        saveSelectContractIteminfo: bindActionCreators(saveSelectContractIteminfo, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContractShop)
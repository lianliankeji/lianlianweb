import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'

import {Anchor,Row,Col,Breadcrumb,Button, Input} from 'antd';
const Search = Input.Search;
import {HashRouter as Router,Route,Link,Redirect,Switch} from 'react-router-dom'
import {createHashHistory} from "history"


import './style.scss';


import Zhineng from 'images/zhineng.png';
import Tongzhi from 'images/tongzhi.png';
import Qrcode from 'images/qrcode.png'



class Content extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state = {
            showAll: "block",
            headerNav: [{
                name: "首页"
            }, {
                name: "申请入驻"
            }, {
                name: "联系我们"
            }],

        }
    }

    toggleLogin = () => {
        this.props.logFn();
    }

    getChainsList = () => {
        const data = this.props.chainsList;

        if(data && data.length) {
            return data
        }

    }

    tableView(data, id){
        console.log(id)
        this.props.showChainsTable(data, id);
    }

    goZhixng() {
        location.replace("/" + location.hash + "/perform")
    }

    hideShowButton = (index, types) => {
        this.props.showAndHide(index, types);
    }

    getContractShopList = () => {
        let data = this.props.contractShopList;

        return data;
    }

    goBack = () => {
        location.replace("/#/platform")
    }

    render() {
        return (
            <Row type="flex" justify="center" className="verify-content">
                <Col className="top" span={16}>
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item className="BreadcrumbItem" href="/#/platform">开放平台</Breadcrumb.Item>
                        <Breadcrumb.Item className="BreadcrumbItem" href="/#/platform/contract/develop">合约开发</Breadcrumb.Item>
                        <Breadcrumb.Item className="BreadcrumbItem" href="/#/platform/contract/upload">合约上传</Breadcrumb.Item>
                        <Breadcrumb.Item className="BreadcrumbItem" href="/#/platform/contract/verify">审核中</Breadcrumb.Item>
                    </Breadcrumb>

                    <h2 className="title">合约已发布  正在审核中...</h2>

                    <Row type="flex" justify="center" className="chains-intent">
                        <Col span={18} className="content">
                            <div className="section">
                                <div>
                                    <span className="label">合约ID:</span>
                                    <span>{this.props.uploadContractInfo.id}</span>
                                </div>
                                <div className="pulisher">
                                    <span className="label">发布人:</span>
                                    <span>{this.props.uploadContractInfo.publisher}</span>
                                </div>
                            </div>

                        </Col>
                    </Row>
                    <div className="button-content">
                        <Button className="Back" onClick={this.goBack}>返回</Button>
                    </div>



                </Col>
            </Row>


        )
    }
}

export default Content;
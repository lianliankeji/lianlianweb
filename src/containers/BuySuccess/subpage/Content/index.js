import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'

import {Row, Col, Breadcrumb, Button} from 'antd';
import {createHashHistory} from "history"


import './style.scss';


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

        if (data && data.length) {
            return data
        }

    }

    tableView(data, id) {
        console.log(id)
        this.props.showChainsTable(data, id);
    }

    goBack() {
        createHashHistory().replace("/platform/contract");
    }

    hideShowButton = (index, types) => {
        this.props.showAndHide(index, types);
    }

    getContractShopList = () => {
        let data = this.props.contractShopList;

        return data;
    }

    render() {
        return (
            <Row type="flex" justify="center" className="verify-content">
                <Col className="top" span={16}>
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item className="BreadcrumbItem" href="/#/platform">开放平台</Breadcrumb.Item>
                        <Breadcrumb.Item className="BreadcrumbItem" href="/#/platform/contract">合约商店</Breadcrumb.Item>
                        <Breadcrumb.Item className="BreadcrumbItem"
                                         href="/#/platform/contract/buysuccess">购买成功</Breadcrumb.Item>
                    </Breadcrumb>

                    <h2 className="title">购买成功.</h2>

                    <Row type="flex" justify="center" className="chains-intent">
                        <Col span={18} className="content">
                            <div className="section">
                                <div>
                                    <span className="label">合约名称:</span>
                                    <span>{this.props.orderInfo.name}</span>
                                </div>
                                <div>
                                    <span className="label">合约ID:</span>
                                    <span>{this.props.orderInfo.id}</span>
                                </div>
                                <div className="pulisher">
                                    <span className="label">发布人:</span>
                                    <span>{this.props.orderInfo.publisher}</span>
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
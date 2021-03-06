import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'

import {Anchor,Row,Col,Breadcrumb,Button, Input} from 'antd';
const Search = Input.Search;
import {withRouter} from 'react-router-dom'


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

        if(data && data.length) {
            return data
        }

    }

    tableView(data, id){
        console.log(id)
        this.props.showChainsTable(data, id);
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

    goTestChains = () => {
        this.props.history.push("/platform/join");
    }

    render() {
        return (
            <Row type="flex" justify="center" className="verify-content">
                <Col className="top" span={16}>
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item className="BreadcrumbItem" href="/#/">首页</Breadcrumb.Item>
                        <Breadcrumb.Item className="BreadcrumbItem" href="/#/platform">开放平台</Breadcrumb.Item>
                        <Breadcrumb.Item className="BreadcrumbItem" href="/#/platform/contract/develop">合约开发</Breadcrumb.Item>
                        <Breadcrumb.Item className="BreadcrumbItem" href="/#/platform/contract/upload">合约上传</Breadcrumb.Item>
                    </Breadcrumb>

                    <h2 className="title">合约已发布  正在审核中...</h2>

                    <Row type="flex" justify="center" className="chains-intent">
                        <Col span={18} className="content">
                            <div className="section">
                                <div>
                                    <span className="label">合约名称:</span>
                                    <span>{this.props.uploadContractInfo.name}</span>
                                </div>
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
                    <Row type="flex" justify="center">
                        <Col span={18} className="prompt">
                            提示：请在测试链中查询合约状态<span className="skip" onClick={this.goTestChains}>点此前往</span>
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

export default withRouter(Content);
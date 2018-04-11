import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'

import {Anchor,Row,Col,Breadcrumb,Button, Input} from 'antd';
const Search = Input.Search;
import {HashRouter as Router,Route,Link,Redirect,Switch} from 'react-router-dom'
let BASE_URL = process.env.NODE_ENV == "production" ? "https://loulan.lianlianchains.com/" : ""


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

    render() {
        return (
            <Row type="flex" justify="center" className="develop-content">
                <Col className="top" span={16}>
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item className="BreadcrumbItem" href="/#/platform">开放平台</Breadcrumb.Item>
                        <Breadcrumb.Item className="BreadcrumbItem" href="/#/platform/contract/develop">合约开发</Breadcrumb.Item>
                    </Breadcrumb>

                    <h2 className="title">楼兰智能合约开发者计划</h2>

                    <Row type="flex" justify="center" className="chains-intent">
                        <Col span={18} className="content">
                            <div>有技术能力的用户可参与加入楼兰开发者计划，按照平台提供的智能合约模板与接口标准开发智能合约。</div>
                            <div>合约完成后可发布到合约商店中出售。</div>
                            <div>链上企业将在商店中购买并支付区块链数字货币URT。平台不收取任何费用。</div>
                            <div>智能合约采用GOLANG语言开发，开发前请确认具备相关知识。</div>

                            <div className="bottom">
                                <div>开发者根据模板定制智能合约：<span className="button"><a href={`https://www.lianlianchains.com/smartcontract/lltemplet.go`}>合约模板</a></span></div>
                                <div>开发者根据模板书写接口说明：<span className="button"><a href={`https://www.lianlianchains.com/smartcontract/lltemplet.docx`}>文档模板</a></span></div>
                            </div>
                        </Col>
                    </Row>

                    <div className="publish"><Link to="/platform/contract/upload">已完成，点此发布智能合约</Link></div>

                </Col>
            </Row>


        )
    }
}

export default Content;
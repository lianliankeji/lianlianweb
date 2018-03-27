import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'

import {Anchor,Row,Col,Breadcrumb,Button, Input} from 'antd';
const Search = Input.Search;
import {HashRouter as Router,Route,Link,Redirect,Switch} from 'react-router-dom'


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
            <Row type="flex" justify="center" className="test-chains-content">
                <Col className="bg-content" span={24}>
                    <div className="bg"></div>
                </Col>
                <Col className="top" span={16}>
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item className="BreadcrumbItem" href="/#/platform">开放平台</Breadcrumb.Item>
                        <Breadcrumb.Item className="BreadcrumbItem" href="/#/platform/contract">合约商店</Breadcrumb.Item>
                        <Breadcrumb.Item className="BreadcrumbItem" href="/#/platform/contract/buy">合约购买</Breadcrumb.Item>
                    </Breadcrumb>

                    <h2 className="title">支付订单</h2>

                    <Row type="flex" justify="space-between" className="chains-intent">
                        <Col span={19}>
                            <h3>订单信息</h3>

                            <div>
                                <div>
                                    <span>合约ID：</span>
                                    <span></span>
                                </div>
                                <div>
                                    <span>发布人：</span>
                                    <span></span>
                                </div>
                                <div>
                                    <span>合约价格：</span>
                                    <span></span>
                                </div>
                            </div>
                        </Col>
                        <Col span={5}>
                            <div>
                                <img src={Qrcode}/>
                            </div>
                            <div>
                                <p>1.微信搜索小程序“快点plus”</p>
                                <p>2.进入菜单 我的-我的钱包-付款 </p>
                            </div>
                        </Col>
                    </Row>

                </Col>
            </Row>


        )
    }
}

export default Content;
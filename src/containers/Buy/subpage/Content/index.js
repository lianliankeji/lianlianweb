import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'

import {Anchor, Row, Col, Breadcrumb, Button, Input, Spin} from 'antd';
const Search = Input.Search;
import {HashRouter as Router, Route, Link, Redirect, Switch} from 'react-router-dom'


import './style.scss';


import Zhineng from 'images/zhineng.png';
import Tongzhi from 'images/tongzhi.png';
import Qrcode from 'images/qrcode.png'


class Content extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state = {}
    }


    render() {
        console.log(this.props.contractItem)
        return (
            <Row type="flex" justify="center" className="order-content">
                {/*<Col className="bg-content" span={24}>*/}
                {/*<div className="bg"></div>*/}
                {/*</Col>*/}
                <Col className="top" span={16}>
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item className="BreadcrumbItem" href="/#/platform">开放平台</Breadcrumb.Item>
                        <Breadcrumb.Item className="BreadcrumbItem" href="/#/platform/contract">合约商店</Breadcrumb.Item>
                        <Breadcrumb.Item className="BreadcrumbItem"
                                         href="/#/platform/contract/buy">合约购买</Breadcrumb.Item>
                    </Breadcrumb>

                    <h2 className="title">支付订单</h2>

                    <Row type="flex" justify="space-between" className="chains-intent">
                        <Col className="order">
                            <div className="left">
                                <h3 className="order-title">订单信息</h3>

                                <div>
                                    <div>
                                        <span className="label">合约名称：</span>
                                        <span className="value">{this.props.orderInfo.name}</span>
                                    </div>
                                    <div>
                                        <span className="label">合约ID：</span>
                                        <span className="value">{this.props.orderInfo.id}</span>
                                    </div>
                                    <div>
                                        <span className="label">发布人：</span>
                                        <span className="value">{this.props.orderInfo.publisher}</span>
                                    </div>
                                    <div>
                                        <span className="label">合约价格：</span>
                                        <span className="value">{this.props.orderInfo.price}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="right">
                                <Spin spinning={this.props.loading}>
                                    <div>
                                        <img width={150} src={this.props.qrcode}/>
                                    </div>
                                    <div>URT收款码</div>
                                    <div>
                                        <p className="rule">扫描二维码完成交易</p>
                                        {/*<p className="rule">2.进入菜单 我的-我的钱包-付款 </p>*/}
                                    </div>
                                </Spin>
                            </div>

                        </Col>
                    </Row>

                </Col>
            </Row>


        )
    }
}

export default Content;
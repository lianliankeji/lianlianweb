import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'

import {Anchor,Row,Col,Breadcrumb,Button, Input} from 'antd';
const Search = Input.Search;
import {HashRouter as Router,Route,Link,Redirect,Switch} from 'react-router-dom'


import './style.scss';


import Zhineng from 'images/zhineng.png';
import Tongzhi from 'images/tongzhi.png';



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

    goBuy() {
        location.replace("/" + location.hash + "/buy")
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
                    </Breadcrumb>

                    <h2 className="title">合约商店</h2>

                    <Row type="flex" justify="space-between" className="chains-intent">
                        {
                            this.getContractShopList().map((item, index) => {
                                return(
                                    <Col key={index} span={10} className="chains-intent-item" style={{height: !item.showAll ? "190px": ""}}>
                                        <img className="img" src={Tongzhi} />
                                        <div className="right">
                                            <h3 className="name">{item.title}</h3>
                                            <p className="intro">
                                                <span className={item.showAll ? "overflowZhankai" : "overflow"} ref={(overflow) => this.overflow = overflow}>{item.description}</span>
                                                <span
                                                    style={{display: item.showAll ? "none" : "block"}}
                                                    onClick={this.hideShowButton.bind(this, index, true)}
                                                    className="showAll">展开</span>
                                            </p>
                                            <p
                                                style={{display: !item.showAll ? "none" : "block"}}
                                                onClick={this.hideShowButton.bind(this, index, false)}><span className="close">收起</span></p>
                                            <div className="bottom">
                                                <div>
                                                    <span className="price">￥1000</span>
                                                    <span className="download">(已下载500次)</span>
                                                </div>
                                                <Button className="button" size={"default"} onClick={this.goBuy}>购买</Button>
                                            </div>
                                        </div>
                                    </Col>
                                )
                            })
                        }


                    </Row>
                </Col>
            </Row>


        )
    }
}

export default Content;
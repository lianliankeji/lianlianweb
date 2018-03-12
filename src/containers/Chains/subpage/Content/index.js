import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'

import {Anchor,Row,Col,Breadcrumb,Button} from 'antd';
import {HashRouter as Router,Route,Link,Redirect,Switch} from 'react-router-dom'

import './style.scss';


import Zhineng from 'images/zhineng.png';
import Tongzhi from 'images/tongzhi.png';



class Content extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state = {
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

    render() {
        return (
            <Row type="flex" justify="center" className="chains-content">
                <Col className="top" span={16}>
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item className="BreadcrumbItem" href="/#/platform">开放平台</Breadcrumb.Item>
                        <Breadcrumb.Item className="BreadcrumbItem" href="/#/platform/join">加入平台</Breadcrumb.Item>
                        <Breadcrumb.Item className="BreadcrumbItem" href="/#/platform/join/release">正式链</Breadcrumb.Item>
                    </Breadcrumb>

                    <h2 className="title">正式链</h2>

                    <Row type="flex" justify="space-between" className="chains-intent">
                        <Col span={10} className="chains-intent-item">
                            <img className="img" src={Tongzhi} />
                            <div>
                                <h3 className="name">智能合约</h3>
                                <p className="intro">智能合约的管理，如合约查看、上传、修改、升级</p>
                            </div>
                        </Col>
                        <Col span={10} className="chains-intent-item">
                            <img className="img" src={Zhineng} />
                            <div>
                                <h3 className="name">通知中心</h3>
                                <p className="intro">链上交易如需调用外围系统服务，可在通知中心配置</p>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>


        )
    }
}

export default Content;
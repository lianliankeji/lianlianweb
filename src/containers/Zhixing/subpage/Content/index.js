import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'

import {Anchor,Row,Col,Breadcrumb,Button,Input } from 'antd';
const { TextArea } = Input;
import {HashRouter as Router,Route,Link,Redirect,Switch} from 'react-router-dom'

import './style.scss';


import Transfer from 'images/transfer.png';
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
            <Row type="flex" justify="center" className="chains-perform-content">
                <Col className="top" span={16}>
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item className="BreadcrumbItem" href="/#/platform">开放平台</Breadcrumb.Item>
                        <Breadcrumb.Item className="BreadcrumbItem" href="/#/platform/join">加入平台</Breadcrumb.Item>
                        <Breadcrumb.Item className="BreadcrumbItem" href="/#/platform/join/test">测试链</Breadcrumb.Item>
                        <Breadcrumb.Item className="BreadcrumbItem" href="/#/platform/join/test">执行</Breadcrumb.Item>
                    </Breadcrumb>

                    <Row type="flex" justify="space-between" className="item">
                        <Col span={3} className="chains-intent-item">
                            <h3 className="label">输入数据</h3>
                        </Col>
                        <Col span={21} className="chains-intent-item">
                            <TextArea autosize={{minRows: 8.6}} />
                        </Col>
                    </Row>
                    <div className="transfer"><img src={Transfer}/></div>
                    <Row type="flex" justify="space-between" className="item">
                        <Col span={3} className="chains-intent-item">
                            <h3 className="label">输出数据</h3>
                        </Col>
                        <Col span={21} className="chains-intent-item">
                            <TextArea autosize={{minRows: 8.6}} />
                        </Col>
                    </Row>

                    <div className="button-content"><Button className="button" size={'large'}>导出接口</Button></div>
                </Col>
            </Row>


        )
    }
}

export default Content;
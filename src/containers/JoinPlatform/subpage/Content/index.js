import React, {
    Component
} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'

import {Popover, Anchor,Row,Col,Breadcrumb,Button} from 'antd';
import {
    HashRouter as Router,
    Route,
    Link,
    Redirect,
    Switch
} from 'react-router-dom'
import Tables from 'components/Home/Tables'

import './style.scss';


import Headerlogo from 'images/headerlogo.png';
import Logo from 'images/logo.png';
import Jiarupingtai from 'images/jiarupingtai.png';
import Heyue from "images/heyue.png";
import Hezuo from "images/hezuo.png"
import Chains from 'images/chains.png'


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

    getTableColumns = () => {
        const columns = [{
            title: '节点',
            dataIndex: 'node',
            key: 'node'
        }, {
            title: '交易',
            dataIndex: 'txid',
            key: 'txid',
        }, {
            title: '信息',
            dataIndex: 'txInfo',
            key: 'txInfo',
            render: (text, row, index) => {

                return (
                    <Popover placement="top" title={"交易信息"} content={text} trigger="hover">
                        <span>{text}</span>
                    </Popover>
                );
            },
        }, {
            title: '区块',
            dataIndex: 'block',
            key: 'block',
        }, {
            title: '时间',
            dataIndex: 'seconds',
            key: 'seconds',
            render: (text, row, index) => {
                return text;
            }
        }];

        return columns;

    }

    getTableData = () => {
        // const data = this.props.homesData.txRecords;
        //
        // data.map((item, index) => {
        //     return item.key = JSON.stringify(index);
        // })


        return [];

    }

    render() {
        return (
            <Row type="flex" justify="center" className="join-platform-content">
                <Col className="top" span={16}>
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item className="BreadcrumbItem" href="/#/platform">开放平台</Breadcrumb.Item>
                        <Breadcrumb.Item className="BreadcrumbItem" href="/#/platform/join">加入平台</Breadcrumb.Item>
                    </Breadcrumb>

                    <h2 className="title">加入平台</h2>

                    <Row type="flex" justify="space-between" className="platform-intent">
                        {
                            this.getChainsList().map((item, index) => {
                                return(
                                    <Col key={index} className="" span={24}>
                                        <div className="item">
                                            <div className="left">
                                                <img className="img" src={Chains} />
                                                <div>
                                                    <div className="name">{item.name}</div>
                                                    <div className="desc">{item.description}</div>
                                                    <div className="view" onClick={this.tableView.bind(this, this.getChainsList(), index)}>查看详情</div>
                                                </div>
                                            </div>
                                            <div>
                                                <div><Button className="button">测试链</Button></div>
                                                <div><Button className="button" style={{marginTop: "20px"}}><Link to={`/platform/join/release/${item.chainid}`}>正式链</Link></Button></div>
                                            </div>
                                        </div>
                                        <div className="tables-data" style={{display: item.display || "none"}}>
                                            <Tables columns={this.getTableColumns()} dataSourece={item.data} />
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
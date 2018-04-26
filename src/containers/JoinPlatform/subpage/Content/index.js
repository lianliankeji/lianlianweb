import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'

import {Popover,Row,Col,Breadcrumb,Button} from 'antd';
import {Link} from 'react-router-dom'
import Tables from 'components/Home/Tables'

import './style.scss';

class Content extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state = {

        }
    }


    getChainsList = () => {
        const data = this.props.chainsList;

        return data

    }

    tableView(data, id, detailUrl){
        this.props.showChainsTable(data, id, detailUrl);
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
                        <span>{text.substr(0,50)}</span>
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

    render() {
        return (
            <Row type="flex" justify="center" className="join-platform-content">
                <Col className="top" span={16}>
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item className="BreadcrumbItem" href="/#/">首页</Breadcrumb.Item>
                        <Breadcrumb.Item className="BreadcrumbItem" href="/#/platform">开放平台</Breadcrumb.Item>
                    </Breadcrumb>

                    <h2 className="title">加入平台</h2>

                    <Row type="flex" justify="space-between" className="platform-intent">
                        {
                            this.getChainsList().map((item, index) => {
                                return(
                                    <Col key={index} className="" span={24}>
                                        <div className="item">
                                            <div className="left">
                                                <img className="img" src={item.icon} />
                                                <div>
                                                    <div className="name">{item.name}</div>
                                                    <div className="desc">{item.description}</div>
                                                    <div className="view" onClick={this.tableView.bind(this, this.getChainsList(), item.chainid,item.details)}>查看详情</div>
                                                </div>
                                            </div>
                                            <div>
                                                <div><Button className="button"><Link to={`/platform/join/test/${item.chainid}`}>测试链</Link></Button></div>
                                                <div><Button className="button" style={{marginTop: "20px"}}><Link to={`/platform/join/release/${item.chainid}`}>正式链</Link></Button></div>
                                            </div>
                                        </div>
                                        <div className="tables-data" style={{display: item.display || "none"}}>
                                            <Tables columns={this.props.getTableColumns} dataSourece={item.data} />
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
import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {createHashHistory} from "history"
import {Anchor,Row,Col,Breadcrumb,Button, Input} from 'antd';
const Search = Input.Search;



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

    hideShowButton = (index, types) => {
        this.props.showAndHide(index, types);
    }

    getTestChainsList = () => {
        let data = this.props.testChainsList;

        return data;
    }

    onSearch = (value) => {
        this.props.seachReleaseChains(value)
    }

    update(item) {
        sessionStorage.setItem("promote", JSON.stringify(item));
        createHashHistory().push(`/platform/join/release/${this.props.chainid}/contract/promote`);
    }

    stop = () => {
        alert("敬请期待")
    }

    render() {
        return (
            <Row type="flex" justify="center" className="test-chains-content">
                <Col className="top" span={16}>
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item className="BreadcrumbItem" href={"/#/"}>首页</Breadcrumb.Item>
                        <Breadcrumb.Item className="BreadcrumbItem" href="/#/platform">开放平台</Breadcrumb.Item>
                        <Breadcrumb.Item className="BreadcrumbItem" href="/#/platform/join">加入平台</Breadcrumb.Item>
                    </Breadcrumb>

                    <h2 className="title">智能合约</h2>



                    <Row type="flex" justify="center" className="search-content">
                        <Col span={12 }>
                            <Search
                                className="search"
                                placeholder="搜索合约"
                                onSearch={this.onSearch}
                                enterButton
                            />
                        </Col>
                    </Row>

                    <Row type="flex" justify="space-between" className="chains-intent">
                        {
                            this.getTestChainsList().map((item, index) => {
                                return(
                                    <Col key={index} span={11} className="chains-intent-item" style={{height: !item.showAll ? "190px": ""}}>
                                        <img className="img" src={Tongzhi} />
                                        <div className="right">
                                            <h3 className="name">{item.name}</h3>
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
                                            <Button className="button" size={"default"} onClick={this.update.bind(this,item)}>升级</Button>
                                            {/*<Button className="button" size={"default"} onClick={this.stop}>停用</Button>*/}
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
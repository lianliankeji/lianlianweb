import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'

import {Anchor,Row,Col,Breadcrumb,Button, Input, message} from 'antd';
const Search = Input.Search;
import {createHashHistory} from "history"

import './style.scss';


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

    goZhixng(name, state) {
        if(state == "6" || state == "9") {
            localStorage.setItem("name",name);

            createHashHistory().push(`/platform/join/test/${this.state.id}/perform`)
        }else{
            message.info(this.props.contractState[state])
        }

    }

    hideShowButton = (index, types) => {
        this.props.showAndHide(index, types);
    }

    getTestChainsList = () => {
        let data = this.props.testChainsList;

        return data;
    }

    onSearch = (value) => {
        this.props.seachTestChains(value)
    }

    update(item) {
        sessionStorage.setItem("promote", JSON.stringify(item));
        createHashHistory().push(`/platform/join/release/${this.props.chainid}/contract/promote`);
    }

    componentDidMount() {
        this.setState({
            id: this.props.chainid
        })
    }

    render() {
        return (
            <Row type="flex" justify="center" className="test-chains-content">
                <Col className="top" span={16}>
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item className="BreadcrumbItem" href="/#/">首页</Breadcrumb.Item>
                        <Breadcrumb.Item className="BreadcrumbItem" href="/#/platform">开放平台</Breadcrumb.Item>
                        <Breadcrumb.Item className="BreadcrumbItem" href="/#/platform/join">加入平台</Breadcrumb.Item>
                    </Breadcrumb>

                    <h2 className="title">测试链</h2>



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
                                            <h3 className="name">
                                                {item.name}
                                                <span className="status">{`${item.state != "6" && item.state != "9" ? "(" + this.props.contractState[item.state] + ")" : ""}`}</span>
                                            </h3>
                                            <p className="intro">
                                                <span className={item.showAll ? "overflowZhankai" : "overflow"} ref={(overflow) => this.overflow = overflow}>{item.description}</span>
                                                <span
                                                    style={{display: item.showAll || item.description.length <30 ? "none" : "block"}}
                                                    onClick={this.hideShowButton.bind(this, index, true)}
                                                    className="showAll">展开</span>
                                            </p>
                                            <p
                                                style={{display: !item.showAll ? "none" : "block"}}
                                                onClick={this.hideShowButton.bind(this, index, false)}><span className="close">收起</span></p>
                                            {/*<Button className="button" size={"default"} ><Link to={`/platform/join/test/${this.props.chainid}/perform`}>执行</Link></Button>*/}
                                            <Button
                                                className="button"
                                                style={{backgroundColor: item.state != "6" && item.state != "9" ?  'gray' : ""}}
                                                size={"default"}
                                                disabled={item.state != "6" && item.state != "9" ? true : false}
                                                onClick={this.goZhixng.bind(this, item.name,item.state)}>执行</Button>
                                            <Button style={{marginLeft: "10px"}} className="button" size={"default"} onClick={this.update.bind(this,item)}>升级</Button>
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
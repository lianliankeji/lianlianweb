import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'

import {Row,Col,Breadcrumb,Button, Input, message} from 'antd';
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
            testflag: {
                "1": "审核拒绝",
                "3": "审核通过"
            }

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

    selectContract = (item,index) => {
        this.props.selectContract(item,index)
    }

    modalshow = (id) => {
        this.props.modalshow(id)
    }

    componentDidMount() {
        this.setState({
            id: this.props.chainid
        });

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
                                placeholder=""
                                onSearch={this.onSearch}
                                enterButton
                            />
                        </Col>
                    </Row>

                    <Row type="flex" justify="space-between" className="chains-intent">
                        {
                            this.getTestChainsList().map((item, index) => {
                                return(
                                    <Col key={index} span={11} className={`chains-intent-item ${item.active? "active" : "noactive"}`} onClick={this.selectContract.bind(this,item, index)} style={{height: !item.showAll ? "190px": ""}}>
                                        <img className="img" src={Tongzhi} />
                                        <div className="right">
                                            <h3 className="name">
                                                {item.name}
                                                <span className="status">
                                                    {`${item.state != "6" && item.state != "9" ? "(" + this.props.contractState[item.state] + ")" : item.testflag == 0 && item.state == "6" || item.testflag == 0 && item.state == "9"
                                                        ? "(" + "审核中" + ")" : "(" + this.state.testflag[item.testflag] + ")"}`}
                                                </span>
                                                {
                                                    this.props.roleType == 1 && (item.testflag == 0 && item.state == "6" || item.testflag == 0 && item.state == "9")
                                                    ?
                                                    <Button style={{display : item.state != "6" && item.state != "9" ? "none" : ""}}
                                                            className="verify" onClick={this.modalshow.bind(this, item.id)}>审核</Button>
                                                    : ""
                                                }
                                                {/*<span className="verifyS" >{*/}
                                                {/*item.testflag == 0 && item.state == "6" || item.testflag == 0 && item.state == "9"*/}
                                                {/*? "审核中" : this.state.testflag[item.testflag]}</span>*/}
                                            </h3>
                                            <p className="intro">
                                                <span className={item.showAll ? "overflowZhankai" : "overflow"} ref={(overflow) => this.overflow = overflow}>{item.description}</span>
                                                <span
                                                    style={{display: item.showAll || item.description.length <20 ? "none" : "block"}}
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
                                            <Button style={{marginLeft: "10px", display: item.publisher == this.props.user ? "":"none"}} className="button" size={"default"} onClick={this.update.bind(this,item)}>升级</Button>
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
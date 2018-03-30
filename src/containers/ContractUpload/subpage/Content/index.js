import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'

import {Form, Input, Anchor,Row,Col,Breadcrumb,Button,Checkbox} from 'antd';
const FormItem = Form.Item;
const Search = Input.Search;
const { TextArea } = Input;
import {HashRouter as Router,Route,Link,Redirect,Switch} from 'react-router-dom'


import './style.scss';


import Zhineng from 'images/zhineng.png';
import Tongzhi from 'images/tongzhi.png';
import Qrcode from 'images/qrcode.png'



const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
    },
};
// const formItemLayout = {
//     labelCol: { span: 4 },
//     wrapperCol: { span: 8 },
// };
const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8, offset: 4 },
};
class Content extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state = {
            checkNick: false,

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

    check = () => {
        this.props.form.validateFields(
            (err) => {
                if (!err) {
                    console.info('success');
                }
            },
        );
    }
    handleChange = (e) => {
        this.setState({
            checkNick: e.target.checked,
        }, () => {
            this.props.form.validateFields(['nickname'], { force: true });
        });
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        return (
            <Row type="flex" justify="center" className="upload-content">
                <Col className="top" span={16}>
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item className="BreadcrumbItem" href="/#/platform">开放平台</Breadcrumb.Item>
                        <Breadcrumb.Item className="BreadcrumbItem" href="/#/platform/contract/develop">合约开发</Breadcrumb.Item>
                        <Breadcrumb.Item className="BreadcrumbItem" href="/#/platform/contract/upload">合约上传</Breadcrumb.Item>
                    </Breadcrumb>

                    <h2 className="title">合约上传</h2>

                    <Row type="flex" justify="center" className="chains-intent">
                        <Col span={18} className="content">
                            <div className="form-control">
                                <FormItem {...formItemLayout} label="合约名称" >
                                    {getFieldDecorator('name', {
                                        rules: [{
                                            required: true,
                                            message: '合约名称不能为空',
                                        }],
                                    })(
                                        <Input className="item" placeholder="请输入合约名称" />
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} label="合约版本">
                                    {getFieldDecorator('version', {
                                        rules: [{
                                            required: true,
                                            message: '合约版本不能为空',
                                        }],
                                    })(
                                        <Input className="item" placeholder="请输入合约版本 例：V1.0.0" />
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} label="合约概述">
                                    {getFieldDecorator('description', {
                                        rules: [{
                                            required: this.state.checkNick,
                                            message: 'Please input your nickname',
                                        }],
                                    })(
                                        <TextArea  rows={4} className="item textarea" placeholder="400字以内" />
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} label="合约价格">
                                    {getFieldDecorator('price', {
                                        rules: [{
                                            required: this.state.checkNick,
                                            message: 'Please input your nickname',
                                        }],
                                    })(
                                        <Input className="item" placeholder="请输入合约价格" />
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} label="合约上传">
                                    {getFieldDecorator('upload', {
                                        rules: [{
                                            required: this.state.checkNick,
                                            message: 'Please input your nickname',
                                        }],
                                    })(
                                        <div className="item upload">
                                            <span className="upload-item">上传文档</span>
                                            <span className="upload-item">上传代码</span>
                                        </div>
                                    )}
                                </FormItem>
                                <FormItem {...formTailLayout}>
                                    <Button type="primary" onClick={this.check} className="button">
                                        {/*<Link to="/platform/contract/verify">上传</Link>*/}
                                        上传
                                    </Button>
                                </FormItem>
                            </div>
                        </Col>
                    </Row>

                    <div className="rule">
                        <p>1.发布后可立即在测试链中执行合约测试</p>
                        <p>2.审核成功后系统自动将合约上架应用商店</p>
                    </div>

                </Col>
            </Row>


        )
    }
}

export default  Form.create()(Content);
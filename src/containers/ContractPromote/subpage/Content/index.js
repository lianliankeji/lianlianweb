import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'

import {Upload,Select, message, Form, Input, Anchor,Row,Col,Breadcrumb,Button,Checkbox} from 'antd';
const FormItem = Form.Item;
const Search = Input.Search;
const Option = Select.Option;
const { TextArea } = Input;
import {HashRouter as Router,Route,Link,Redirect,Switch} from 'react-router-dom'
import {cookieUtil} from "utils/cookie.js"


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
            uploaded1: false,
            uploaded2: false,
            document: "",
            code: ""
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
        // console.log(id)
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

    onSubmit = (e) => {
        e.preventDefault();
        const {initial} = this.props;
        let user = "";
        if(cookieUtil.hasItem("user")) {
            user = cookieUtil.getItem("user");
        }else{
            location.replace("/#/platform/login")
            return;
        }

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }else{
                message.error("请完善信息");

                reuturn;
            }
        });
        // alert(this.props.form.getFieldsValue("version"))
        if(this.state.uploaded1 && this.state.uploaded2) {
            this.props.contractPromote(
                Object.assign({},{version: this.props.form.getFieldsValue().version},
                    {
                        document: this.state.document,
                        code: this.state.code,
                        id: initial.id
                    })
            )
        }else{
            if(!this.state.uploaded1) {
                message.error("请上传文档");
            }else{
                message.error("请上传代码");
            }

        }
    }

    checkParams = () => {
        let params = this.props.form.getFieldsValue();

        if(!params.name || !params.version) {
            return true;
        }


    }

    checkValigate = () => {
        let params = this.props.form.getFieldsValue();

        if(!params.name || !params.version) {
            message.warn("请先完善合约名称和版本号")
        }
    }

    getChainidOptions = () => {
        let data = this.props.getChainsData;

        data.map((item, index) => {
            return <Option key={index} value={item.chainid}>{item.chainid}</Option>
        })
    }

    checkName = (e) => {
        console.log(e.target.value)


    }

    componentDidMount() {
        const {initial} = this.props;
        this.props.form.setFields({
            name: {
                value: initial.name
            },
            version:{
                value: initial.version
            },
            description: {
                value: initial.description
            },
            price: {
                value: initial.price
            },
            chainid: {
                value: initial.chainid
            }
        });
    }

    render() {

        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const {initial} = this.props;
        let params = this.props.form.getFieldsValue();
        const props = {
            name: 'test',
            action: '/loulan/upload',
            method: 'post',
            data: {
                name: initial.name,
                version: params.version,
                publisher: this.props.user
            },
            onChange:(info) => {
                if (info.file.status !== 'uploading') {
                    console.log(info.file.response,);
                    this.setState({
                        document: info.file.response
                    })
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                    this.setState({
                        uploaded1: true
                    })
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };
        const props2 = {
            name: 'test',
            action: '/loulan/upload',
            method: 'post',
            data: {
                name: initial.name,
                version: params.version,
                publisher: this.props.user
            },
            onChange:(info) => {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                    this.setState({
                        code: info.file.response
                    })
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                    this.setState({
                        uploaded2: true
                    })
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };
        return (
            <Row type="flex" justify="center" className="promote-content">
                <Col className="top" span={16}>
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item className="BreadcrumbItem" href="/#/">首页</Breadcrumb.Item>
                        <Breadcrumb.Item className="BreadcrumbItem" href="/#/platform">开放平台</Breadcrumb.Item>
                        <Breadcrumb.Item className="BreadcrumbItem" href="/#/platform/join">加入平台</Breadcrumb.Item>
                    </Breadcrumb>

                    <h2 className="title">合约升级</h2>

                    <Row type="flex" justify="center" className="chains-intent">
                        <Col span={18} className="content">
                            <div className="form-control">
                                <form onSubmit={this.onSubmit}>
                                <FormItem {...formItemLayout} label="合约名称" >
                                    {getFieldDecorator('name', {
                                        rules: [{
                                            required: true,
                                            message: '合约名称不能为空',
                                        }],
                                    })(
                                        <Input className="item" placeholder="请输入合约名称" disabled={true}  />
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
                                <FormItem {...formItemLayout} label="合约概述"  >
                                    {getFieldDecorator('description', {
                                        rules: [{
                                            required: true,
                                            message: '合约概述不能为空',
                                        }],
                                    })(
                                        <TextArea maxLength={400}  rows={4} className="item textarea" disabled={true} placeholder="400字以内" />
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} label="合约价格">
                                    {getFieldDecorator('price', {
                                        rules: [{
                                            required: true,
                                            message: '合约价格不能为空',
                                        }],
                                    })(
                                        <Input className="item"  disabled={true} placeholder="请输入合约价格" />
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} label="链">
                                    {getFieldDecorator('chainid', {
                                        rules: [
                                            { required: true, message: '链ID不能为空' },
                                        ],
                                    })(
                                        <Select placeholder="请选择链" disabled={true}>
                                            {
                                                this.props.getChainsData.map((item, index) => {
                                                    return <Option key={index} value={item.chainid}>{item.name}</Option>
                                                })
                                            }
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} label="合约上传" required="true">
                                    <div className="item upload" onClick={this.checkValigate}>
                                        <Upload disabled={this.checkParams()} {...props}><span className="upload-item">上传文档</span></Upload>
                                        <Upload disabled={this.checkParams()} {...props2}><span className="upload-item">上传代码</span></Upload>
                                    </div>
                                </FormItem>
                                <FormItem {...formTailLayout}>
                                    <Button type="primary" htmlType="submit"  className="button">
                                        升级
                                    </Button>
                                </FormItem>
                                </form>
                            </div>
                        </Col>
                    </Row>

                    {/*<div className="rule">*/}
                        {/*<p>1.发布后可立即在测试链中执行合约测试</p>*/}
                        {/*<p>2.审核成功后系统自动将合约上架应用商店</p>*/}
                    {/*</div>*/}

                </Col>
            </Row>


        )
    }
}

export default  Form.create()(Content);
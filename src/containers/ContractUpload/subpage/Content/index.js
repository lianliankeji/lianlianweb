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

const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8, offset: 4 },
};

const oldStr = "";
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

    handleChange = (e) => {
        this.setState({
            checkNick: e.target.checked,
        }, () => {
            this.props.form.validateFields(['nickname'], { force: true });
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
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

                return;
            }
        });
        if(this.state.uploaded1 && this.state.uploaded2) {
            this.props.contractSave(
                Object.assign({},this.props.form.getFieldsValue(),
                    {
                        document: this.state.document,
                        code: this.state.code,
                        testflag: 0,
                        publisher: user
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

    getChainidOptions = () => {
        let data = this.props.getChainsData;

        data.map((item, index) => {
            return <Option key={index} value={item.chainid}>{item.chainid}</Option>
        })
    }

    checkName = (e) => {
        let str = e.target.value;
        var reg = /[a-zA-Z][a-zA-Z0-9_]*$/;

        if(reg.test(str)) {
            $(".name").val(str);
        }else{
            this.props.form.setFields({
                name: {
                    value: str,
                    errors: [new Error('名字重复')],
                },
            });
            $(".name").val("")
        }


    }

    checkDuplicate = (e) => {
        let str = e.target.value;

        this.props.checkDuplicate({
            name: str
        }).then((response) => {
            if(response.data.data == 1) {
                this.props.form.setFields({
                    name: {
                        value: str,
                        errors: [new Error('名字重复')],
                    },
                });
            }else{

            }
            console.log(response)
        })
        .catch((error) => {
            console.log(error);
        });

    }

    componentDidMount() {

    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const props = {
            name: 'test',
            action: '/loulan/upload',
            method: 'post',
            data: {
                openid: "18610270284"
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
                openid: "18610270284"
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
            <Row type="flex" justify="center" className="upload-content">
                <Col className="top" span={16}>
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item className="BreadcrumbItem" href="/#/">首页</Breadcrumb.Item>
                        <Breadcrumb.Item className="BreadcrumbItem" href="/#/platform">开放平台</Breadcrumb.Item>
                        <Breadcrumb.Item className="BreadcrumbItem" href="/#/platform/contract/develop">合约开发</Breadcrumb.Item>
                    </Breadcrumb>

                    <h2 className="title">合约上传</h2>

                    <div className="rule">
                        <p>1.发布后可立即在测试链中执行合约测试</p>
                        <p>2.审核成功后系统自动将合约上架应用商店</p>
                    </div>

                    <Row type="flex" justify="center" className="chains-intent">
                        <Col span={18} className="content">
                            <div className="form-control">
                                <form onSubmit={this.onSubmit}>
                                <FormItem {...formItemLayout} label="合约名称" >
                                    {getFieldDecorator('name', {
                                        rules: [{
                                            required: true,
                                            message: '只能以字母开头，内容为字母数字或下划线',
                                        }],
                                    })(
                                        <Input
                                            className="item name"
                                            maxLength={16}
                                            placeholder="请输入合约名称"
                                            onChange={this.checkName}
                                            onBlur={this.checkDuplicate}/>
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
                                        <TextArea maxLength={400}  rows={4} className="item textarea" placeholder="400字以内" />
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} label="合约价格">
                                    {getFieldDecorator('price', {
                                        rules: [{
                                            required: true,
                                            message: '合约价格不能为空',
                                        }],
                                    })(
                                        <Input className="item" placeholder="请输入合约价格" />
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} label="链">
                                    {getFieldDecorator('chainid', {
                                        rules: [
                                            { required: true, message: '链类别不能为空' },
                                        ],
                                    })(
                                        <Select placeholder="请选择链">
                                            {
                                                this.props.getChainsData.map((item, index) => {
                                                    return <Option key={index} value={item.chainid}>{item.name}</Option>
                                                })
                                            }
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} label="合约上传" required="true">
                                    <div className="item upload">
                                        <Upload {...props}><span className="upload-item">上传文档</span></Upload>
                                        <Upload {...props2}><span className="upload-item">上传代码</span></Upload>
                                    </div>
                                </FormItem>
                                <FormItem {...formTailLayout}>
                                    <Button type="primary" htmlType="submit"  className="button">
                                        {/*<Link to="/platform/contract/verify">上传</Link>*/}
                                        上传
                                    </Button>
                                </FormItem>
                                </form>
                            </div>
                        </Col>
                    </Row>



                </Col>
            </Row>


        )
    }
}

export default  Form.create()(Content);
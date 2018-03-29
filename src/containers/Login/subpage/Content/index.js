import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'

import {Anchor,Row,Col,Input,Button,InputNumber } from 'antd';
import axios from 'api/axios.js'
import apiRoot from "api/apiJson.js"
let BASE_URL = process.env.NODE_ENV == "production" ? apiRoot["release"].baseUrl : ""
let Path = process.env.NODE_ENV == "production" ? apiRoot.release.Route : apiRoot["dev"].Route
import {
    HashRouter as Router,
    Route,
    Link,
    Redirect,
    Switch
} from 'react-router-dom'

import './style.scss';


import Headerlogo from 'images/headerlogo.png';
import Logo from 'images/logo.png';
import Jiarupingtai from 'images/jiarupingtai.png';
import Heyue from "images/heyue.png";
import Hezuo from "images/hezuo.png"


class Content extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state = {
            IsCanSend: true,
            phoneno:"",
            sendButton: "获取",
            Nosending: true
        }
    }

    getPhoneno = (e) => {
        this.setState({
            phoneno: e + "",
        })
    }

    getCode = (e) => {
        this.setState({
            code:  e.target.value
        })
    }

    getPassword = (e) => {

        this.setState({
            password:  e.target.value
        })

        console.log(!this.state.password)
    }

    //获取按钮是否禁用
    IsCanSend = () => {
        return !this.state.phoneno || !this.state.Nosending
    }

    //登录按钮是否禁用
    IsCanLogin = () => {
        return !this.state.phoneno || !this.state.code || !this.state.password
    }

    //发送短信验证码
    sendmsg = () => {
        let num = 10;
        this.props.sendMsg({
            mobile: this.state.phoneno,
        });
        this.setState({
            sendButton: num + "秒",
            Nosending: false
        })

        let timer = setInterval(() => {
            if(num == 0) {
                this.setState({
                    sendButton: "获取",
                    Nosending: true
                });

                clearInterval(timer)
            }else{
                num--
                this.setState({
                    sendButton: num + "秒"
                });
            }

        },1000)
    }

    checkMsg = () => {
        return axios({
            method: 'post',
            url: BASE_URL + Path.Verify.path,
        }, {
            mobile: this.state.phoneno,
            code: this.state.code
        })
    }

    login = () => {
        this.checkMsg().then((res) => {
            if(res.data.code == 200) {
                this.props.login({
                    phoneno: this.state.phoneno,
                    password: this.state.password
                })
            }else{
                alert("222")
            }

        }).catch((err) => {

        })

    }

    render() {
        return (
            <Row type="flex" justify="center" className="login-content">
                <Col className="top" span={8}>
                    <div className="content">
                        <h3 className="title">登录</h3>
                        <div className="form-control">
                            <label className="label">手机号</label>
                            <InputNumber className="InputNumber" onChange={this.getPhoneno}/>
                        </div>
                        <div className="form-control">
                            <label className="label">验证码</label>
                            <div>
                                <Input className="pwd" onChange={this.getCode} />
                                <Button disabled={this.IsCanSend()} className="get" onClick={this.sendmsg}>{this.state.sendButton}</Button>
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label">密码</label>
                            <Input onChange={this.getPassword} />
                        </div>
                        <p className="rule">首次使用请直接填写密码，作为后续登录使用</p>
                        <div className="form-control button-control">
                            <Button disabled={this.IsCanLogin()} className="button" onClick={this.login}>登 录</Button>
                        </div>
                        <div className="forgot-control">
                            <span className="forgot"><Link to="/platform/forgot">忘记密码</Link></span>
                        </div>

                    </div>

                </Col>
            </Row>


        )
    }
}

export default Content;
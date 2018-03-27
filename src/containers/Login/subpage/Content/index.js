import React, {
    Component
} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'

import {Anchor,Row,Col,Input,Button,InputNumber } from 'antd';
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
            phoneno:""
        }
    }

    getPhoneno = (e) => {
        this.setState({
            phoneno: e + "",
        },() => {
            this.setState({
                IsCanSend: !!this.state.phoneno && this.state.phoneno.length ? false : true
            })
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
                                <Input className="pwd"  />
                                <Button disabled={this.state.IsCanSend} className="get">获取</Button>
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label">密码</label>
                            <Input  />
                        </div>
                        <p className="rule">首次使用请直接填写密码，作为后续登录使用</p>
                        <div className="form-control button-control">
                            <Button disabled="true" className="button">登 录</Button>
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
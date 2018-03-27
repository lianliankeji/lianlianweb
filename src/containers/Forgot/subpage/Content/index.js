import React, {
    Component
} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'

import {
    Anchor,
    Row,
    Col,
    Input,
    Button
} from 'antd';
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

    render() {
        return (
            <Row type="flex" justify="center" className="forgot-content">
                <Col className="top" span={8}>
                    <div className="content">
                        <h3 className="title">找回密码</h3>
                        <div className="form-control">
                            <label className="label">手机号</label>
                            <Input placeholder="Basic usage" />
                        </div>
                        <div className="form-control">
                            <label className="label">验证码</label>
                            <div>
                                <Input className="pwd" placeholder="Basic usage" />
                                <Button className="get">获取</Button>
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label">新密码</label>
                            <Input placeholder="Basic usage" />
                        </div>
                        <div className="form-control button-control">
                            <Button disabled="true" className="button">提 交</Button>
                        </div>
                        <div className="forgot-control">
                            <span className="forgot"><Link to="/platform/login">返回</Link></span>
                        </div>

                    </div>

                </Col>
            </Row>


        )
    }
}

export default Content;
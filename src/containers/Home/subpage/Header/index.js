import React, {
    Component
} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import $ from 'jquery'
import {Anchor,Row,Col} from 'antd';
const {Link} = Anchor;
import {
    HashRouter as Router,
    Route,
    Link as LinkUrl,
    Redirect,
    Switch
} from 'react-router-dom'

import './style.scss';


import Headerlogo from 'images/headerlogo.png';
import Headerlogo2 from 'images/headerlogo2.png';
import Logo from 'images/logo.png';


class Header extends Component {
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
            headerStyle: {},
            colorSty: {},
            Headerlogo: Headerlogo2
        }
    }

    componentDidMount() {
        const wrapper = this.header
        let timeoutId
        const callback = () => {
            const top = wrapper.getBoundingClientRect().top
            const windowHeight = window.screen.height;
            let headerSty = top && top < 0 ?
                {
                    backgroundColor: "#fff",
                    position: "fixed",
                    width: "100%",
                    top: "0",
                    zIndex: "100",
                    color: "#333 !important"
                }
                : {backgroundColor: "transparent", position: "static", color: "#fff"};

            if (top && top < 0) {
                $(".ant-anchor-link-title,.link").addClass("active");
                this.setState({
                    Headerlogo: Headerlogo
                })
            }else{
                $(".ant-anchor-link-title,.link").removeClass("active");
                this.setState({
                    Headerlogo: Headerlogo2
                })
            }
            this.setState({
                headerStyle: headerSty
            })

        }
        window.addEventListener("scroll", function () {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(callback, 20)
        }.bind(this), false)
    }

    render() {
        return (
            <header className="header" ref={(header) => {
                this.header = header
            }}>
                <Row className="headerTop" type="flex" justify="center" style={this.state.headerStyle}>
                    <Col className="top" span={16}>
                        <img src={this.state.Headerlogo} alt="logo"/>
                        {
                            window.screen.width < 768 ?

                                <ul className="header-nav">
                                    <li className="header-nav-item">
                                        {/*<LinkUrl className="link" to="/platform">公司产品</LinkUrl>*/}
                                        <LinkUrl className="link" to="/">公司产品</LinkUrl>
                                    </li>
                                    <li className="header-nav-item" title="Digital Assets">
                                        <Anchor affix={false}><Link className="link" href="#assets" title="核心优势"/></Anchor>
                                    </li>
                                    <li className="header-nav-item"  title="Contact">
                                        <Anchor affix={false}><Link className="link" href="#contact" title="联系我们"/></Anchor>
                                    </li>
                                </ul>
                                :
                                <ul className="header-nav">
                                    <li className="header-nav-item">
                                        {/*<LinkUrl className="link" to="/platform">公司产品</LinkUrl>*/}
                                        <LinkUrl className="link" to="/">公司产品</LinkUrl>
                                    </li>
                                    <li className="header-nav-item" title="Digital Assets">
                                        <Anchor affix={false}><Link className="link" href="#assets" title="核心优势"/></Anchor>
                                    </li>
                                    <li className="header-nav-item"  title="Contact">
                                        <Anchor affix={false}><Link className="link" href="#contact" title="联系我们"/></Anchor>
                                    </li>
                                </ul>
                        }


                    </Col>
                </Row>
                <div className="logo">
                    <img src={Logo} alt="logo"/>
                </div>
                {/* <div onClick={this.toggleLogin}>
                 {this.props.login ? "登录" : "退出"}
                 </div> */}
                <p className="platform">—— 通过跨链技术构建开放式的价值交换网络 ——</p>

            </header>

        )
    }
}

export default Header;
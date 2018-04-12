import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'

import {Row, Col} from 'antd';
import {HashRouter as Router, Link} from 'react-router-dom'

import './style.scss';


import Headerlogo from 'images/headerlogo.png';



class PlatformHeader extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
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


    Gohome = () => {
        location.replace("/")
    }

    render() {
        return (
            <header className="platform-header">
                <Row type="flex" justify="center" className="header-content">
                    <Col className="top" span={16}>
                        <img src={Headerlogo} alt="logo" onClick={this.Gohome} />
                        {
                            window.screen.width < 768 ?

                                "移动端"
                                :
                                <Router>
                                    {/*<ul className="header-nav">*/}
                                        {/*<li className="header-nav-item"><Link className="link" to="/">首页</Link></li>*/}
                                        {/*<li className="header-nav-item"><Link className="link" to="/platform">开放平台</Link></li>*/}
                                    {/*</ul>*/}
                                </Router>
                        }
                    </Col>
                </Row>
                {/*<div className="bg">*/}
                    {/*<p className="slogen">一站式联盟链解决方案</p>*/}
                {/*</div>*/}

            </header>

        )
    }
}

export default PlatformHeader;
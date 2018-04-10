import React, {
    Component
} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'

import {
    Anchor,
    Row,
    Col,
    Breadcrumb,
    Button
} from 'antd';
import {Link, withRouter} from 'react-router-dom'

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

    skipdevelop = () => {
        this.props.history.push({pathname : "/platform/contract/develop",states:{aa: 1}})
    }

    render() {
        return (
            <Row type="flex" justify="center" className="platform-content">
                <Col className="top" span={16}>

                    <Row type="flex" justify="space-between" className="platform-intent">
                        <Col className="item" span={7}>
                            <img className="img" src={Jiarupingtai} title="加入平台" />
                            <p>平台已开放零售、影视、医疗等联盟链</p>
                            <p>无需编码配置即可上链</p>
                            <Button className="button join" type="primary"><Link to="/platform/join">加入平台</Link></Button>
                        </Col>
                        <Col className="item" span={7}>
                            <img className="img" src={Heyue} title="合约商店" />
                            <p>平台为应用提供了丰富的智能合约</p>
                            <p>可在合约商店中下载后发布到链上</p>
                            <Button className="button"><Link to="/platform/contract">合约商店</Link></Button>
                        </Col>
                        <Col className="item" span={7}>
                            <img className="img" src={Hezuo} title="合约开发" />
                            <p>有技术能力的用户可签约开发者</p>
                            <p>在商店中出售智能合约</p>
                            <Button className="button" onClick={this.skipdevelop}>合约开发</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>


        )
    }
}

export default withRouter(Content);
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {
    connect
} from 'react-redux'
import {
    bindActionCreators
} from 'redux'
import {
    timeFormat
} from 'utils/date.js'
import {
    getHomesData
} from 'actions/Home/getHomeData.js'

import {
    BackTop,
    Popover,
    Row,
    Col,
    Progress
} from 'antd';
import './style.scss'

import Header from './subpage/Header/index.js'
import Content from './subpage/Content/';
import Loading from "components/Loading/index.js"
import Tables from 'components/Home/Tables/index.js'
import Footer from 'components/Platform/Footer/index.js'

import OpenLogo from 'images/open.png';
import SafeLogo from 'images/safe.png';
import EcologyLogo from 'images/ecology.png';
import Assetslogo from 'images/assetslogo.png';
import Block from 'images/block.png';
import Nodes from 'images/nodes.png';

class Platform extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            allianceList: [{
                img: OpenLogo,
                charac: "开放",
                descList: ["智能合约定制化", "联盟链共识节点可灵活扩展接入", "成熟的BAAS平台快速区块链赋能"]
            }, {
                img: SafeLogo,
                charac: "安全",
                descList: ["手机二次验证", "ECDSA数字证书", "决策委员会多重签名"]
            }, {
                img: EcologyLogo,
                charac: "生态",
                descList: ["零售行业互链互通", "零售供应链金融数字贸易"]
            }]
        };
    }

    login = () => {
        let loginState = this.props.userinfo.login;


        if (loginState) {
            this.props.userinfoActions.logout({
                login: false
            })
        } else {
            this.props.userinfoActions.login({
                login: true
            })
        }
    }

    getTableColumns = () => {
        const columns = [{
            title: '节点',
            dataIndex: 'node',
            key: 'node'
        }, {
            title: '交易',
            dataIndex: 'txid',
            key: 'txid',
        }, {
            title: '信息',
            dataIndex: 'txInfo',
            key: 'txInfo',
            render: (text, row, index) => {

                return (
                    <Popover placement="top" title={"交易信息"} content={text} trigger="hover">
                        <span>{text.substr(0,50)}</span>
                    </Popover>
                );
            },
        }, {
            title: '区块',
            dataIndex: 'block',
            key: 'block',
        }, {
            title: '时间',
            dataIndex: 'seconds',
            key: 'seconds',
            render: (text, row, index) => {
                return timeFormat(text);
            }
        }];

        return columns;

    }

    getTableData = () => {
        const data = this.props.homesData.txRecords;

        data.map((item, index) => {
            return item.key = JSON.stringify(index);
        })


        return data;

    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    render() {

        const percent = Number((this.props.homesData.issuedAmt / this.props.homesData.totalAmt) * 100).toFixed(0) + "%";

        const nowURTStyle = {
            marginLeft: percent
        }

        return (
            <div>
                <Header />
                <Content />
                <Footer />
                <BackTop>
                    <div className="ant-back-top-inner">UP</div>
                </BackTop>
                {/* <Loading /> */}
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        homesData: state.homesData
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getHomesData: bindActionCreators(getHomesData, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Platform)
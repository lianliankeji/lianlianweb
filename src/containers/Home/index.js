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
import {getHomesData} from 'actions/Home/getHomeData.js'

import {
    BackTop,
    Popover,
    Row,
    Col,
    Progress
} from 'antd';
import './style.scss'

import Header from './subpage/Header/index.js'
import Loading from "components/Loading/index.js"
import Tables from 'components/Home/Tables/index.js'
import Footer from 'components/Home/Footer/index.js'

import Pic from "images/pic.png"
import ImgTable from 'images/img-table.png'
import Xinlingshou from 'images/xinlingshou.png';
import NumberCul from 'images/numberCulture.png';
import EcologyLogo from 'images/ecology.png';
import OverPay from 'images/overPay.png';
import Watch from 'images/watch.png';
import Exchange from 'images/exchange.png';
import Network from 'images/network.png';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            productList: [{
                img: Xinlingshou,
                charac: "新零售联盟链"
            }, {
                img: NumberCul,
                charac: "数字文化联盟链"
            }, {
                img: OverPay,
                charac: "跨境支付联盟链"
            }, {
                img: Watch,
                charac: "监管科技联盟链"
            }],
            advantage: [
                {
                    img: Exchange,
                    title: "区块链跨链",
                    desc: [
                        "链间、跨链协议的目标在链与链、链与非链之间通过共识方式交换数据，从而实现数据及价值交换更加便利。",
                        "链链信息的跨链、同构链间技术已落地和商业应用，并在持续完善和申请专利保护。异构链间技术研究持续进行中，预计2020年达到商业应用。"
                    ]
                },
                {
                    img: Network,
                    title: "区块链赋能",
                    desc: [
                        "融合AI、区块链以及大数据技术，在三个方面赋能用户：",
                        '“上链”—如何把业务场景在区块链上实现。',
                        '“用链”—如何从使用区块链中，获得价值。',
                        '“链墒”—如何通过基于区块链的Token，分享和共享价值。'
                    ]
                }
            ]
        };
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
                        <span>{text.substr(0, 50)}</span>
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

    handleScroll (e) {

    }

    render() {

        const percent = Number((this.props.homesData.issuedAmt / this.props.homesData.totalAmt) * 100).toFixed(0) + "%";

        const nowURTStyle = {
            marginLeft: percent
        }

        return (
            <div>
                <Header userinfo={this.props.userinfo}/>
                <section className="section1">
                    <Row type="flex" justify="center">
                        <Col span={16}>
                            <div className="about">
                                <img className="img" src={Pic}/>
                                <div className="info">
                                    <h3 className="title">关于链链</h3>
                                    <div>
                                        <p className="elem">北京链链信息技术有限公司（简称“链链”）成立于2016年9月。</p>
                                        <p className="elem">最早成为Linux Foundation会员资格 ，加入Hyperledger超级账本计划。</p>
                                        <p className="elem">
                                            创始股东和团队为资深区块链技术研究专家，旨在通过区块链开放平台赋能新零售、影视文化、监管科技、跨境支付等领域，并通过跨链技术实现各种联盟链的互联互通，构建开放式的价值交换网络。</p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" className="ecology-content">
                        <Col span={16}>
                            <div className="ecology">
                                <h3 className="title">生态架构</h3>
                                <img className="img" src={ImgTable}/>
                            </div>
                        </Col>
                    </Row>
                </section>
                <section id="union" className="section2">
                    <Row type="flex" justify="center" className="ecology-content">
                        <Col span={16}>
                            <h3 className="title">联盟链</h3>
                            <ul className="products">
                                {this.state.productList.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            <img src={item.img}/>
                                            <div className="name">{item.charac}</div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </Col>
                    </Row>
                </section>
                <section id="assets" className="section3">
                    <Row type="flex" justify="center">
                        <Col span={16}>
                            <div className="products">
                                <h3 className="title">核心优势</h3>
                                <div className="products-content">
                                    {this.state.advantage.map((item, index) => {
                                        return (
                                            <div key={index} className="item">
                                                <img className="img" src={item.img}/>
                                                <div>
                                                    <h3 className="name">{item.title}</h3>
                                                    <ul className="desc">
                                                        {item.desc.map((elem, i) => {
                                                            return <li key={i}>{elem}</li>
                                                        })}</ul>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </section>
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
        homesData: state.homesData,
        userinfo: state.userinfo
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
)(Home)
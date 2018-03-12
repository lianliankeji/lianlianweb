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
                    desc: "链间通讯技术可将多个区块链系统通过分布式去中心化网络链接起来，以达到区块链的灵活组合与扩展，从而在链与链之间通过共识方式交换信息数据，在各个区块链孤岛间建立标准化的通讯协议，使区块链之间信息及价值交换更加便利。"
                },
                {
                    img: Network,
                    title: "区块链赋能",
                    desc: "未来的联盟链的应用场景，需要区块链与非区块链系统进行很好的整合才能发挥优势。链链为企业提供一站式区块链解决方案，可以很好的让各行各业、应用场景“上链”，然后再通过“上链”后形成的积累价值，促进行业的数字化转型以及价值分配体系的优化。"
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
        this.props.getHomesData();
        // var oRoot = document.getElementById('root');
        // var socket = io.connect("https://store.lianlianchains.com");
        // socket.on("chainDataUpdt", function(data) {
        //     console.log(data);
        //     // oRoot.innerText = data.hello;
        //     // socket.emit("client", {my: "data"})
        // });
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
                <section className="section1">
                    <Row type="flex" justify="center">
                        <Col span={16}>
                            <div className="about">
                                <img src={Pic} />
                                <div className="info">
                                    <h3 className="title">关于链链</h3>
                                    <div>
                                        <p className="elem">北京链链信息技术有限公司（简称“链链”）成立于2016年9月。</p>
                                        <p className="elem">最早成为Linux Foundation会员资格 ，加入Hyperledger超级账本计划。</p>
                                        <p className="elem">创始股东和团队为资深区块链技术研究专家，旨在通过区块链开放平台赋能新零售、影视文化、监管科技、跨境支付等领域，并通过跨链技术实现各种联盟链的互联互通，构建开放式的价值交换网络。</p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" className="ecology-content">
                        <Col span={16}>
                            <div className="ecology">
                                <h3 className="title">生态架构</h3>
                                <img className="img" src={ImgTable} />
                            </div>
                        </Col>
                    </Row>
                </section>
                <section id="assets" className="section2">
                    <Row type="flex" justify="center" className="ecology-content">
                        <Col span={16}>
                            <h3 className="title">公司产品</h3>
                            <ul className="products">
                                {this.state.productList.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            <img src={item.img} />
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
                                                <img className="img" src={item.img} />
                                                <div>
                                                    <h3 className="name">{item.title}</h3>
                                                    <p className="desc">{item.desc}</p>
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
)(Home)
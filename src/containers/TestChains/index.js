import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {timeFormat} from 'utils/date.js'
import {Modal, Button} from "antd"
import {getTestChainsList, showAndHide, seachTestChains, selectContract,updateFlag} from 'actions/Platform/getTestChainsList.js'
import {getRoletype} from 'actions/Platform/getRoletype.js'
import {createHashHistory} from "history"
import {cookieUtil} from "utils/cookie.js"
import {BackTop, Popover} from 'antd';
import './style.scss'

import Header from 'components/Platform/Header/index.js'
import Footer from 'components/Platform/Footer/index.js'
import Content from './subpage/Content/';


class Chains extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            visible: false,
            loading: false
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


    componentWillMount() {
        if(!cookieUtil.hasItem("user")){
            createHashHistory().push("/platform/login");
        }
        this.props.getTestChainsList({
            chainid: this.props.match.params.id
        });
    }

    componentDidMount() {
        this.props.getRoletype({
            openid: cookieUtil.getItem("user")
        }).then(res => {
            // console.log(res)
            if(res.data.ec == "000000") {
                this.setState({
                    roleType: res.data.data.role
                })
            }
        }).catch(err => {

        })
    }

    getTestChainsList = () => {
        return this.props.testChainsData
    }

    seachTestChains = (value) => {
        this.props.seachTestChains({
            name: value,
            chainid: this.props.match.params.id
        })
    }

    showChainsTable = (data, id) => {
        let payload = data.map((item, index) => {
            if(index == id) {
                if(item.display == "none") {
                    item  = Object.assign({}, item, {display: "block"})
                }else{
                    item  = Object.assign({}, item, {display: "none"})
                }
            }

            return item
        })
        this.props.showChainsTable(payload)
    }

    showAndHide = (index, types) => {
        this.props.showAndHide({
            index,
            types
        })
    }

    selectContract = (item,index) => {

        this.props.selectContract(
            Object.assign({},item,{index:index})
        )
    }

    modalshow = (id) => {
        this.setState({
            visible: true,
            id: id
        })
    }

    handleOk = () => {
        this.setState({
            loading: true
        },() => {
            this.props.updateFlag({
                id: this.state.id,
                testflag: 3
            }).then(res => {
                this.setState({
                    visible: false,
                    loading:false
                },() => {
                    this.reload();
                })
            })

        })

    }

    hiddenModal = () => {
        this.setState({
            visible: false
        })
    }

    handleCancel = () => {
        this.setState({
            loading: true
        },() => {
            this.props.updateFlag({
                id: this.state.id,
                testflag: 1
            }).then(res => {
                this.setState({
                    visible: false,
                    loading:false
                },() => {
                    this.reload();
                })
            })

        })
    }

    reload = () => {
        location.reload()
    }

    render() {


        return (
            <div>
                <Header />
                <Content
                    selectContract={this.selectContract}
                    testChainsList={this.getTestChainsList()}
                    contractState={this.props.contractState}
                    showAndHide={this.showAndHide}
                    seachTestChains={this.seachTestChains}
                    chainid={this.props.match.params.id}
                    roleType={this.state.roleType}
                    modalshow={this.modalshow}
                    user={cookieUtil.getItem("user")}/>

                <Footer />
                <Modal
                    visible={this.state.visible}
                    title="审核"
                    onOk={this.handleOk}
                    onCancel={this.hiddenModal}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>拒绝</Button>,
                        <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleOk}>
                            通过
                        </Button>,
                    ]}
                >
                    <p>是否审核通过？</p>
                </Modal>
                <BackTop>
                    <div className="ant-back-top-inner">UP</div>
                </BackTop>
            </div>

        )
    }
}

function mapStateToProps(state) {

    return {
        testChainsData: state.testChainsList.testChainsList,
        contractState: state.testChainsList.contractState,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getTestChainsList: bindActionCreators(getTestChainsList, dispatch),
        showAndHide: bindActionCreators(showAndHide, dispatch),
        seachTestChains: bindActionCreators(seachTestChains, dispatch),
        selectContract: bindActionCreators(selectContract, dispatch),
        getRoletype: bindActionCreators(getRoletype, dispatch),
        updateFlag: bindActionCreators(updateFlag, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chains)
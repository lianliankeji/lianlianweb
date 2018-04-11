import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {timeFormat} from 'utils/date.js'
import {getTestChainsList, showAndHide, seachTestChains} from 'actions/Platform/getTestChainsList.js'

import {BackTop, Popover} from 'antd';
import './style.scss'

import Header from './subpage/Header/index.js'
import Content from './subpage/Content/';


class Chains extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {

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
        // const data = this.props.homesData.txRecords;
        //
        // data.map((item, index) => {
        //     return item.key = JSON.stringify(index);
        // })
        //
        //
        // return data;

    }

    componentWillMount() {
        this.props.getTestChainsList({
            chainid: this.props.match.params.id
        });
        // var oRoot = document.getElementById('root');
        // var socket = io.connect("https://store.lianlianchains.com");
        // socket.on("chainDataUpdt", function(data) {
        //     console.log(data);
        //     // oRoot.innerText = data.hello;
        //     // socket.emit("client", {my: "data"})
        // });
    }

    componentDidMount() {
        console.log()
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

    render() {


        return (
            <div>
                <Header />
                <Content
                    testChainsList={this.getTestChainsList()}
                    contractState={this.props.contractState}
                    showAndHide={this.showAndHide}
                    seachTestChains={this.seachTestChains}
                    chainid={this.props.match.params.id}/>
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
        testChainsData: state.testChainsList.testChainsList,
        contractState: state.testChainsList.contractState,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getTestChainsList: bindActionCreators(getTestChainsList, dispatch),
        showAndHide: bindActionCreators(showAndHide, dispatch),
        seachTestChains: bindActionCreators(seachTestChains, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chains)
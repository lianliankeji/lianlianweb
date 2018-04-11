import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {timeFormat} from 'utils/date.js'
import {getChainsData, showChainsTable} from 'actions/Platform/joinPlatforms.js'

import {BackTop, Popover} from 'antd';
import './style.scss'

import Header from 'components/Platform/Header/index.js'
import Content from './subpage/Content/';

class JoinPlatform extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {

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
        this.props.getChainsData();
    }

    componentDidMount() {

    }

    getChainsData = () => {
        return this.props.ChainsData
    }

    showChainsTable = (data, id) => {
        let payload = data.map((item, index) => {
            if(item.chainid == id) {
                if(item.display == "none") {
                    item  = Object.assign({}, item, {display: "block"})
                }else{
                    item  = Object.assign({}, item, {display: "none"})
                }
            }

            return item
        })
        this.props.showChainsTable({data: payload, id: id})
    }

    render() {


        return (
            <div>
                <Header />
                <Content chainsList={this.getChainsData()} showChainsTable={this.showChainsTable} />
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
        ChainsData: state.chainsList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getChainsData: bindActionCreators(getChainsData, dispatch),
        showChainsTable: bindActionCreators(showChainsTable, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(JoinPlatform)
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {timeFormat} from 'utils/date.js'
import {getReleaseChainsList, showAndHide, seachReleaseChains} from 'actions/Platform/getReleaseChainsList.js'

import {
    Button,
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

class IntelligentContract extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {

        };
    }

    componentWillMount() {
        this.props.getReleaseChainsList({
            chainid: this.props.match.params.id
        });
    }

    componentDidMount() {

    }

    getReleaseChainsList = () => {
        return this.props.releaseChainsData
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

    seachReleaseChains = (value) => {
        this.props.seachReleaseChains({
            name: value,
            chainid: this.props.match.params.id
        })
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
                    testChainsList={this.getReleaseChainsList()}
                    showAndHide={this.showAndHide}
                    seachReleaseChains = {this.seachReleaseChains}
                    chainid={this.props.match.params.id}
                />
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
        releaseChainsData: state.releaseChainsList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getReleaseChainsList: bindActionCreators(getReleaseChainsList, dispatch),
        seachReleaseChains: bindActionCreators(seachReleaseChains, dispatch),
        showAndHide: bindActionCreators(showAndHide, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IntelligentContract)
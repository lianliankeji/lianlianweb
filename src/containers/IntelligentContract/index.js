import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {timeFormat} from 'utils/date.js'
import {cookieUtil} from "utils/cookie.js"
import {getReleaseChainsList, showAndHide, seachReleaseChains} from 'actions/Platform/getReleaseChainsList.js'
import {createHashHistory} from "history"

import {BackTop} from 'antd';
import './style.scss'

import Header from 'components/Platform/Header/index.js'
import Footer from 'components/Platform/Footer/index.js'
import Content from './subpage/Content/';

class IntelligentContract extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {

        };
    }

    componentWillMount() {
        if(!cookieUtil.hasItem("user")){
            createHashHistory().push("/platform/login");
        }
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
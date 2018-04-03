import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {timeFormat} from 'utils/date.js'
import {perform} from 'actions/Platform/perform.js'

import {Button, BackTop, Popover, Row, Col, Progress} from 'antd';
import './style.scss'

import Header from './subpage/Header/index.js'
import Content from './subpage/Content/';
import Footer from 'components/Platform/Footer/index.js'

import OpenLogo from 'images/open.png';
import SafeLogo from 'images/safe.png';
import EcologyLogo from 'images/ecology.png';


class Chains extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {

        };
    }

    perform = (data) => {

        let name = localStorage.getItem("name")
        let chainsItem = this.props.chainsList.filter((item, index) => {
            return item.chainid == this.props.match.params.id
        });

        this.props.perform({
            // url: chainsItem[0].testexcuteurl,
            url: chainsItem[0].testexcuteurl,
            data: Object.assign({},data, {chaincodename: name})
        })
    }

    query = (data) => {
        let name = localStorage.getItem("name")
        let chainsItem = this.props.chainsList.filter((item, index) => {
            return item.chainid == this.props.match.params.id
        });
        this.props.perform({
            url: this.state.chainsItem[0].testqueryurl,
            data: Object.assign({},data, {chaincodename: name})
        })
    }

    componentWillMount() {

    }

    componentDidMount() {
        console.log(window.location.search)
    }

    render() {


        return (
            <div>
                <Header />
                <Content
                    perform={this.perform}
                    query={this.query}
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
        chainsList: state.chainsList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        perform: bindActionCreators(perform, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chains)
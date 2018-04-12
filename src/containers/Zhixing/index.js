import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {timeFormat} from 'utils/date.js'
import {perform, query} from 'actions/Platform/perform.js'
import {cookieUtil} from "utils/cookie.js"
import {createHashHistory} from "history"

import {BackTop} from 'antd';
import './style.scss'

import Header from 'components/Platform/Header/index.js'
import Footer from 'components/Platform/Footer/index.js'
import Content from './subpage/Content/';



class Chains extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            resultData: ""
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
            data: Object.assign({}, data, {chaincodename: name})
        }).then((res) => {
            this.setState({
                resultData: JSON.stringify(res.data)
            })
        }).catch(err => {

        })
    }

    query = (data) => {
        let name = localStorage.getItem("name")
        let chainsItem = this.props.chainsList.filter((item, index) => {
            return item.chainid == this.props.match.params.id
        });
        this.props.query({
            url: chainsItem[0].testqueryurl,
            data: Object.assign({}, data, {chaincodename: name})
        }).then((res) => {
            this.setState({
                resultData: JSON.stringify(res.data)
            })
        }).catch(err => {

        })
    }

    componentWillMount() {
        if(!cookieUtil.hasItem("user")){
            createHashHistory().push("/platform/login");
        }
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
                    resultData={this.state.resultData}
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
        chainsList: state.chainsList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        perform: bindActionCreators(perform, dispatch),
        query: bindActionCreators(query, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chains)
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {timeFormat} from 'utils/date.js'


import {BackTop} from 'antd';
import './style.scss'

import Header from './subpage/Header/index.js'
import Content from './subpage/Content/';
import Footer from 'components/Platform/Footer/index.js'

class ContractVerify extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {};
    }

    componentWillMount() {

    }

    componentDidMount() {
        console.log(this.props.match.params.id)
    }

    showChainsTable = (data, id) => {
        let payload = data.map((item, index) => {
            if (index == id) {
                if (item.display == "none") {
                    item = Object.assign({}, item, {display: "block"})
                } else {
                    item = Object.assign({}, item, {display: "none"})
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

    getUploadContractinfo = () => {
        let data = JSON.parse(sessionStorage.getItem("uploadContractInfo"));

        return data;
    }

    render() {


        return (
            <div>
                <Header />
                <Content uploadContractInfo={this.getUploadContractinfo()}/>
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
        uploadContractInfo: state.uploadContractInfo
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContractVerify)
import React, {
    Component
} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'

import {
    Table
} from 'antd';

import './style.scss';

import Headerlogo from 'images/headerlogo.png';
import Logo from 'images/logo.png';
import OpenLogo from 'images/open.png';
import SafeLogo from 'images/safe.png';
import EcologyLogo from 'images/ecology.png';
import Assetslogo from 'images/assetslogo.png';
import Block from 'images/block.png';
import Nodes from 'images/nodes.png';

class Tables extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state = {

        }
    }

    toggleLogin = () => {
        this.props.logFn();
    }

    getTableColumns = () => {

        const columns = this.props.columns;

        return columns;

    }

    getTableData = () => {
        const data = this.props.dataSourece;

        return data;

    }

    render() {
        return (

            <Table
                    pagination={false}
                    columns={this.getTableColumns()} 
                    dataSource={this.getTableData()} />

        )
    }
}

export default Tables;
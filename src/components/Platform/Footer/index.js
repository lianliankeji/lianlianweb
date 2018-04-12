import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {
    Row,
    Col
} from 'antd'

import './style.scss';

import Aiyi from 'images/aiyi.png';
import Wensli from 'images/wensli.png';
import Xinhua from 'images/xinhua.png';
import Address from 'images/address.png';


export default class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {};
    }

    render() {
        return (
            <footer id="contact" className="platform-homes-footer">
                <p className="bei"><span className="company">北京链链信息技术有限公司</span><span>京ICP备16055742号-3</span></p>
            </footer>
        )
    }
}
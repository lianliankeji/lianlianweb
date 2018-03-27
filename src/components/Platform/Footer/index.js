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
                {/*<Row type="flex" justify="center">*/}
                    {/*<Col span={16}>*/}
                        {/*<div className="content">*/}
                            {/*<div className="item">*/}
                                {/*<h3 className="title">联系我们</h3>*/}
                                {/*<div className="contact">*/}
                                    {/*<div className="tel">*/}
                                        {/*<label>地址</label><span>北京市朝阳区光华路5号院世纪财富中心</span>*/}
                                    {/*</div>*/}
                                    {/*<div className="tel">*/}
                                        {/*<label>电话：</label><span>(010) 85875500-8617</span>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                            {/*<div className="item address">*/}
                                {/*<img className="img" src={Address} />*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    {/*</Col>*/}
                {/*</Row>*/}

                <p className="bei"><span className="company">北京链链信息技术有限公司</span><span>京ICP备16055742号-3</span></p>
            </footer>
        )
    }
}
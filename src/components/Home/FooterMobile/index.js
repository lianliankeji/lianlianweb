import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {
    Row,
    Col
} from 'antd'

import './style.scss';

import Aiyi from 'images/mobile/aiyi.png';
import Wensli from 'images/mobile/wensli.png';
import Xinhua from 'images/mobile/xinhua.png';
import Qrcode from 'images/mobile/qrcode.png';


export default class FooterMobile extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {};
    }

    render() {
        return (
            <footer id="contact" className="home-footer-mobile">
                {/*<section className="item Cooperative">
                    <h3 className="title">合作企业</h3>
                    <div className="logo">
                        <img className="img" src={Aiyi} />
                        <img className="wensli img" src={Wensli} />
                        <img className="img" src={Xinhua} />
                    </div>
                </section>*/}
                <div className="line"></div>
                <section className="item Contact">
                    <h3 className="title">联系我们</h3>
                    <div className="contactMsg">
                        <div className="tel">
                            <label>电话：</label><span>(010) 8587 5500-8617</span>
                        </div>
                        <p className="bei"><span className="company">北京链链信息技术有限公司</span><span>京ICP备16055742号-3</span></p>
                    </div>
                </section>
                <div className="line"></div>
                <section className="item attention">
                <h3 className="title">关注我们</h3>
                <div className="code">
                    <img className="QRcode" src={Qrcode} />
                </div>
                </section>   
            </footer>
        )
    }
}
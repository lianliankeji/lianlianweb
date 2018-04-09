import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin'

import {Anchor,Row,Col,Breadcrumb,Button,Input,Form, message } from 'antd';
const { TextArea } = Input;
const FormItem = Form.Item;

import './style.scss';

class Content extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state = {
            req: ""
        }
    }

    perform = () => {
        if(!!this.state.req) {
            this.props.perform(this.state.req)
        }else{
            message.error("输入数据不能为空")
        }

    }

    query = () => {
        if(!!this.state.req) {
            this.props.query(this.state.req)
        }else{
            message.error("输入数据不能为空")
        }
    }

    getInData = (e) => {
        let data = JSON.parse(e.target.value);

        this.setState({
            req: data
        })
    }

    render() {
        return ( 
            <Row type="flex" justify="center" className="chains-perform-content">
                <Col className="top" span={16}>
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item className="BreadcrumbItem" href="/#/platform">开放平台</Breadcrumb.Item>
                        <Breadcrumb.Item className="BreadcrumbItem" href="/#/platform/join">加入平台</Breadcrumb.Item>
                        <Breadcrumb.Item className="BreadcrumbItem" href={`/#/platform/join/test/${this.props.chainid}`}>测试链</Breadcrumb.Item>
                        <Breadcrumb.Item className="BreadcrumbItem" href={`/#/platform/join/test/${this.props.chainid}/perform`}>执行</Breadcrumb.Item>
                    </Breadcrumb>

                    <Row type="flex" justify="space-between" className="item">
                        <Col span={3} className="chains-intent-item">
                            <h3 className="label">输入数据</h3>
                        </Col>
                        <Col span={21} className="chains-intent-item">
                            <TextArea
                                autosize={{minRows: 8.6}}
                                onChange={this.getInData}
                                placeholder='输入项必须遵循严格的json格式，key值必须用双引，例：{"key": "value"}'
                            />
                        </Col>
                    </Row>
                    <div className="transfer">
                        {/*<img src={Transfer} onClick={this.perform} />*/}
                        <Button className="button" size={'large'} onClick={this.perform}>执行</Button>
                        <Button style={{marginLeft: "10px"}} className="button" size={'large'} onClick={this.query}>查询</Button>
                        {/*<img src={Transfer} onClick={this.query}/></div>*/}
                    </div>
                    <Row type="flex" justify="space-between" className="item">
                        <Col span={3} className="chains-intent-item">
                            <h3 className="label">输出数据</h3>
                        </Col>
                        <Col span={21} className="chains-intent-item">
                            <TextArea autosize={{minRows: 8.6}} value={this.props.resultData} />
                        </Col>
                    </Row>

                    <div className="button-content"><Button className="button" size={'large'}>导出接口</Button></div>
                </Col>
            </Row>


        )
    }
}

export default Content;
import React from 'react'
import {
    HashRouter as Router,
    Route,
    Link,
    Redirect,
    Switch
} from 'react-router-dom'
import { Spin } from 'antd';
import Loadable from 'react-loadable';

//Switch: 只渲染命中的第一个route
import Loading from "components/Loading/"

const Home = Loadable({
    loader: () => import('containers/'),
    loading: Loading,
});

const Platform = Loadable({
    loader: () => import('containers/Platform/'),
    loading: Loading,
});

const JoinPlatform = Loadable({
    loader: () => import('containers/JoinPlatform/'),
    loading: Loading,
});

const Chains = Loadable({
    loader: () => import('containers/Chains/'),
    loading: Loading,
});

//智能合约
const IntelligentContract = Loadable({
    loader: () => import('containers/IntelligentContract/'),
    loading: Loading,
});

//升级
const ContractPromote = Loadable({
    loader: () => import('containers/ContractPromote/'),
    loading: Loading,
});

//测试链
const TestChains = Loadable({
    loader: () => import('containers/TestChains/'),
    loading: Loading,
});

//合约执行
const Zhixing = Loadable({
    loader: () => import('containers/Zhixing/'),
    loading: Loading,
});

//合约商店
const ContractShop = Loadable({
    loader: () => import('containers/ContractShop/'),
    loading: Loading
})

//购买
const Buy = Loadable({
    loader: () => import('containers/Buy/'),
    loading: Loading
})

//购买成功
const BuySuccess = Loadable({
    loader: () => import('containers/BuySuccess/'),
    loading: Loading
})

//登录
const Login = Loadable({
    loader: () => import('containers/Login/'),
    loading: Loading
})

//找回密码
const Forgot = Loadable({
    loader: () => import('containers/Forgot/'),
    loading: Loading
})

//合约开发
const ContractDev = Loadable({
    loader: () => import('containers/ContractDev/'),
    loading: Loading
})

//合约上传
const ContractUpload = Loadable({
    loader: () => import('containers/ContractUpload/'),
    loading: Loading
})

//合约审核
const ContractVerify = Loadable({
    loader: () => import('containers/ContractVerify/'),
    loading: Loading
})



const RouterMap = () => (
    <Router>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/home' component={Home} />

            <Route exact path='/platform' component={Platform} />
                <Route exact path="/platform/login" component={Login} />
                <Route exact path="/platform/forgot" component={Forgot} />
                <Route exact path='/platform/join' component={JoinPlatform} />
                <Route exact path='/platform/join/release/:id' component={Chains} />
                <Route exact path='/platform/join/release/:id/contract' component={IntelligentContract} />
                <Route exact path='/platform/join/release/:id/contract/promote' component={ContractPromote} />
                <Route exact path='/platform/join/test/:id' component={TestChains} />
                <Route exact path='/platform/join/test/:id/perform' component={Zhixing} />

                <Route exact path="/platform/contract" component={ContractShop}/>
                <Route exact path="/platform/contract/buy" component={Buy}/>
                <Route exact path="/platform/contract/buysuccess" component={BuySuccess}/>

                <Route exact path="/platform/contract/develop" component={ContractDev}/>
                <Route exact path="/platform/contract/upload" component={ContractUpload}/>
                <Route exact path="/platform/contract/verify" component={ContractVerify}/>
        </Switch>
    </Router>
)


export default RouterMap
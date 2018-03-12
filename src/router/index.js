import React from 'react'
import {
    HashRouter as Router,
    Route,
    Link,
    Redirect,
    Switch
} from 'react-router-dom'

//Switch: 只渲染命中的第一个route

import Home from 'containers/'
import Platform from 'containers/Platform/'
import JoinPlatform from 'containers/JoinPlatform/'
import Chains from 'containers/Chains/'


const RouterMap = () => (
    <Router>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/home' component={Home} />
            <Route exact path='/platform' component={Platform} />
            <Route exact path='/platform/join' component={JoinPlatform} />
            <Route exact path='/platform/join/release/:id' component={Chains} />
        </Switch>
    </Router>
)


export default RouterMap
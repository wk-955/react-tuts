import React from 'react'
import { render } from 'react-dom'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import App from './App'
import zhCN from 'antd/es/locale/zh_CN'
import {ConfigProvider} from 'antd'

import { mainRoutes } from './routes'

import './index.less'
import { Provider } from 'react-redux'
import store from './store'


render(
    <Provider store={store}>
        <ConfigProvider locale={zhCN}>
            <Router>
                <Switch>
                    <Route path="/admin" component={App} />
                    {
                        mainRoutes.map(route => {
                            return <Route key={route.pathname}
                            path={route.pathname} component={route.component} />
                        })
                    }
                    <Redirect to="/admin" from="/" exact />
                    <Redirect to="/404" />
                </Switch>
            </Router>
        </ConfigProvider>
    </Provider>,
    document.querySelector('#root')
)
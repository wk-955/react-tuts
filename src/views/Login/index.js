import React, { Component } from 'react'
import LoginPage from './LoginPage'
import { Card } from 'antd'
import { connect } from 'react-redux'
import { login } from '../../actions/login'
import { Redirect } from 'react-router-dom'
 
import './login.less'

const mapState = state => ({
    isLogin: state.user.isLogin,
    isLoading: state.user.isLoading
})

@connect(mapState, { login })
class Login extends Component {
    render() 
    {
        return (
            this.props.isLogin
            ?
            <Redirect to='/admin' />
            :
            <Card className='login' title='登录页面'>
                <LoginPage {...this.props}/>
            </Card>
        )
    }
}

export default Login
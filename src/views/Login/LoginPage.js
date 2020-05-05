import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.less'


const LoginPage = (props) => {
    const onFinish = values => {
        console.log('成功:', values);
        props.login(values)
    }

    return (
        <Form
            name="basic"
            initialValues={{ 
                remember: true,
            }}
            onFinish={onFinish}
        >
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: '请输入你的用户名!',
                    },
                ]}
            >
                <Input 
                    disabled={props.isLoading}
                    prefix={<UserOutlined className="site-form-item-icon" />} 
                    placeholder="用户名" 
                />
            </Form.Item>

            <Form.Item
                disabled={props.isLoading}
                name="password"
                rules={[
                    {
                        required: true,
                        message: '请输入你的密码!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="密码"
                />
            </Form.Item>

            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox disabled={props.isLoading} >记得我</Checkbox>
                </Form.Item>
                <a className="login-form-forgot" href="#1">
                    忘记密码
                </a>
            </Form.Item>

            <Form.Item>
                <Button loading={props.isLoading} type="primary" htmlType="submit" className='login-form-button'>
                    登录
                </Button>
                <a href="#2">点击此处注册!</a>
            </Form.Item>
        </Form>
    );
};

export default LoginPage
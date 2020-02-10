import React, { useState } from 'react'
import { Form, Icon, Input, Button, Checkbox, notification } from 'antd'
import { Pane, Spinner, Link } from 'evergreen-ui'
import './index.css'

function registerFrom(props) {
    const { getFieldDecorator } = props.form;
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };

    function onFinish(value){
        console.log(value)
    }

    return <div>
        <h1 className="header-register">Register</h1>
        <Form className="register-form"
            {...formItemLayout}
            onFinish={onFinish}
        >
            <Form.Item
                name="email"
                label="E-mail"
            >
                {getFieldDecorator('email', {
                    rules: [{
                        required: true,
                        message: 'Please input your email!'
                    },
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    }],
                })(
                    <Input
                        placeholder="your email"
                    />,
                )}
            </Form.Item>
            <Form.Item
                name="username"
                label="username"
            >
                {getFieldDecorator('user', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                })(
                    <Input
                        placeholder="Your username"
                    />,
                )}
            </Form.Item>
            <Form.Item
                name="name"
                label="Full name"
            >
                {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'Please input your full name!' }],
                })(
                    <Input
                        placeholder="Your full name"
                    />,
                )}
            </Form.Item>
            <Form.Item
                name="password"
                label="Password"
            >
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your password!' }],
                })(
                    <Input
                        type="password"
                        placeholder="Password"
                    />,
                )}
            </Form.Item>
            <Form.Item
                name="confirm"
                label="Comfirm"
            >
                {getFieldDecorator('confirm', {
                    rules: [{ required: true, message: 'Please input your password!' }],
                })(
                    <Input
                        type="password"
                        placeholder="Confirm your password"
                    />,
                )}
            </Form.Item>
            <Form.Item>
                <br></br>
                <Button type="primary" htmlType="submit" className="register-form-button">
                    {false ? <Pane display="flex" alignItems="center" justifyContent="center"  >
                        <Spinner size={25} />
                    </Pane> : 'Register new account'}
                </Button>
            </Form.Item>
        </Form>

    </div>
}

export default registerFrom
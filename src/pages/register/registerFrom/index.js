import React, { useState } from 'react'
import { Form, Icon, Input, Button, Checkbox, notification } from 'antd'
import { Pane, Spinner, Link } from 'evergreen-ui'
import './index.css'
import gql from 'graphql-tag'
import { useMutation } from 'react-apollo'
import { useHistory } from 'react-router-dom'

function registerFrom(props) {
    const CREATE_NEW_USER = gql`
        mutation($input: CreateUserInput!){
            createUser(input: $input){
                email
                username
                password
            }
        }

    `

    const [disable, setDisable] = useState(true)

    const [createUser, { data, loading: mutationLoading, error: mutationError }] = useMutation(CREATE_NEW_USER)

    const history = useHistory()

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

    function onHandleSubmit(e) {
        e.preventDefault()
        props.form.validateFields((err, values) => {
            if (!err) {
                const { email, username, fullname, password, confirm } = values
                if (password !== confirm) {
                    notification['error']({
                        message: 'Register fail',
                        description:
                            'Password doesnt match',
                        placement: 'bottomRight',
                    });
                    return
                }
                const input = {
                    email,
                    username,
                    fullname,
                    password
                }
                createUser({
                    variables: {
                        input
                    }
                }).then(res => {
                    if (res.data.createUser) {
                        history.push('/')
                    }
                    notification['success']({
                        message: 'Register success',
                        description:
                            '',
                        placement: 'bottomRight',
                    });
                }).catch(err => {
                    const message = err.message.slice(err.message.indexOf(':') + 2, err.message.length)
                    notification['error']({
                        message: 'Register fail',
                        description: message,
                        placement: 'bottomRight',
                    });
                })
            }
        })
    }

    return <div>
        <h1 className="header-register">Register</h1>
        <Form className="register-form"
            {...formItemLayout}
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
                {getFieldDecorator('username', {
                    rules: [{ required: true, message: 'Please input your username!' }]
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
                {getFieldDecorator('fullname', {
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
                label="Confirm"
            >
                {getFieldDecorator('confirm', {
                    rules: [{ required: true, message: 'Please input confirm your password!' }],
                })(
                    <Input
                        type="password"
                        placeholder="Confirm your password"
                    />,
                )}
            </Form.Item>
            <Form.Item>
                <Checkbox onChange={(e) => {
                    if (e.target.checked) {
                        setDisable(false)
                    }else{
                        setDisable(true)
                    }
                }}>Huy dep trai ?</Checkbox>
            </Form.Item>
            <Form.Item>
                <Button disabled={disable} type="primary" htmlType="submit" className="register-form-button" onClick={onHandleSubmit}>
                    {mutationLoading ? <Pane display="flex" alignItems="center" justifyContent="center"  >
                        <Spinner size={25} />
                    </Pane> : 'Register new account'}
                </Button>
            </Form.Item>
            
        </Form>

    </div>
}

export default registerFrom
import React, { useState } from 'react'
import { Form, Icon, Input, Button, Checkbox, notification } from 'antd'
import gql from 'graphql-tag'
import { graphql, useMutation } from 'react-apollo'
import './index.css'
import { compose } from 'recompose'
import { Pane, Spinner, Link } from 'evergreen-ui'
import { useHistory } from "react-router-dom";


const USER_LOGIN = gql`
mutation($input: LoginRequest!){
    login(input: $input){
      token
      id
    }
}`


function FormLogin(props) {
    const [loading, setLoading] = useState(false)
    const { getFieldDecorator } = props.form
    const history = useHistory()

    const [ loginUser ] = useMutation(USER_LOGIN)

    function register(e) {
        history.push('/register')
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                const input = {
                    email: values.email,
                    password: values.password
                }
                setLoading(true)
                loginUser({
                    variables: {
                        input
                    }
                }).then(res => {
                    if (res.data.login) {
                        props.context(true)
                        notification['success']({
                            message: 'Login success',
                            description:
                                '',
                            placement: 'bottomRight',
                        });
                        window.localStorage.setItem('token', `Bearer ${res.data.login.token}`)
                    }
                }).catch(err => {
                    setLoading(false)
                    console.log(err)
                    notification['error']({
                        message: 'Login fail',
                        description:
                            'Incorrect username or password',
                        placement: 'bottomRight',
                    });
                })
            } else {
                notification['error']({
                    message: 'Login fail',
                    description:
                        'Please input your email and password',
                    placement: 'bottomRight',
                });
            }
        });
    };
    return (
        <div>
            <h1 className="header">Stargram</h1>
            <Form onSubmit={handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Please input your email!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Email Address"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your password!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(<Checkbox>Remember me</Checkbox>)}
                    <a className="login-form-forgot" href="">
                        Forgot password
                        </a>
                    <br></br>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        {loading ? <Pane display="flex" alignItems="center" justifyContent="center"  >
                            <Spinner size={25} />
                        </Pane> : 'Log in'}
                    </Button>
                    <br></br>
                    <a className="login-form-register" onClick={register}>
                        Register for a new account
                        </a>
                </Form.Item>
            </Form>

        </div>
    );

}

export default FormLogin
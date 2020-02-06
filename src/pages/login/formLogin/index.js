import React from 'react'
import { Form, Icon, Input, Button, Checkbox, notification } from 'antd'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import './index.css'
import { compose } from 'recompose'
import ModalNewAccount from './../modalNewAccount'

class FormLogin extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { data } = this.props.getAllUser
                const input= {
                    email: values.email,
                    password: values.password
                }
                this.props.loginUser({
                    variables: {
                        input
                    }
                }).then(res => {
                    if (res.data.login) {
                        this.props.context(true)
                        notification['success']({
                            message: 'Login success',
                            description:
                                '',
                            placement: 'bottomRight',
                        });
                        window.localStorage.setItem('token', res.data.login.token)
                    }
                }).catch(err => {
                    console.log(err)
                    notification['error']({
                        message: 'Login fail',
                        description:
                            'Incorrect username or password',
                        placement: 'bottomRight',
                    });
                })
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <h1 className="header">Stargram</h1>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: 'Please input your email!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
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
                            Log in
                        </Button>
                        <br></br>
                        <ModalNewAccount></ModalNewAccount>
                    </Form.Item>
                </Form>

            </div>
        );
    }
}

const GET_ALL_USER = gql`
    query{
        getAllUser{
        _id
        username
        password
        role
        }
  }
`

const USER_LOGIN = gql`
mutation($input: LoginRequest!){
    login(input: $input){
      token
      id
    }
}`


export default compose(
    graphql(USER_LOGIN, {
        name: 'loginUser',
        options: props => ({
            variables: {
                input: props.input
            }
        })
    }),
    graphql(GET_ALL_USER, {
        name: 'getAllUser'
    }),
)(FormLogin)
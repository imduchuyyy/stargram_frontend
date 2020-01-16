import React, { useState } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import './index.css'
import { compose } from 'recompose'
import { Drawer, Form, Button, Col, Row, Input, notification } from 'antd';


function ModalNewAccount(props) {
    const [visible, setVisible] = useState(false)
    let username, password, confirm
    function onClose() {
        setVisible(false)
    }
    function showDrawer() {
        setVisible(true)
    }
    function onCreateAccount() {
        if (password !== confirm) {
            notification['error']({
                message: 'Create account fail',
                description:
                    'password does not match',
                placement: 'bottomRight',
            });
            return
        }
        setVisible(false)
    }

    return (
        <div>
            <a className="login-form-register" onClick={showDrawer}>
                Register for a new account
        </a>
            <Drawer
                title="Create a new account"
                onClose={onClose}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
            // placement='top'
            >
                <Form layout="vertical" hideRequiredMark>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Username :">
                                <Input onChange={(e) => username = e.target.value} ></Input>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Password :">
                                <Input.Password onChange={(e) => password = e.target.value} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item label="Comfirm Password :">
                                <Input.Password onChange={(e) => confirm = e.target.value} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <div
                    style={{
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        width: '100%',
                        borderTop: '1px solid #e9e9e9',
                        padding: '10px 16px',
                        background: '#fff',
                        textAlign: 'right',
                    }}
                >
                    <Button onClick={onClose} style={{ marginRight: 8 }}>
                        Cancel
                    </Button>
                    <Button onClick={onCreateAccount} type="primary">
                        Create
                    </Button>
                </div>
            </Drawer>

        </div>
    )

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
mutation($username: String!, $password: String!){
    login(username: $username, password: $password){
      token
    }
}`

export default compose(
    graphql(USER_LOGIN, {
        name: 'loginUser',
        options: props => ({
            variables: {
                username: props.username,
                password: props.password
            }
        })
    }),
    graphql(GET_ALL_USER, {
        name: 'getAllUser'
    })

)(ModalNewAccount)
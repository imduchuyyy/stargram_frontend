import React, { useState } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { useMutation } from '@apollo/react-hooks'
import './index.css'
import { compose } from 'recompose'
import { Drawer, Form, Button, Col, Row, Input, notification } from 'antd';


function ModalNewAccount(props) {

    const CREATE_USER = gql`
    mutation($userInput: CreateUserInput!){
        createUser(input: $userInput){
          _id
          username
          password
          role
          idPosts
        }
      } 
    `

    const [visible, setVisible] = useState(false)
    let username, password, confirm
    const [createUser] = useMutation(CREATE_USER)
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
        } else {
            const userInput = {
                username, 
                password
            }
            createUser({
                variables: {
                    userInput
                }
            }).then(res => {
                if (res.data.createUser) {
                    notification['success']({
                        message: 'Create user success',
                        description:
                            'Please login',
                        placement: 'bottomRight',
                    });
                }
            }).catch(err => {
                console.log(err)
                notification['error']({
                    message: 'Create user fail',
                    description: err[0],
                    placement: 'bottomRight',
                });
            })
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

export default (ModalNewAccount)
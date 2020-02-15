import React, { useState, Component, useEffect } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Icon } from 'antd';

const width = window.innerWidth

function ChangePassword(props) {
    const [childrenDrawer, serChildrenDrawer] = useState(false)
    let currentPassword, newPassword, confirmPassword 

    function openChildrenDrawer() {
        serChildrenDrawer(true)
    }

    function closeChildrenDrawer() {
        serChildrenDrawer(false)
    }

    function onChangePassword() {
        console.log(currentPassword, newPassword, confirmPassword)
    }

    return <Form.Item label="Change Password">
        <Button type="primary" ghost onClick={openChildrenDrawer} style={{ width: "100%" }}>Change Password</Button>
        <Drawer
            title="Change Password"
            width={width > 800 ? width / 3 : width / 1.3}
            onClose={closeChildrenDrawer}
            visible={childrenDrawer}>
            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item label="Current Password">
                        <Input
                            style={{ width: '100%' }}
                            type='password'
                            defaultValue=''
                            placeholder="Please enter your current password"
                            onChange={(e) => {
                                currentPassword = e.target.value
                            }}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item label="New Password">
                        <Input
                            style={{ width: '100%' }}
                            type='password'
                            defaultValue=''
                            placeholder="Please enter your new password"
                            onChange={(e) => {
                                newPassword = e.target.value
                            }}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item label="Confirm New Password">
                        <Input
                            style={{ width: '100%' }}
                            type='password'
                            defaultValue=''
                            placeholder="Please confirm your new password"
                            onChange={(e) => {
                                confirmPassword = e.target.value
                            }}
                        />
                    </Form.Item>
                </Col>
            </Row>

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
                <Button onClick={closeChildrenDrawer} style={{ marginRight: 8 }}>
                    Cancel
            </Button>
                <Button onClick={onChangePassword} type="primary">
                    Submit
            </Button>
            </div>

        </Drawer>
    </Form.Item>
}

export default ChangePassword
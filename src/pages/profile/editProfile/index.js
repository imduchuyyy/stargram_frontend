import React, { useState, Component, useEffect } from 'react'
import gql from 'graphql-tag'
import Loading from './../../../Components/loading'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Icon, notification } from 'antd';
import moment, { months } from 'moment';
import ChangePassword from './changePassword'
import UploadFunction from './../../../Components/uploadImage'

const { Option } = Select
const width = window.innerWidth

function EditProfile(props) {
    const [visible, setVisivle] = useState(false)
    const { dataUser, editUser } = props

    let fullname, username, email, sex, dob, description, avatar

    function edit() {
        editUser(fullname, username, email, sex, dob, description, avatar)
        setVisivle(false)
    }

    function openDrawer() {
        setVisivle(true)
    }

    function closeDrawer() {
        setVisivle(false)
    }

    function disabledDate(current) {
        return current && current > moment().endOf('day');
    }

    function uploadAvatar(param){
        avatar = param
    }

    return <div>
        <Button type="primary" onClick={openDrawer}>
            <Icon type="plus" /> Edit Profile
        </Button>
        <Drawer
            title="Edit Your Profile"
            width={width > 800 ? width / 2 : width / 1.1}
            onClose={closeDrawer}
            visible={visible}
            bodyStyle={{ paddingBottom: 80 }}
        >
            <Form layout="vertical" hideRequiredMark>
                <Row gutter={16}>
                    <Col span={24}>
                    <Form.Item label="Change avatar">
                            <UploadFunction uploadImage={uploadAvatar}></UploadFunction>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Full Name">
                            <Input defaultValue={dataUser.fullname} placeholder="Please enter full name" onChange={(e) => {
                                fullname = e.target.value
                            }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Email">
                            <Input
                                style={{ width: '100%' }}
                                defaultValue={dataUser.email}
                                placeholder="Please enter email"
                                onChange={(e) => {
                                    email = e.target.value
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Username">
                            <Input placeholder="Please enter username"
                                defaultValue={dataUser.username}
                                onChange={(e) => {
                                    username = e.target.value
                                }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Sex">
                            <Select placeholder="Please select an owner" defaultValue={dataUser.sex} onChange={(e) => {
                                sex = e
                            }}>
                                <Option value="male">male</Option>
                                <Option value="female">female</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Day of Birth">
                            <DatePicker
                                style={{ width: '100%' }}
                                // getPopupContainer={trigger => trigger.parentNode}
                                disabledDate={disabledDate}
                                defaultValue={moment(new Date(parseInt(dataUser.dob)))}
                                format='DD/MM/YYYY  '
                                onChange={(e) => {
                                    if (e) dob = e.toDate().getTime()
                                }}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Description">
                            <Input.TextArea defaultValue={dataUser.description} rows={1} placeholder="please enter your description" onChange={(e) => {
                                description = e.target.value
                            }} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <ChangePassword></ChangePassword>
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
                <Button onClick={closeDrawer} style={{ marginRight: 8 }}>
                    Cancel
                </Button>
                <Button onClick={edit} type="primary">
                    Submit
                </Button>
            </div>
        </Drawer>
    </div>
}

export default EditProfile
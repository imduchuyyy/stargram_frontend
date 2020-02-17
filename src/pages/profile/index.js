import React, { useState, Component, useEffect } from 'react'
import gql from 'graphql-tag'
import Loading from './../../Components/loading'
import { PageHeader, Tabs, Button, Statistic, Descriptions, Avatar, notification } from 'antd'
import { useQuery, useMutation } from '@apollo/react-hooks'
import EditProfile from './editProfile'
import moment from 'moment'

const GET_CURRENT_USER = gql`
query{
    me{
    _id
    email
    username
    fullname
    avatar
    followers
    followings
    role
    description
    createAt
    dob
    sex
  }
}
`

const EDIT_USER = gql`
    mutation($input: EditUserInput){
        updateUser(input: $input){
            _id 
        }
    }
`


function profile(props) {

    const { data, loading, error } = useQuery(GET_CURRENT_USER, { fetchPolicy: 'network-only' })
    const [updateUser] = useMutation(EDIT_USER)

    function renderContent(column, dataUser) {
        // let birthDay = new Date(parseInt(dataUser.me.dob))

        console.log(dataUser)
        return (
            <Descriptions size="small" column={column}>
                <Descriptions.Item label="Full name">{dataUser.me.fullname}</Descriptions.Item>
                <Descriptions.Item label="Email">
                    <a>{dataUser.me.email}</a>
                </Descriptions.Item>
                <Descriptions.Item label="Birth Day">{moment(new Date(parseInt(dataUser.me.dob))).format("MMM Do YYYY")}</Descriptions.Item>
                <Descriptions.Item label="Sex">{dataUser.me.sex}</Descriptions.Item>
                <Descriptions.Item label="Description">
                    {dataUser.me.description}
                </Descriptions.Item>
            </Descriptions>
        );
    }

    function editUser(fullname, username, email, sex, dob, description) {
        const input = {
            fullname,
            username,
            email,
            sex,
            dob: dob ? dob.toString() : null,
            description
        }
        updateUser({
            variables: {
                input: input
            },
            refetchQueries: () => [
                {
                    query: GET_CURRENT_USER
                }
            ]
        }).then(res => {
            if (res.data.updateUser) {
                notification['success']({
                    message: 'Update success',
                    description:
                        '',
                    placement: 'bottomRight',
                });
            }
        }).catch(err => {
            const message = err.message.slice(err.message.indexOf(':') + 2, err.message.length)
            notification['error']({
                message: 'Update fail',
                description: message,
                placement: 'bottomRight',
            });
        })
    }


    function extraContent(dataUser) {
        return (
            <div
                style={{
                    display: 'flex',
                    width: 'max-content',
                    justifyContent: 'flex-end',
                }}
            >
                <Statistic
                    title="Role"
                    value={dataUser.me.role}
                    style={{
                        marginRight: 32,
                    }}
                />
                <Statistic title="Active Time" prefix="" value="1 day" />
            </div>
        )
    }

    function Content({ children, extra }) {
        return (
            <div className="content">
                <div className="main">{children}</div>
                <div className="extra">{extra}</div>
            </div>
        );
    };

    if (loading || error) {
        return <Loading></Loading>
    } else {
        return (
            <div>
                <PageHeader
                    style={{
                        border: '1px solid rgb(235, 237, 240)',
                    }}
                    // onBack={() => window.history.back()}s
                    // title={<Avatar size={80} src={data.me.avatar}></Avatar>}
                    avatar={{ src: data.me.avatar, size: 60 }}
                    title={<p className="username">{data.me.username}</p>}
                    extra={<EditProfile editUser={editUser} dataUser={data.me}></EditProfile>}
                // footer={
                //     <Tabs tabPosition="top" defaultActiveKey="1">
                //         <TabPane tab="Details" key="1" />
                //         <TabPane tab="Rule" key="2" />
                //     </Tabs>
                // }
                >
                    <Content extra={extraContent(data)}>{renderContent(2, data)}</Content>
                </PageHeader>

            </div>
        )
    }
}
export default profile
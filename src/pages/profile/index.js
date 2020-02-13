import React, { useState, Component, useEffect } from 'react'
import gql from 'graphql-tag'
import Loading from './../../Components/loading'
import { PageHeader, Tabs, Button, Statistic, Descriptions, Avatar } from 'antd'
import { useQuery, useMutation } from '@apollo/react-hooks'

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
  }
}
`

const { TabPane } = Tabs;


function profile(props) {

    const { data, loading, error } = useQuery(GET_CURRENT_USER)

    function renderContent(column, dataUser) {
        let birthDay = new Date(parseInt(dataUser.me.dob))

        console.log(dataUser)
        return (
            <Descriptions size="small" column={column}>
                <Descriptions.Item label="Full name">{dataUser.me.fullname}</Descriptions.Item>
                <Descriptions.Item label="Email">
                    <a>{dataUser.me.email}</a>
                </Descriptions.Item>
        <Descriptions.Item label="Birth Day">{`${birthDay.getDay()} - ${birthDay.getMonth()} - ${birthDay.getFullYear()}`}</Descriptions.Item>
                <Descriptions.Item label="Effective Time">infinity</Descriptions.Item>
                <Descriptions.Item label="Description">
                    {dataUser.me.description}
              </Descriptions.Item>
            </Descriptions>
        );
    }


    function extraContent(dataUser){
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


    console.log(data)
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
                    extra={[
                        <Button key="3">Edit Profile</Button>,
                    ]}
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
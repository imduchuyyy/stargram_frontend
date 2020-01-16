import React from 'react'
import { Layout } from 'antd';
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { compose } from 'recompose';
import Loading from './../../Components/loading'
import { Avatar, Carousel } from 'antd'
import Post from './post'
import ModelPost from './modelPost'

function home(props) {
    const dataUser = props.getAllUser
    const { Header, Sider, Content } = Layout;
    const { loading, error, getAllUser } = dataUser
    let data
    if (loading || error) {
        data = <Loading></Loading>
    } else {
        data = getAllUser.map(user => {
                return <p className="username">{user.username}</p>
        })
    }
    return (
        <Layout >
            <Layout style={{ padding: 5 }}>
                <Content>
                    <ModelPost></ModelPost>
                    <Post></Post>
                </Content>
            </Layout>
        </Layout>
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
export default compose(
    graphql(GET_ALL_USER, {
        name: 'getAllUser'
    })
)(home)
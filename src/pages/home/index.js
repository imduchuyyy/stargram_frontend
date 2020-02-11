import React, { useState, Component, useEffect } from 'react'
import { Layout } from 'antd';
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { compose } from 'recompose';
import Loading from './../../Components/loading'
import { Avatar, Carousel } from 'antd'
import Post from './post'
import ModelPost from './modelPost'

function home(props) {
    const { Header, Sider, Content } = Layout;

    const [newpost, setNew] = useState(false)
    console.log(newpost)
    
    return (
        <Layout >
            <Layout style={{ padding: 5, marginTop: 30 }}>
                <Content>
                    <ModelPost setNew={setNew}></ModelPost>
                    <Post></Post>
                </Content>
            </Layout>
        </Layout>
    )
}
export default (home)
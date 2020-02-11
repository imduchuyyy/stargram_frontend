import React, { useState, Component, useEffect } from 'react'
import { Layout } from 'antd';
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { compose } from 'recompose';
import Loading from './../../Components/loading'
import { Avatar, Carousel } from 'antd'
import Post from './post'
import ModelPost from './modelPost'
import { useQuery, useMutation } from '@apollo/react-hooks'

const GET_ALL_POST = gql`
    query{
        getAllPost{
            description
            thumbnails
            likes{
            _id
            email
            username
            role
            }
            creator{
            _id
            email
            username
            role
            }
            comments{
                _id
                creator{
                    _id
                    username
                    email
                    role
                }
                commentAt
                description
            }
            createAt
        }
    }
    `

function home(props) {
    const { Header, Sider, Content } = Layout;
    let [dataPost, setDataPost] = useState([])
    const { data, loading, error } = useQuery(GET_ALL_POST)
    if (!loading) {
        dataPost = data.getAllPost
    }
    return (
        <Layout >
            <Layout style={{ padding: 5, marginTop: 30 }}>
                <Content>
                    <ModelPost data={dataPost} setData={setDataPost}></ModelPost>
                    <Post data={dataPost}></Post>
                </Content>
            </Layout>
        </Layout>
    )
}
export default (home)
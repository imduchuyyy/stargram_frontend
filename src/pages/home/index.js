import React, { useState, Component, useEffect } from 'react'
import { Layout, Skeleton } from 'antd';
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { compose } from 'recompose';
import Loading from './../../Components/loading'
import { Avatar, Carousel, notification } from 'antd'
import Post from './post'
import ModelPost from './modelPost'
import { useQuery, useMutation } from '@apollo/react-hooks'

const GET_ALL_POST = gql`
    query{
        getAllPost{
            post{
                _id
                description
                likes
                createAt
                thumbnails
            }
            creator{
                _id
                username
                avatar
                description
                sex
                fullname
                isOnline
                followers
                followings
                dob
                email
            }
        }
    }
    `

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
    sex
  }
}
`

const POST_NEW = gql`
mutation($input: AddPostInput!){
    createPost(input: $input){
        post{
                _id
                description
                likes
                createAt
                thumbnails
            }
            creator{
                _id
                username
                avatar
                description
                sex
                fullname
                isOnline
                followers
                followings
                dob
                email
            }
    }
}
`

function home(props) {
    const { Content } = Layout;
    const { data: dataCurrentUser, loading: LoadingCurrentUser, error: ErrorCurrentUser } = useQuery(GET_CURRENT_USER, { fetchPolicy: 'network-only' })

    const { data, loading, error } = useQuery(GET_ALL_POST, { fetchPolicy: 'network-only' })
    const [createPost] = useMutation(POST_NEW)

    function handleCreatePost(prams) {
        const { description, urlImage } = prams
        if (description) {
            createPost({
                variables: {
                    input: {
                        description: description,
                        thumbnails: [urlImage]
                    }
                },
                refetchQueries: () => [
                    {
                        query: GET_ALL_POST
                    }
                ]
            }).then(res => {
                if (res.data.createPost) {
                    notification['success']({
                        message: 'Post success',
                        description:
                            '',
                        placement: 'bottomRight',
                    });
                }
            }).catch(err => {
                notification['error']({
                    message: 'Post fail',
                    description:
                        '',
                    placement: 'bottomRight',
                });
                console.log(err)
            })
        }

    }

    if (!loading && !error && !LoadingCurrentUser && !ErrorCurrentUser) {
        return (
            <Layout >
                <Layout style={{ padding: 5, marginTop: 30 }}>
                    <Content>
                        <ModelPost createPost={handleCreatePost}></ModelPost>
                        <Post data={data.getAllPost} currentUser={dataCurrentUser.me}></Post>
                    </Content>
                </Layout>
            </Layout>
        )
    } else {
        return <Loading></Loading>
    }


}
export default (home)
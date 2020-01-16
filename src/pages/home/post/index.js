import React, { useState } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { compose } from 'recompose';
import { useQuery } from '@apollo/react-hooks'
import Loading from './../../../Components/loading'
import { Form, Row, Col, Input, Button, Icon, Modal, Card, Meta, Avatar, Comment, Tooltip } from 'antd';
import ModelPost from './../modelPost'

function Post(props) {
    const GET_ALL_POST = gql`
    query{
        getAllPost{
            _id
            title
            des
            idCreator
            like
            dislike
        }
    }
    `
    const GET_USER_BY_ID = gql`
    query($id: [String]!){
        getUserById(id: $id){
            _id
            username
        }
    }
    `

    const [action, setAction] = useState(null)
    const { loading, error, data } = useQuery(GET_ALL_POST)
    let user = []
    let idUser = []
    let post = []
    if (!loading && !error) {
        for (let index = 0; index < data.getAllPost.length; index++) {
            idUser.push(data.getAllPost[index].idCreator)
        }
    }
    const userByPost = useQuery(GET_USER_BY_ID, {
        variables: {
            id: idUser
        }
    })
    if (!userByPost.loading && !userByPost.error && !loading && !error) {
        user = userByPost.data.getUserById
        for (let index = 0; index < data.getAllPost.length; index++) {
            data.getAllPost[index].username = userByPost.data.getUserById[index].username          
        }
    }
    if (loading || error) {
        post = <Card style={{ width: '100%', marginTop: 16 }} loading={true}></Card>
    } else {
        for (let index = 0; index < data.getAllPost.length; index++) {
            post.push(<Comment
                key={data.getAllPost[index]._id}
                actions={[
                    <span key="comment-basic-like">
                        <Tooltip title="Like">
                            <Icon
                                type="like"
                                theme={action === 'liked' ? 'filled' : 'outlined'}
                                onClick={like}
                            />
                        </Tooltip>
                        <span style={{ paddingLeft: 8, cursor: 'auto' }}>{data.getAllPost[index].like}</span>
                    </span>,
                    <span key=' key="comment-basic-dislike"'>
                        <Tooltip title="Dislike">
                            <Icon
                                type="dislike"
                                theme={action === 'disliked' ? 'filled' : 'outlined'}
                                onClick={dislike}
                            />
                        </Tooltip>
                        <span style={{ paddingLeft: 8, cursor: 'auto' }}>{data.getAllPost[index].dislike}</span>
                    </span>,
                    <span key="comment-basic-reply-to">Reply to</span>,
                ]}
                author={<a>{data.getAllPost[index].username}</a>}
                avatar={
                    <Avatar
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        alt={data.getAllPost[index].username}
                    />
                }
                content={
                    <p>
                        {data.getAllPost[index].des}
                    </p>
                }
            />)
        }
    }

    function like() {
        setAction('like')
    }

    function dislike() {
        setAction('dislike')
    }

    return (
        <div>
            {post}
        </div>
    )
}

export default (Post)
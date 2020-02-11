import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Form, Row, Col, Input, Button, Icon, Modal, Card, Avatar, Comment, Tooltip } from 'antd';
import ModelPost from './../modelPost'
import './index.css'

const { Meta } = Card;
const LIKE_POST = gql`
mutation($idPost: String!){
    likePost(idPost: $idPost){
        like
    }
}
`

const DISLIKE_POST = gql`
mutation($idPost: String!){
    disLikePost(idPost: $idPost){
        dislike
    }
}
`

function Post(props) {


    let post = []

    const [action, setAction] = useState(null)
    const { data } = props
    const [likePost] = useMutation(LIKE_POST)
    const [dislikePost] = useMutation(DISLIKE_POST)

    for (let index = 0; index < data.length; index++) {
        post.push(<Card
            className="post"
            key={data[index]._id}
            style={{ width: "100%" }}
            cover={
                <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
            }
            actions={[
                <Icon type="like" key="like" />,
                <Icon type="edit" key="edit" />,
                <Icon type="ellipsis" key="ellipsis" />,
            ]}
        >
            <Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={data[index].creator.username}
                description={data[index].description}
            />
            {/* <Comment
                    actions={[
                        <span key="comment-basic-like">
                            <Tooltip title="Like">
                                <Icon
                                    type="like"
                                    theme={action === 'liked' ? 'filled' : 'outlined'}
                                    onClick={() => { like(data.getAllPost[index]._id) }}
                                />
                            </Tooltip>
                            <span style={{ paddingLeft: 8, cursor: 'auto' }}>{data.getAllPost[index].like}</span>
                        </span>,
                        <span key=' key="comment-basic-dislike"'>
                            <Tooltip title="Dislike">
                                <Icon
                                    type="dislike"
                                    theme={action === 'disliked' ? 'filled' : 'outlined'}
                                    onClick={() => { dislike(data.getAllPost[index]._id) }}
                                />
                            </Tooltip>
                            <span style={{ paddingLeft: 8, cursor: 'auto' }}>{data.getAllPost[index].dislike}</span>
                        </span>,
                        <span key="comment-basic-reply-to">Reply to</span>,
                    ]}
                    author={<a>{data.getAllPost[index]}</a>}
                    avatar={
                        <Avatar
                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            alt={data.getAllPost[index].creator.username}
                        />
                    }
                    content={
                        <p>
                            {data.getAllPost[index].description}
                        </p>
                    }
                /> */}
        </Card>)
    }


function like(idPost) {
    setAction('like')
    likePost({
        variables: {
            idPost
        },
        refetchQueries: () => [
            {
                query: GET_ALL_POST
            }
        ]
    }).catch(err => {
        console.log(err)
    })
}

function dislike(idPost) {
    setAction('dislike')
    dislikePost({
        variables: {
            idPost
        },
        refetchQueries: () => [
            {
                query: GET_ALL_POST
            }
        ]
    }).catch(err => {
        console.log(err)
    })
}

return (
    <div>
        {post}
    </div>
)
}

export default (Post)
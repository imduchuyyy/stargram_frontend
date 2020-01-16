import React, { useState } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { compose } from 'recompose';
import Loading from './../../../Components/loading'
import { Form, Row, Col, Input, Button, Icon, Modal, Card, Meta, Avatar, Comment, Tooltip } from 'antd';
import ModelPost from './../modelPost'

function Post(props) {
    const [action, setAction] = useState(null)
    const { loading, error, getAllPost } = props.getAllPost
    let post
    if (loading || error) {
        post = <Card style={{ width: '100%', marginTop: 16 }} loading={true}></Card>
    } else {
        console.log(getAllPost)
        post = getAllPost.map(post => {
            return <Comment
                actions={[
                    <span key="comment-basic-like">
                        <Tooltip title="Like">
                            <Icon
                                type="like"
                                theme={action === 'liked' ? 'filled' : 'outlined'}
                                onClick={like}
                            />
                        </Tooltip>
                        <span style={{ paddingLeft: 8, cursor: 'auto' }}>{post.like}</span>
                    </span>,
                    <span key=' key="comment-basic-dislike"'>
                        <Tooltip title="Dislike">
                            <Icon
                                type="dislike"
                                theme={action === 'disliked' ? 'filled' : 'outlined'}
                                onClick={dislike}
                            />
                        </Tooltip>
                        <span style={{ paddingLeft: 8, cursor: 'auto' }}>{post.dislike}</span>
                    </span>,
                    <span key="comment-basic-reply-to">Reply to</span>,
                ]}
                author={<a>Han Solo</a>}
                avatar={
                    <Avatar
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        alt="Han Solo"
                    />
                }
                content={
                    <p>
                        {post.des}
                    </p>
                }
                datetime={
                    <Tooltip>
                        <span></span>
                    </Tooltip>
                }
            />
        })
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
export default compose(
    graphql(GET_ALL_POST, {
        name: 'getAllPost'
    })
)(Post)
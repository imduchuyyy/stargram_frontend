import React, { useState } from 'react'
import { Form, Row, Col, Input, Button, Icon, Modal, Card, Avatar, Comment, Tooltip } from 'antd';
import './index.css'
import Like from './like'
import Loading from './../../../Components/loading'

const { Meta } = Card;

function Post(props) {
    let post = []
    const { currentUser } = props
    const [action, setAction] = useState(null)
    const { data } = props

    for (let index = 0; index < data.length; index++) {
        post.push(<Card
            className="post"
            key={data[index]._id}
            style={{ width: "100%", float:'center' }}
            cover={
                <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
            }
            actions={[
                <Like data={data} currentUser={currentUser} index={index}></Like>,
                <p><Icon type="edit" key="edit" /> Comment</p>,
                <p><Icon type="ellipsis" key="ellipsis" /></p>,
            ]}
        >
            <Meta
                avatar={<Avatar src={data[index].creator.avatar} />}
                title={<a>{data[index].creator.username}</a>}
                description={data[index].description}
            />
            {/* {data[index].comments ? <Comment
                    actions={[
                        <span key="comment-basic-like">
                            <Tooltip title="Like">
                                <Icon
                                    type="like"
                                    theme={action === 'liked' ? 'filled' : 'outlined'}
                                    // onClick={() => { like(data.[index]._id) }}
                                />
                            </Tooltip>
                            <span style={{ paddingLeft: 8, cursor: 'auto' }}>{data[index].like}</span>
                        </span>,
                        <span key=' key="comment-basic-dislike"'>
                            <Tooltip title="Dislike">
                                <Icon
                                    type="dislike"
                                    theme={action === 'disliked' ? 'filled' : 'outlined'}
                                    // onClick={() => { dislike(data.getAllPost[index]._id) }}
                                />
                            </Tooltip>
                            <span style={{ paddingLeft: 8, cursor: 'auto' }}>{data[index].dislike}</span>
                        </span>,
                        <span key="comment-basic-reply-to">Reply to</span>,
                    ]}
                    author={<a>{data[index]}</a>}
                    avatar={
                        <Avatar
                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            alt={data[index].creator.username}
                        />
                    }
                    content={
                        <p>
                            {data[index].description}
                        </p>
                    }
                />: ''} */}

        </Card>)
    }

    return (
        <div>
            {post}
        </div>
    )
}

export default (Post)
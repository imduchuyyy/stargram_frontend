import React, { useState } from 'react'
import gql from 'graphql-tag'
import { graphql, Query } from 'react-apollo'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { compose } from 'recompose';
import Loading from './../../../Components/loading'
import { Form, Row, Col, Input, Button, Icon, Modal, notification } from 'antd';
import { useHistory, useLocation } from "react-router-dom";

const POST_NEW = gql`
    mutation($input: AddPostInput!){
        createPost(input: $input){
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

let description

function ModelPost(props) {
    const [isShown, setShow] = useState(false)
    const [createPost] = useMutation(POST_NEW)

    async function postNew() {
        if (description) {
            await createPost({
                variables: {
                    input: {
                        description: description,
                        thumbnails: []
                    }
                }
            }).then(res => {
                if (res.data.createPost) {
                    notification['success']({
                        message: 'Post success',
                        description:
                            '',
                        placement: 'bottomRight',
                    });
                }
                props.setData(props.data.push(res.data.createPost))   
                setShow(false)
            }).catch(err => {
                notification['error']({
                    message: 'Post fail',
                    description:
                        '',
                    placement: 'bottomRight',
                });
                console.log(err)
                setShow(false)
            })
        }
    }



    return <div>
        <Modal
            title="What are you thinking today"
            // style={{ marginTop: 20 }}
            visible={isShown}
            onOk={postNew}
            onCancel={() => setShow(false)}
        >
            <Form layout="vertical" hideRequiredMark>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item label="Post description  :">
                            <Input onChange={(e) => description = e.target.value} ></Input>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
        <Button height={30} icon="edit" onClick={() => setShow(true)}>
            Post new
            </Button>
    </div>
}


export default (ModelPost)
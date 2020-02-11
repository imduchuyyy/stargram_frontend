import React, { useState } from 'react'
import gql from 'graphql-tag'
import { graphql, Query } from 'react-apollo'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { compose } from 'recompose';
import Loading from './../../../Components/loading'
import { Form, Row, Col, Input, Button, Icon, Modal, notification } from 'antd';
import { useHistory, useLocation } from "react-router-dom";

function ModelPost(props) {
    const POST_NEW = gql`
    mutation($input: AddPostInput!){
        createPost(input: $input){
          _id
        }
      }
    `
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
    const location = useLocation()
    const history = useHistory()
    const [isShown, setShow] = useState(false)
    const [createPost] = useMutation(POST_NEW)
    let description

    async function postNew() {
        if (description) {
            await createPost({
                variables: {
                    input: {
                        description: description,
                        thumbnails: []
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
                props.setNew(true)
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
        // history.push(location.pathname)
        // props.rerenderParentCallback()
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
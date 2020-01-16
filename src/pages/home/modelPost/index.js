import React, { useState } from 'react'
import gql from 'graphql-tag'
import { graphql, Query } from 'react-apollo'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { compose } from 'recompose';
import Loading from './../../../Components/loading'
import { Form, Row, Col, Input, Button, Icon, Modal, notification } from 'antd';

function ModelPost(props) {
    const GET_USER_BY_POST = gql`
    query($id: String!){
    getUserByPost(idPost: $id){
        username
        password
        role
        idPosts
    }
    }
    `
    const POST_NEW = gql`
    mutation($idCreator: String! ,$postInput: String!){
        createPost(idCreator: $idCreator, post: $postInput){
          _id
        }
      }
    `
    const GET_CURRENT_USER = gql`
    query($token: String!){
        me(token: $token){
            username
            _id
        }
    }
    `
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

    const [isShown, setShow] = useState(false)
    const token = localStorage.getItem('token')
    const { loading, error, data } = useQuery(GET_CURRENT_USER, {
        variables: {
            token
        }
    })
    const [addPost] = useMutation(POST_NEW)
    let postDes
    if (!loading && !error) {
        // console.log(data.me)
    }
    function postNew() {
        if (postDes) {
            addPost({
                variables: {
                    idCreator: data.me._id,
                    postInput: postDes
                },
                refetchQueries: () => [
                    {
                        query: GET_ALL_POST
                    }
                ]
            }).then(res => {
                if (res.data) {
                    notification['success']({
                        message: 'Post success',
                        description:
                            '',
                        placement: 'bottomRight',
                    });
                }
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
                            <Input onChange={(e) => postDes = e.target.value} ></Input>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
        <Button height={30}  icon="edit" onClick={() => setShow(true)}>
            Post new
            </Button>
    </div>
}


export default (ModelPost)
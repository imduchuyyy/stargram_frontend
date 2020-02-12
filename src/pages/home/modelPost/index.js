import React, { useState } from 'react'
import gql from 'graphql-tag'
import { graphql, Query } from 'react-apollo'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { compose } from 'recompose';
import Loading from './../../../Components/loading'
import { Form, Row, Col, Input, Button, Icon, Modal, notification } from 'antd';

let description

function ModelPost(props) {
    const [isShown, setShow] = useState(false)

    function postNew() {
        props.createPost({ description })
        setShow(false)

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
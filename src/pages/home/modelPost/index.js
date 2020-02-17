import React, { useState } from 'react' 
import { Form, Row, Col, Input, Button, Icon, Modal, notification, Upload } from 'antd';
import UploadFunction from './../../../Components/uploadImage'

let description 

function ModelPost(props) {
    const [isShown, setShow] = useState(false)
    const [urlImage, setUrlImage] = useState('')

    function postNew() {
        props.createPost({ description, urlImage })
        setShow(false)
    }

    function handleUploadImage(params){
        setUrlImage(params)
    }

    return <div>
        <Modal
            title="What are you thinking today"
            // style={{ margin: 20 }}
            visible={isShown}
            onOk={postNew}
            onCancel={() => setShow(false)}
        >
            <Form layout="vertical" hideRequiredMark>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item  label="Post description  :">
                            <Input onChange={(e) => description = e.target.value} ></Input>
                            <div className="uploadImage">
                                <UploadFunction  uploadImage={handleUploadImage}></UploadFunction>
                            </div>
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
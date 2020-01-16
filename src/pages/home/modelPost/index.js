import React, { useState } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { compose } from 'recompose';
import Loading from './../../../Components/loading'
import { SideSheet, Paragraph } from 'evergreen-ui'
import { Form, Row, Col, Input, Button, Icon, Modal } from 'antd';

function ModelPost(props) {
    const [isShown, setShow] = useState(false)
    console.log(props)

    return <div>
        <Modal
            title="20px to Top"
            style={{ top: 20 }}
            visible={isShown}
            onOk={() => setShow(false)}
            onCancel={() => setShow(false)}
        >
            <p>some contents...</p>
            <p>some contents...</p>
            <p>some contents...</p>
        </Modal>
        <Button height={30} margin={16} icon="edit" onClick={() => setShow(true)}>
            Post new
            </Button>
    </div>
}

const GET_USER_BY_POST = gql`
query{
  getUserByPost(idPost: $id){
    username
    password
    role
    idPosts
  }
}
`

export default compose(
    graphql(GET_USER_BY_POST, {
        name: 'getUserByPost',
        options: props => ({
            variables: {
                idPost: props.idPost
            },
            fetchPolicy: 'network-only'
        })
    })
)(ModelPost)
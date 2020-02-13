import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { Icon } from 'antd';
import './../index.css'

const TOGGLE_LIKE = gql`
mutation($idPost: String!){
    toggleLikePost(idPost:$idPost)
}
`

function Like(props) {
    const { data, index, currentUser } = props
    const [state, setState] = useState(false)
    const [likePost, { loading }] = useMutation(TOGGLE_LIKE)
    let liked = false

    for (var i = 0; i < data[index].likes.length; i++) {
        if (data[index].likes[i]._id === currentUser._id) {
            liked = true
            break
        }
    }

    function toggleLike() {
        likePost({
            variables: {
                idPost: data[index]._id
            }
        }).then(res => {
            if (res.data.toggleLikePost) {
                data[index].likes.push(currentUser)
                liked = true
            } else {
                const indexLike = data[index].likes.indexOf(currentUser)
                data[index].likes.splice(indexLike, 1)
                liked = false
            }
            setState(true)
        }).catch(err => console.log(err))
        setState(false)
    }


    if (!loading) {
        return <p onClick={toggleLike} className={liked ? 'liked' : ''}><Icon type="like" key="like" /> {data[index].likes.length}</p>
    } else {
        return <Icon type="like" key="like" />
    }
}

export default Like
import React from 'react'
import { Popconfirm, notification, Menu, Icon } from 'antd'

function Logout(props) {
    console.log(props)
    function openNotification() {
        notification['success']({
            message: 'Logout success',
            description:
                '',
            placement: 'bottomRight',
        });
    };
    function confirm() {
        window.localStorage.clear()
        props.context(false)
        openNotification()
    }
    return (
        <Icon type="logout" onClick={confirm}></Icon>
    )
}
export default Logout
import React, { useState } from 'react'
import { Form } from 'antd'
import registerFrom from './registerFrom'

function register(props){
    const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(registerFrom);
    return <WrappedNormalLoginForm  className="formLogin" ></WrappedNormalLoginForm>
}


export default register
import React, { useState } from 'react'
import { Form } from 'antd'
import FormLogin from './formLogin'
import { UserConsumer } from '../../configs/context';

function login() {
    const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(FormLogin);
    return <UserConsumer>
         {(context) => <WrappedNormalLoginForm context = {context} className="formLogin" ></WrappedNormalLoginForm>}
        </UserConsumer>
}

export default login
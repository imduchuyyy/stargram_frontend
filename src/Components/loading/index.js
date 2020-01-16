import React from 'react'
import './index.css'
import { Pane, Spinner } from 'evergreen-ui'

export default function loading() {
    return (
        <Pane display="flex" alignItems="center" justifyContent="center" height={400}>
            <Spinner />
        </Pane>
    )
}
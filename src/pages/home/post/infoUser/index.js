import React, { useState } from 'react'
import { Form, Row, Col, Input, Button, Icon, Modal, Card, Avatar, Comment, Tooltip, Skeleton, Drawer } from 'antd';

const width = window.innerWidth

const DescriptionItem = ({ title, content }) => (
    <div
        style={{
            fontSize: 14,
            lineHeight: '22px',
            marginBottom: 7,
            color: 'rgba(0,0,0,0.65)',
        }}
    >
        <p
            style={{
                marginRight: 8,
                display: 'inline-block',
                color: 'rgba(0,0,0,0.85)',
            }}
        >
            {title}
      </p>
        {content}
    </div>
);

function InfoUser(props) {
    const { creator } = props
    const [visible, setVisible] = useState(false)

    function showDrawer() {
        setVisible(true)
    }

    function closeDrawer() {
        setVisible(false)
    }

    return <div>
        <a onClick={showDrawer}>{creator.username}</a>
        <Drawer
            onClose={closeDrawer}
            width={width > 800 ? width / 3 : width / 1.1}
            title={creator.username}
            visible={visible}
        >
            <Row gutter={16}>
                <Col span={12}>
                    <DescriptionItem title="Username: " content={creator.username} />
                </Col>
                <Col span={12}>
                    <DescriptionItem title="Sex: " content={creator.sex} />
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={24}>
                    <DescriptionItem title="Description: " content={creator.description} />
                </Col>
            </Row>


        </Drawer>
    </div>
}

export default InfoUser
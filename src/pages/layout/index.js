import React, { Suspense, useState } from 'react'
import Logout from './logout'
import { UserConsumer } from './../../configs/context'
import { routes } from './../../configs'
import { Layout, Menu, Icon, Breadcrumb, Input, AutoComplete, Badge, Card, Typography, Alert } from 'antd'
// import Sider from 'antd/lib/layout/Sider'
import './index.css'

function LayoutDesign(props) {
    const { Header, Content, Footer } = Layout
    const { Sider } = Layout;
    const { Search } = Input
    const { history } = props.children.props
    let indexPage
    for (let index = 0; index < routes.length; index++) {
        if (routes[index].label == props.children.props.label) {
            indexPage = index
            break
        }
    }
    const [collapsed, setCollapsed] = useState(false)

    const height = window.innerHeight
    const width = window.innerWidth

    function toggle() {
        setCollapsed(!collapsed)
    }

    return (
        <Layout
            style={{ height: `${height}px` }}
        >
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={broken => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <div className="logo"
                    style={{
                        height: "32px",
                        background: "rgba(255, 255, 255, 0.2)",
                        margin: "16px"
                    }}
                >
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={[indexPage.toString()]} >
                    <Menu.Item key="0" onClick={() => history.push('/')}>
                        <Icon type="home" />
                        <span className="nav-text">Home</span>
                    </Menu.Item>
                    <Menu.Item key="1" onClick={() => history.push('/profile')}>
                        <Icon type="user" />
                        <span className="nav-text">User Profile</span>
                    </Menu.Item>
                    <Menu.Item key="2" onClick={() => history.push('/message')}>
                        <Badge dot={true}>
                            <Icon type="message" />
                            <span className="nav-text">Message</span>

                        </Badge>
                    </Menu.Item>
                    <Menu.Item key="3" onClick={() => history.push('/notification')}>
                        <Badge dot={true}>
                            <Icon type="notification" />
                            <span className="nav-text">Notification</span>
                        </Badge>
                    </Menu.Item>
                    <Menu.Item key="4" onClick={() => history.push('/friend')}>
                        <Icon type="team" />
                        <span className="nav-text">Friend</span>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ background: '#fff', padding: 0 }}>
                    <AutoComplete
                        placeholder="input search text"
                        onSearch={value => console.log(value)}
                        style={{
                            width: (width < 500) ? '60%' : '20%',
                            margin: '10px 10px 10px 20%',
                            float: 'center'
                        }}
                    >
                        <Input suffix={<Icon type="search" />} />
                    </AutoComplete>
                    <div style={{
                        float: 'right',
                        marginRight: '20px',
                        fontSize:"20px"
                    }}
                    > 
                        <UserConsumer>
                            {(context) => <Logout context={context}  ></Logout>}
                        </UserConsumer>
                    </div>
                    
                    
                </Header>
                <Content style={{ margin: '24px 16px 0' }}>
                    <div style={{ padding: 24, background: '#fff', minHeight: "100%" }}>{props.children}</div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>BuiDucHuy ©2020 </Footer>
            </Layout>
        </Layout>
    )
}
export default LayoutDesign
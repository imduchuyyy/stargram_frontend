import React from 'react'
import Logout from './logout'
import { UserConsumer } from './../../configs/context'
import { routes } from './../../configs'
import { Layout, Menu, Icon, Breadcrumb, Input, AutoComplete, Badge } from 'antd'


function LayoutDesign(props) {
    const { Header, Content, Footer } = Layout
    const { Search } = Input
    const { history } = props.children.props
    let indexPage
    for (let index = 0; index < routes.length; index++) {
        if (routes[index].label == props.children.props.label) {
            indexPage = index
            break
        }
    }
    return (
        <Layout>
            <Menu style={{ position: 'fixed', width: '100%', overflow: '1', zIndex: 1 }} theme="light" mode="horizontal" defaultSelectedKeys={[indexPage.toString()]}>
                <Menu.Item key="0" style={{ marginLeft: '10%' }} onClick={() => history.push('/')}>
                    <Icon type="home" />
                    <span className="nav-text">Home</span>
                </Menu.Item>
                <Menu.Item style={{ marginLeft: '20%' }}>
                    <AutoComplete
                        placeholder="input search text"
                        onSearch={value => console.log(value)}
                        style={{ width: '100%' }}
                    >
                        <Input suffix={<Icon type="search" />} />
                    </AutoComplete>
                </Menu.Item>
                <Menu.Item style={{ float: 'right' }} >
                    <UserConsumer>
                        {(context) => <Logout context={context}  ></Logout>}
                    </UserConsumer>
                </Menu.Item>
                <Menu.Item style={{ float: 'right', marginRight: '5%' }} key="3" onClick={() => history.push('/notification')}>
                    <Badge dot={true}>
                        <Icon type="notification" />
                    </Badge>
                </Menu.Item>
                <Menu.Item style={{ float: 'right' }} key="2" onClick={() => history.push('/message')}>
                    <Badge dot={true}>
                        <Icon type="message" />
                    </Badge>
                </Menu.Item>
                <Menu.Item style={{ float: 'right' }} key="4" onClick={() => history.push('/friend')}>
                    <Icon type="team" />
                </Menu.Item>
                <Menu.Item style={{ float: 'right' }} key="1" onClick={() => history.push('/profile')}>
                    <Icon type="user" />
                </Menu.Item>
            </Menu>
            <Layout style={{ background: '#f1f1f1' }}>
                <Content style={{ margin: '60px 15% 0' }}>
                    {props.children}
                </Content>
                <Footer style={{ textAlign: 'center', position: 'fixed', bottom: 0, color: 'black', width: '100%' }}>Bùi Đức Huy@2019</Footer>
            </Layout>
        </Layout>
    )
}
export default LayoutDesign
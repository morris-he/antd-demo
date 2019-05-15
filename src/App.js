import React, {Component} from 'react';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import Home from './views/Home'
import Advertisement from './views/Advertisement'

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            tabbar: '1',
        }
    }
    componentDidMount(){
        console.log(this.props.location)
    }
    render() {
        return (
            <div className="App">
                <Router>
                    <Layout>
                        <Header className="header">
                            <div className="logo"/>
                            <Menu
                                theme="dark"
                                mode="horizontal"
                                defaultSelectedKeys={[this.state.tabbar]}
                                style={{lineHeight: '64px'}}
                            >
                                <Menu.Item key="1">nav 1</Menu.Item>
                                <Menu.Item key="2">nav 2</Menu.Item>
                                <Menu.Item key="3">nav 3</Menu.Item>
                            </Menu>
                        </Header>
                        <Layout>
                            <Sider width={200} style={{background: '#fff'}}>
                                <Menu
                                    mode="inline"
                                    defaultSelectedKeys={[this.state.tabbar]}
                                    defaultOpenKeys={['sub1']}
                                    style={{height: '100%', borderRight: 0}}
                                >
                                    <SubMenu key="sub1" title={<span><Icon type="user"/>subnav 1</span>}>
                                        <Menu.Item key="1">
                                            <Link to='/'>首页</Link>
                                        </Menu.Item>
                                        <Menu.Item key="2">
                                            <Link to='/advertisement_nodes'>广告</Link>
                                        </Menu.Item>
                                        <Menu.Item key="3">option3</Menu.Item>
                                        <Menu.Item key="4">option4</Menu.Item>
                                    </SubMenu>
                                    <SubMenu key="sub2" title={<span><Icon type="laptop"/>subnav 2</span>}>
                                        <Menu.Item key="5">option5</Menu.Item>
                                        <Menu.Item key="6">option6</Menu.Item>
                                        <Menu.Item key="7">option7</Menu.Item>
                                        <Menu.Item key="8">option8</Menu.Item>
                                    </SubMenu>
                                    <SubMenu key="sub3" title={<span><Icon type="notification"/>subnav 3</span>}>
                                        <Menu.Item key="9">option9</Menu.Item>
                                        <Menu.Item key="10">option10</Menu.Item>
                                        <Menu.Item key="11">option11</Menu.Item>
                                        <Menu.Item key="12">option12</Menu.Item>
                                    </SubMenu>
                                </Menu>
                            </Sider>
                            <Layout style={{padding: '0 24px 24px'}}>
                                <Breadcrumb style={{margin: '16px 0'}}>
                                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                                    <Breadcrumb.Item>List</Breadcrumb.Item>
                                    <Breadcrumb.Item>App</Breadcrumb.Item>
                                </Breadcrumb>
                                <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 280,}}>
                                    <Switch>
                                        <Route exact path="/" component={Home}/>
                                        <Route path="/advertisement_nodes" component={Advertisement}/>
                                    </Switch>
                                </Content>
                            </Layout>
                        </Layout>
                    </Layout>
                </Router>
            </div>
        );
    }
}

export default App;


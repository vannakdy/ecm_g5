import { Outlet, useNavigate, Link } from "react-router-dom"

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { useEffect, useState } from "react"
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
const { Header, Sider, Content } = Layout;

function MainLayout() {
    const isLogin = localStorage.getItem("isLogin")
    useEffect(()=>{
        if(isLogin == null || isLogin == 'null'){ // mean not login
            window.location.href = "/login" // direct login page
        }
    },[])

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const navigate = useNavigate();

    const onLinkPage = (routeName) => { // use for link to other page 
        navigate(routeName) // /category , /login
    }

    const onLogout = () => {
        localStorage.setItem("isLogin",null)
        window.location.href="/login"
    }

    if(isLogin == null || isLogin == 'null'){
        return null
    }

    return (
        <div>
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="demo-logo-vertical" />
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        items={[
                            {
                                key: '1',
                                icon: <UserOutlined />,
                                label: 'Dashboard',
                                onClick : () => onLinkPage("/")
                            },
                            {
                                key: '2',
                                icon: <VideoCameraOutlined />,
                                label: 'Category',
                                onClick : () => onLinkPage("/category")
                            },
                            {
                                key: '3',
                                icon: <UploadOutlined />,
                                label: 'Customer',
                                onClick : () => onLinkPage("/customer")
                                
                            },
                            {
                                key: '4',
                                icon: <UploadOutlined />,
                                label: 'Emplyee',
                                onClick : () => onLinkPage("/employee")
                                
                            }
                        ]}
                    />
                </Sider>
                <Layout>
                    <Header
                        style={{
                            padding: 0,
                            background: colorBgContainer,
                        }}
                    >
                        {/* <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        /> */}
                        <Button onClick={()=>setCollapsed(!collapsed)}>Toggle</Button>
                        <Button onClick={onLogout}>Logout</Button>
                        
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: "100vh",
                            background: colorBgContainer,
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
           
        </div>
    );
}

export default MainLayout;


{/* <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/about">About</Nav.Link>
                            <Nav.Link href="/login">Login</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar> */}


// const Layout = () => {

//     const navigate = useNavigate()

//     const onClickMenu = (param) => {
//         navigate(param)
//         // window.location.href=param
//     }

//     return (
//         <div>

//             {/* header block */}
//             <div style={{padding:10,backgroundColor:"pink"}}>
//                 <h1>Header</h1>
//                 <button onClick={()=>onClickMenu("/")}>Home</button>
//                 <button onClick={()=>onClickMenu("/about")}>About</button>
//                 <button onClick={()=>onClickMenu("/login")}>Login</button>
//                 <button onClick={()=>onClickMenu("/register")}>Reisger</button>

//                 <br/>
//                 <Link to="/">Home</Link>
//                 <Link to="/about">About</Link>
//                 <Link to="/login">Login</Link>
//                 <Link to="/register">Register</Link>

//                 <br/>
//                 <a href="/">Home</a>
//                 <a href="/about">About</a>
//                 <a href="/login">Login</a>
//                 <a href="/register">Register</a>
//             </div>

//             {/* content block */}
//             <div style={{padding:10,backgroundColor:"#888",minHeight:"80vh"}}>
//                 <Outlet/>
//             </div>

//             {/* footer block */}
//             <div style={{padding:10,backgroundColor:"pink"}}>
//                 <h1>Footer</h1>
//             </div>
//         </div>
//     )
// }

// export default Layout
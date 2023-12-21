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
    DownOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Dropdown, Space, Badge, Avatar } from 'antd';
import { Config, getCurrentUser, isLogin } from "../../share/helper";
import styles from "./Layout.module.css"
const { Header, Sider, Content } = Layout;

function MainLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const navigate = useNavigate();
    const user = getCurrentUser()
    useEffect(()=>{
        if(!isLogin()){ // mean not login
            window.location.href = "/login" // direct login page
        }
    },[])

    if(!isLogin()){
        return null
    }


    const onLinkPage = (routeName) => { // use for link to other page 
        navigate(routeName) // /category , /login
    }

    const onLogout = () => {
        localStorage.setItem("isLogin",null)
        window.location.href="/login"
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
                                key: 'product',
                                icon: <VideoCameraOutlined />,
                                label: 'Product',
                                onClick : () => onLinkPage("/product")
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
                                
                            },
                            {
                                key: '5',
                                icon: <UploadOutlined />,
                                label: 'Payment method',
                                onClick : () => onLinkPage("/payment_method")
                                
                            },
                            {
                                key: '6',
                                icon: <UploadOutlined />,
                                label: 'Invoice Status',
                                onClick : () => onLinkPage("/invoice_status")
                                
                            },
                            {
                                key: '7',
                                icon: <UploadOutlined />,
                                label: 'Role',
                                onClick : () => onLinkPage("/role")
                                
                            },
                            {
                                key: '8',
                                icon: <UploadOutlined />,
                                label: 'Shift',
                                onClick : () => onLinkPage("/shift")
                                
                            },
                            {
                                key: '9',
                                icon: <UploadOutlined />,
                                label: 'Shift Dtails',
                                onClick : () => onLinkPage("/shift_details")
                                
                            }
                        ]}
                    />
                </Sider>
                {/* <img 
                    src="http://localhost:81/project/image_5/image_emp-1701266235497-60366065" 
                    
                    width={100}
                    height={100}
                /> */}
                <Layout>
                    <Header
                        style={{
                            padding: 0,
                            background: colorBgContainer,
                        }}
                    >
                        <div className={styles.containHeader}>
                            <div>
                                <Button
                                    type="text"
                                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                    onClick={() => setCollapsed(!collapsed)}
                                    style={{
                                        fontSize: '16px',
                                        width: 64,
                                        height: 64,
                                    }}
                                />
                            </div>
                            <div>
                                <Space>
                                    <div style={{marginRight:15}}>
                                        <Badge size="small" count={5}>
                                            <Avatar  shape="square" size="small" />
                                        </Badge>
                                    </div>
                                    <Dropdown
                                        menu={{
                                            items:[
                                                {
                                                    key:"0",
                                                    label:"Profile"
                                                },
                                                {
                                                    key:"1",
                                                    label:"Change password"
                                                },
                                                {
                                                    key:"2",
                                                    label:"Setting"
                                                },
                                                {
                                                    key:"3",
                                                    label:"Logout",
                                                    danger:true,
                                                    onClick:()=>onLogout()
                                                }
                                            ]
                                        }}
                                    >
                                        <a onClick={(e) => e.preventDefault()}>
                                            <Space>
                                                {/* <UserOutlined /> */}
                                                {(user.Image == "" || user.Image == null) ?
                                                    <div 
                                                        style={{
                                                            width:40,
                                                            height:40,
                                                            borderRadius:20,
                                                            backgroundColor:"#eee"
                                                        }} 
                                                    />
                                                    :
                                                    <img 
                                                        src={Config.image_path+user.Image}
                                                        style={{widows:40,height:40,borderRadius:20}}
                                                    />

                                                }
                                               
                                                {user.Firstname+"-"+user.Lastname}
                                                <DownOutlined />
                                            </Space>
                                        </a>
                                    </Dropdown>
                                </Space>
                            </div>
                        </div>
                        
                    </Header>
                    {/* <Content > */}
                        <div
                            style={{
                                margin: '24px 16px',
                                padding: 24,
                                height: "100vh",
                                background: colorBgContainer,
                            }}
                        >
                            <Outlet />
                        </div>
                    {/* </Content> */}
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
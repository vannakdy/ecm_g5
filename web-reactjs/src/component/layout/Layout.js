import { Outlet, useNavigate, Link } from "react-router-dom"

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Layout() {
    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary">
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
            </Navbar>

            <div style={{padding:20}}>
                <Outlet/>
            </div>
        </div>
    );
}

export default Layout;
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
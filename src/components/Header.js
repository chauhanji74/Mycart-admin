import React, { useEffect } from 'react'
import {Navbar, Nav, NavDropdown, Container} from "react-bootstrap";
import { Link, NavLink, useNavigate } from 'react-router-dom';
/**
* @author
* @function Header
**/

const Header = (props) => {
    const navigate = useNavigate();

    const logout = () =>{
        localStorage.clear();
        sessionStorage.clear();
        navigate("/signin");
    }

    const loginLink = () =>{
        return(
            <>
            <Nav>
                <li className='nav-item'>
                    <a className="nav-link" onClick={logout} >Logout</a>
                </li>
            </Nav>
            </>
        );
    }

    const logoutLink = () =>{
        return(
            <>
            <Nav>
                <li className='nav-item'>
                    <NavLink to="/Signin" className="nav-link" >Login</NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink to="/Signup" className="nav-link" >Signup</NavLink>
                </li>
            </Nav>
            </>
        );
    }
    
    var loginorout ;
    const showLink = async () =>{
        const token =  window.sessionStorage.getItem('key');
        if(token){
            loginorout = true;
        }
        else{ 
            loginorout = false;
        }
    }
    showLink();

    //const adminData = window.localStorage.getItem('data');
    //const aData = JSON.parse(adminData);

    return(
    <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container fluid>
            <Link to="/" className='navbar-brand'>Admin Dashboard</Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
                {/*<NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>*/}
            </Nav>
            {loginorout ? loginLink() : logoutLink()}
            </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
   )

 }

 export default Header;
// Navbar.js
import React, {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import './Navbar.css'; // Import the CSS file for styling
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {FiHome, FiMenu, FiSettings, FiTv} from 'react-icons/fi'; // Assuming you're using the react-icons library
const NavBar = () => {
    const handleSelect = (eventKey) => alert(`selected ${eventKey}`);
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };
    return (
        <div>

            {/* Navbar */}
        <Navbar expand="lg" className="bg-dark text-light">
            <Container>
                {/*<Navbar.Brand as={Link} to="/" className="custom-navbar-brand">SamsungTV</Navbar.Brand>*/}
                <Nav style={{display:"flex", flexDirection:"row", justifyContent: 'space-around', width: '100%' }} activeKey="1" onSelect={handleSelect}>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/tv/1" className={`text-light custom-nav-link ${location.pathname === '/tv/1' ? 'active' : ''}`}>
                            TV 1
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/tv/2" className={`text-light custom-nav-link ${location.pathname === '/tv/2' ? 'active' : ''}`}>
                            TV 2
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/tv/3" className={`text-light custom-nav-link ${location.pathname === '/tv/3' ? 'active' : ''}`}>
                            TV 3
                        </Nav.Link>
                    </Nav.Item>

                    <Nav.Link as={Link} to="/" className="text-light custom-nav-link">
                        <FiHome size={24} />
                    </Nav.Link>
                    <Nav.Link as={Link} to="/settings" className="text-light custom-nav-link">
                        <FiSettings size={24} />
                    </Nav.Link>

                </Nav>
            </Container>
        </Navbar>
        </div>
    );
};

export default NavBar;

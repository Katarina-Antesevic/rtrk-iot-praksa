import React, { Component } from 'react';
import {Navbar, NavItem,  Link, Nav, NavDropdown, Container} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'


class HeaderComponent extends Component {
   
    render() { 
        return ( 
            <Navbar bg="light" expand="lg" className="sticky">
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>
                            <img
                                src="/RT-RK_logo.png"
                                width="50"
                                height="30"
                                className="d-inline-block align-top"
                                alt="React Bootstrap logo"
                            />
                        </Navbar.Brand>
                    </LinkContainer>
                    
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to='/devices'>
                            <Nav.Link>Devices</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/data'>
                            <Nav.Link>Measurements</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
         );
    }

   
}
 
export default HeaderComponent;
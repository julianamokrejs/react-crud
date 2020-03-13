import React from 'react';
import { Nav, Navbar, Link } from 'react-bootstrap';

export const NavigationBar = () => (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Brand href="#home" sm={8} >React Crud</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
            <Nav>
                <Nav.Link href="/">Usuários</Nav.Link>
                <Nav.Link href="/products">Produtos</Nav.Link>
                <Nav.Link href="/budget">Orçamentos</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
)

export default NavigationBar

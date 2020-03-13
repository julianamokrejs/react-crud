import React from 'react';
import Container from 'react-bootstrap/Container';

import Navbar from './NavBar';

export const Layout = (props) => (
    <React.Fragment>
        <Navbar />
        <Container>
            {props.children}
        </Container>
    </React.Fragment>
)

export default Layout
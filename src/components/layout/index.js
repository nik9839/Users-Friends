import React from 'react'
import { Navbar } from 'react-bootstrap'
import classes from './styles.module.css'

class Layout extends React.Component {
    render() {
        return (
            <div>
                <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className={classes.Navbar}>
                    <Navbar.Brand>User & Friends</Navbar.Brand>
                </Navbar>
                <div>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Layout
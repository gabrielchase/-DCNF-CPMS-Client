import React, { Component } from 'react'
import { Navbar, NavItem } from 'react-materialize'

class Nav extends Component {
    handleLogoClick = (e) => {
        e.preventDefault()
        this.props.history.push('/dashboard')
    }

    handleLogout = async (e) => {
        e.preventDefault()
        await localStorage.removeItem('token')
        await localStorage.removeItem('token_exp')
        this.props.history.push('/login')
    }

    render() {
        return (
            <Navbar brand={<div id="logo" onClick={this.handleLogoClick}><img src="https://dcnurturefarm.com/wp-content/themes/donchichos/img/logo.png" height="60" width="60"/></div>} right>
                <NavItem id='last-nav-item' onClick={this.handleLogout}>Logout</NavItem>
            </Navbar>
        )
    }
    
}

export default Nav

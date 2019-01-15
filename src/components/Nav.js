import React, { Component } from 'react'
import { Navbar, NavItem } from 'react-materialize'

class Nav extends Component {
    // componentDidMount() {
    //     console.log(this.props)
    //     let stupid_icon = document.getElementsByClassName('button-collapse')
    //     console.log('stupid_icon: ', stupid_icon, stupid_icon.length)
    //     if (stupid_icon) {
    //         console.log('in here')
    //         stupid_icon[0].remove()
    //     }
    //     else 
    //         console.log('hen hao')
    // }

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

import React, { Component } from 'react'

const AuthContext = React.createContext()

class AuthProvider extends Component {
    state = { 
        is_auth: false
    }

    // constructor() {
    //     super()
    //     this.login = this.login.bind(this)
    //     this.logout = this.logout.bind(this)
    // }

    login = () => {
        console.log('logging in')
        this.setState({ is_auth: true })
    }

    logout = () => {
        console.log('logging out')
        this.setState({ is_auth: false })
    }

    render() {
        return (
            <AuthContext.Provider value={{ is_auth: this.state.is_auth, login: this.login, logout: this.logout }}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}

const AuthConsumer = AuthContext.Consumer

export { AuthProvider, AuthConsumer }

import React, { Component } from 'react'

const AuthContext = React.createContext()

class AuthProvider extends Component {
    state = { 
        is_auth: false
    }

    login = (farm_name, password) => {
        console.log('logging in')
        console.log(farm_name, password)
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

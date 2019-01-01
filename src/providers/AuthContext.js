import React, { Component } from 'react'
import axios from 'axios'

import { API_URL } from '../constants.json'

const AuthContext = React.createContext()

class AuthProvider extends Component {
    state = { is_auth: false }

    login = async (farm_name, password) => {
        const res = await axios.post(`${API_URL}/auth/login`, { farm_name, password })
        
        if (res.data.success) {
            this.setState({ is_auth: true })
            localStorage.setItem('token', res.data.data.token)
            return true 
        } else {
            return false
        }
    }

    logout = () => {
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

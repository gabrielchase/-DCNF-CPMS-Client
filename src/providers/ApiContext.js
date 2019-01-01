import React, { Component } from 'react'
import axios from 'axios'

import { API_URL } from '../constants.json'

const ApiContext = React.createContext()

class ApiProvider extends Component {
    state = { 
        is_auth: false,
        payments: [],
        order: {}
    }

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
            <ApiContext.Provider value={{ is_auth: this.state.is_auth, login: this.login, logout: this.logout }}>
                {this.props.children}
            </ApiContext.Provider>
        )
    }
}

const ApiConsumer = ApiContext.Consumer

export { ApiProvider, ApiConsumer }

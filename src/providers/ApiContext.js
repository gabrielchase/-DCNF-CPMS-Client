import React, { Component } from 'react'
import axios from 'axios'

import { API_URL } from '../constants.json'

import lib from '../lib'

const ApiContext = React.createContext()

class ApiProvider extends Component {
    state = { 
        is_auth: false,
        payments: [],
        order: {}
    }

    getPayments = async (year, month, date) => {
        const _year = parseInt(year)
        const _month = parseInt(month)
        const _date = parseInt(date)
        console.log('date: ', date)
        console.log(`${API_URL}/payments?year=${_year}&month=${_month}&date=${_date}`)
        const headers = lib.getHeadersWithJWT()
        const payments_this_month = await axios.get(`${API_URL}/payments?year=${_year}&month=${_month}`, headers)
        const payments_today = await axios.get(`${API_URL}/payments?year=${_year}&month=${_month}&date=${_date}`, headers)

        console.log('this_month: ', payments_this_month.data)
        console.log('today: ', payments_today.data)
        
        if (payments_this_month.data.success && payments_today.data.success)
            return { payments_this_month: payments_this_month.data, payments_today: payments_today.data }
        else 
            return []
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
            <ApiContext.Provider value={{ 
                    is_auth: this.state.is_auth, 
                    login: this.login, 
                    logout: this.logout,
                    getPayments: this.getPayments
                    }}>
                        {this.props.children}
            </ApiContext.Provider>
        )
    }
}

const ApiConsumer = ApiContext.Consumer

export { ApiProvider, ApiConsumer }

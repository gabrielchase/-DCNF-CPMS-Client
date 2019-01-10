import React, { Component } from 'react'
import axios from 'axios'

import { API_URL } from '../constants.json'

import lib from '../lib'

const ApiContext = React.createContext()

class ApiProvider extends Component {
    state = { 
        is_auth: false,
        payments_this_month: {},
        payments_today: {},
        order: {},
        year: 0,
        month: 0, 
        date: 0
    }

    getPayments = async (year, month, date) => {
        console.log('getting payments for: ', this.state.year, this.state.month, this.state.date)
        const _year = parseInt(this.state.year)
        const _month = parseInt(this.state.month)
        const _date = parseInt(this.state.date)
        // console.log('date: ', date)
        console.log('month query: ', `${API_URL}/payments?year=${_year}&month=${_month}`)
        console.log('date query: ', `${API_URL}/payments?year=${_year}&month=${_month}&date=${_date}`)
        const headers = lib.getHeadersWithJWT()
        const payments_this_month = await axios.get(`${API_URL}/payments?year=${_year}&month=${_month}`, headers)
        const payments_today = await axios.get(`${API_URL}/payments?year=${_year}&month=${_month}&date=${_date}`, headers)

        console.log('this_month: ', payments_this_month.data.data)
        console.log('today: ', payments_today.data.data)
        
        if (payments_this_month.data.success && payments_today.data.success) {
            this.setState({ payments_this_month: payments_this_month.data.data })
            this.setState({ payments_today: payments_today.data.data })
        }
            // return { payments_this_month: payments_this_month.data, payments_today: payments_today.data }
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

    
    changeYear = (year) => {
        this.setState({ year })
    }
    
    changeMonth = (month) => {
        console.log('in changeMonth: ', month)
        this.setState({ month })
        console.log('changed month: ', this.state.month)
    }

    changeDate = (date) => {
        this.setState({ date })
    }

    render() {
        return (
            <ApiContext.Provider value={{ 
                is_auth: this.state.is_auth, 
                login: this.login, 
                logout: this.logout,
                getPayments: this.getPayments,
                year: this.state.year,
                month: this.state.month,
                date: this.state.date,
                changeYear: this.changeYear,
                changeMonth: this.changeMonth,
                changeDate: this.changeDate,
                payments_this_month: this.state.payments_this_month,
                payments_today: this.state.payments_today
            }}>
                {this.props.children}
            </ApiContext.Provider>
        )
    }
}

const ApiConsumer = ApiContext.Consumer

export { ApiProvider, ApiConsumer }

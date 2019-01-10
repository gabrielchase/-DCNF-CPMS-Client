import React, { Component } from 'react'
import qs from 'query-string'

import { ApiConsumer } from '../providers/ApiContext'
import DateDropdown from './DateDropdown'


class Dashboard extends Component {
    async componentDidMount() {
        const values = qs.parse(this.props.location.search)
        
        let current_date = new Date()
        let year = current_date.getFullYear()
        await this.props.changeYear(year)
        
        let month = current_date.getMonth() + 1 
        await this.props.changeMonth(month)
        
        let date = current_date.getDate()
        await this.props.changeDate(date)

        // console.log(year, month, date)

        await this.props.getPayments(year, month, date)
    }

    renderPayments = (payments) => {
        if (payments) {
            return (
                <table class="centered highlight">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Order ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((p) => {
                            return (
                                <tr>
                                    <td>{p.partner_name}</td>
                                    <td>P{p.amount}</td>
                                    <td>{p.order_id}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>                    
            )
        } else {
            return (
                <div>Loading...</div>
            )
        }
        
    }

    render() {
        const { payments_this_month, payments_today } = this.props

        if (Object.keys(payments_today).length > 0 || Object.keys(payments_this_month).length > 0) {
            return (
                <div class="container">
                    <DateDropdown />
                    <p><strong>Payments Today </strong></p>
                    <p>Total: {payments_today.total}</p>
                    { payments_today.payments ? this.renderPayments(payments_today.payments) : '' }
                    <p><strong>Payments This Month</strong></p>
                    <p>Total: {payments_this_month.total}</p>
                    { payments_this_month.payments ? this.renderPayments(payments_this_month.payments) : '' }
                </div>
            )
        } else {
            return (
                <div>Loading...</div>
            )
        }
    }
} 

const ConnectedDashboard = props => (
    <ApiConsumer>
        {({ is_auth, getPayments, payments_this_month, payments_today, changeYear, changeMonth, changeDate }) => (
            <Dashboard
                {...props}
                is_auth={is_auth}
                payments_this_month={payments_this_month}
                payments_today={payments_today}
                getPayments={getPayments}
                changeYear={changeYear}
                changeMonth={changeMonth}
                changeDate={changeDate}
            />
        )}
    </ApiConsumer>
)

export default ConnectedDashboard

import React, { Component } from 'react'

import { ApiConsumer } from '../providers/ApiContext'
import DateDropdown from './DateDropdown'
import OrderModal from './OrderModal'


class Dashboard extends Component {
    async componentDidMount() {        
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

    handlePartnerRowClick = (partner) => {
        this.props.history.push(`/partner/${partner.order_id}`)
    }

    renderPayments = (payments, time) => {
        if (payments) {
            return (
                <div>
                    <p><strong>Payments {time}</strong></p>
                    <p>Total: {payments.total}</p>
                    <table class="centered highlight">
                        <thead>
                            <tr>
                                <th>Due Date</th>
                                <th>Name</th>
                                <th>Amount</th>
                                <th>Order ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.payments.map((p) => {
                                return (
                                    <tr id='partner-row' onClick={this.handlePartnerRowClick.bind(this, p)}>
                                        <td>{p.due_date}</td>
                                        <td>{p.partner_name}</td>
                                        <td>P{p.amount}</td>
                                        <td>{p.order_id}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>  
                </div>                  
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
                    <OrderModal />
                    { payments_today.paments && payments_today.payments.length > 0 ? this.renderPayments(payments_today, 'Today') : '' }
                    { payments_this_month.payments ? this.renderPayments(payments_this_month, 'This Month') : '' }
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

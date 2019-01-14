import React, { Component } from 'react'
import { Row, Col, Navbar, NavItem } from 'react-materialize'

import { ApiConsumer } from '../providers/ApiContext'
import DateDropdown from './DateDropdown'
import OrderModal from './OrderModal'

import { displayDate, displayMoney } from '../lib'

class Dashboard extends Component {
    state = {
        valid_months: []
    }


    async componentDidMount() {        
        let current_date = new Date()
        let year = current_date.getFullYear()
        await this.props.changeYear(year)
        
        let month = current_date.getMonth() + 1 
        await this.props.changeMonth(month)
        
        let date = current_date.getDate()
        await this.props.changeDate(date)

        // console.log(year, month, date)

        await this.props.getUpcomingPayments(2021)
        await this.props.getPayments()
    }

    handlePartnerRowClick = (partner) => {
        this.props.history.push(`/partner/${partner.order_id}`)
    }

    printMonths = () => {
        return (
            <div>
                {this.state.valid_months.map(m => {
                    return (
                        <div>
                            {m.times * <br />}
                            <p>{m.month}</p>
                        </div>
                    )
                })}
            </div>
        )
        
    }

    renderUpcomingPayments = (upcoming_payments) => {
        if (upcoming_payments) {            
            return (
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
                        {upcoming_payments.map((p) => {
                            return (
                                <tr id='partner-row' onClick={this.handlePartnerRowClick.bind(this, p)}>
                                    <td>{displayDate(p.due_date)}</td>
                                    <td>{p.partner_name}</td>
                                    <td>{displayMoney(p.amount)}</td>
                                    <td>{p.order_id}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>  
            )
        
        } else {
            return (
                <div></div>
            )
        }
        
    }

    renderPayments = (payments) => {
        if (payments) {
            return (
                <div>
                    <div id="no-margin-bottom">
                        <h5 id="inline-h">Filter Payments</h5>
                        <DateDropdown />
                    </div>
                    <div id="no-bottom-margin">
                        <h6 id="total-display">Total: {displayMoney(payments.total)}</h6>
                    </div>
                    
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
                                        <td>{displayDate(p.due_date)}</td>
                                        <td>{p.partner_name}</td>
                                        <td>{displayMoney(p.amount)}</td>
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
        const { payments_this_month, payments_today, upcoming_payments } = this.props
        console.log('upcoming_payments: ', upcoming_payments)
        if (Object.keys(payments_today).length > 0 || Object.keys(payments_this_month).length > 0 || Object.keys(upcoming_payments).length > 0) {
            return (
                <div>
                    <div class="container">
                        <br />   
                        <Row>
                            <Col s={12}>
                                <OrderModal />
                            </Col>
                            <br/>
                            <br/>
                            <br/>
                            <Col s={12}>
                                { payments_today.paments && payments_today.payments.length > 0 ? this.renderPayments(payments_today, 'Today') : '' }
                                { payments_this_month.payments ? this.renderPayments(payments_this_month) : '' }
                                <br />
                                <br />
                                <h5>Upcoming Payments</h5>
                                { upcoming_payments && upcoming_payments.length > 0 ? this.renderUpcomingPayments(upcoming_payments) : '' }    
                            </Col>
                        </Row>
                    </div>
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
        {({ is_auth, getPayments, payments_this_month, payments_today, changeYear, changeMonth, changeDate, year, month, upcoming_payments, getUpcomingPayments }) => (
            <Dashboard
                {...props}
                is_auth={is_auth}
                payments_this_month={payments_this_month}
                payments_today={payments_today}
                getPayments={getPayments}
                changeYear={changeYear}
                changeMonth={changeMonth}
                changeDate={changeDate}
                year={year}
                month={month}
                upcoming_payments={upcoming_payments}
                getUpcomingPayments={getUpcomingPayments}
            />
        )}
    </ApiConsumer>
)

export default ConnectedDashboard

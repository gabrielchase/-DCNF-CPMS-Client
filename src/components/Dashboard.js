import React, { Component } from 'react'

import { ApiConsumer } from '../providers/ApiContext'


class Dashboard extends Component {
    state = {
        payments_this_month: {},
        payments_today: {}
    }

    async componentDidMount() {
        const current_date = new Date()
        const year = current_date.getFullYear()
        const month = current_date.getMonth() + 1 
        const date = current_date.getDate()

        const { payments_this_month, payments_today} = await this.props.getPayments(2021, 12, 2)
        this.setState({ payments_this_month, payments_today })
    }

    renderPayments = (payments) => {
        if (payments) {
            return (
                <div>
                    {payments.map((p) => {
                        return (
                            <div>
                                <p>{p.partner_name}: {p.amount}</p>
                            </div>
                        )
                    })}
                </div>
            )
        } else {
            return (
                <div>Loading...</div>
            )
        }
        
    }


    render() {
        const { payments_this_month, payments_today } = this.state

        if (payments_today.success && payments_this_month.success) {
            return (
                <div>
                    <p>Payments Today: </p>
                    { payments_today.data.payments ? this.renderPayments(payments_today.data.payments) : '' }
                    <p>Payments This Month: </p>
                    { payments_this_month.data.payments ? this.renderPayments(payments_this_month.data.payments) : '' }
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
        {({ is_auth, getPayments }) => (
            <Dashboard
                {...props}
                is_auth={is_auth}
                getPayments={getPayments}
            />
        )}
    </ApiConsumer>
)

export default ConnectedDashboard

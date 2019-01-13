import React, { Component } from 'react'
import { Button, Input, Row, Table } from 'react-materialize'
import axios from 'axios'

import { API_URL } from '../constants.json'
import lib from '../lib'


class Partner extends Component {
    state = {
        partner: {},
        payment_changes: [],
        errors: []
    }

    async componentWillMount() {
        const order_id =  this.props.match.params.order_id
        const headers = lib.getHeadersWithJWT()
        const partner = await axios.get(`${API_URL}/orders/${order_id}`, headers)
        this.setState({ partner: partner.data.data })
    }

    handlePaymentChanges = (e, payment) => {
        console.log('handling payment changes')
        console.log('payment: ', payment)
        console.log(e.target.value)
        this.setState(prevState => ({
            payment_changes: [...prevState.payment_changes, { id: payment._id, paid: e.target.value }]
        }))
    }

    submitPaymentChanges = async (e) => {
        e.preventDefault()
        console.log('changes: ', this.state.payment_changes)
        
        const headers = lib.getHeadersWithJWT()
        for (let c of this.state.payment_changes) {
            console.log('changing ', c.id)
            const res = await axios.put(`${API_URL}/payments/${c.id}/paid`, { paid: c.paid }, headers)
            console.log(res.data)
            if (!res.data.success) {
                this.setState(prevState => ({
                    errors: [...prevState.errors, c.id]
                }))
            }
        }
        console.log('done with for loop\nerrors: ', this.state.errors)
    }

    renderOrderPayments = () => {
        const { partner } = this.state 
        if (partner.payments) {
            return (
                <div>
                    <Table>
                        <thead>
                            <tr>
                                <th>Due Date</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {partner.payments.map((p) => {
                                return (
                                    <tr>
                                        <td>{lib.displayDate(p.due_date)}</td>
                                        <td>{lib.displayMoney(p.amount)}</td>
                                        <td>
                                            <Input type="select" onChange={e => this.handlePaymentChanges(e, p)}>
                                                <option value={p.paid ? true : false}>{p.paid ? 'PAID' : 'NOT PAID'}</option>
                                                <option value={!p.paid ? true : false}>{!p.paid ? 'PAID' : 'NOT PAID'}</option>
                                            </Input>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    <br />
                    <Button onClick={this.submitPaymentChanges}>Save Changes</Button>
                </div>
            )
        }
    }

    render() {
        const { partner } = this.state 
        console.log('partner: ', this.state.partner)
        if (partner && partner.order) {
            return (
                <div class="container">
                    <Row>
                        <p s={12}>Name: {partner.order.partner_name}</p>
                    </Row>
                    <Row>
                        <p s={4}>Email: {partner.order.email_address}</p>
                        <p s={4}>Mobile Number: {partner.order.mobile_number}</p>
                        <p s={4}>Account Number: {partner.order.account_number}</p>
                    </Row>
                    <Row>
                        <p s={6}>Order ID: {partner.order._id}</p>
                        <p s={6}>Order Status: {partner.order.status}</p>
                    </Row>
                    <br />
                    <p>Payments: </p>
                    {this.renderOrderPayments()}
                </div>
            ) 
        } else {
            return (
                <div>Loading...</div>
            )
        }
        
    }
}

export default Partner

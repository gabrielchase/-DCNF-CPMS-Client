import React, { Component } from 'react'
import { Button, Col, Input, Row, Table } from 'react-materialize'
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
                    <Row>
                        <Col s={10}></Col>
                        <Col s={2}><Button onClick={this.submitPaymentChanges}>Save Changes</Button></Col>
                    </Row>
                    <br/>
                    <br/>
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
                        <h2 s={12}>{partner.order.partner_name}</h2>
                    </Row>
                    <Row>
                        <Col s={6}>Email: {partner.order.email_address}</Col>
                        <Col s={6}>Order ID: {partner.order._id}</Col>
                    </Row>
                    <Row>
                        <Col s={6}>Mobile Number: {partner.order.mobile_number}</Col>
                        <Col s={6}>Order Status: {partner.order.status}</Col>
                    </Row>
                    <Row>
                        <Col s={12}>Account Number: {partner.order.account_number}</Col>
                    </Row>
                    <br />
                    <div>
                        <h5 id="inline-h">Payments: </h5>
                        <Button id="float-right-button" onClick={this.submitPaymentChanges}>Save Changes</Button>
                    </div>
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

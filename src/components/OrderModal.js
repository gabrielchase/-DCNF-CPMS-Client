import React, { Component } from 'react'
import axios from 'axios'
import { Button, Input, Modal, Row } from 'react-materialize'

import { ApiConsumer } from '../providers/ApiContext'
import constants from '../constants.json'
import lib from '../lib'

const API_URL = constants[process.env.NODE_ENV].API_URL

class OrderModal extends Component {
    state = {
        partner_name: '',
        email_address: '',
        mobile_number: '',
        address: '',
        account_number: '',
        modal_open: false,
        loading: false
    }

    handleOnChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleAddOrder = async (e) => { 
        e.preventDefault()
        this.setState({ loading: !this.state.loading })
        const headers = lib.getHeadersWithJWT()
        const res = await axios.post(`${API_URL}/package/5c251f357a4d2b2d4028fab6/orders`, this.state, headers)
        console.log('res.data: ', res.data)
        console.log(this.state)
        if (res.data.success) {
            await this.props.getUpcomingPayments()
            this.setState({ modal_open: false })
            this.setState({ loading: !this.state.loading })
            window.Materialize.toast('New order added!', 5000)
        }
    }

    render() {
        return (
            <div>
                <Button id="float-right-button" onClick={() => this.setState({ modal_open: true })}>Add Order</Button>
                <Modal fixedFooter modalOptions={{ dismissible: false }}  id="order-modal" header='Add Order' open={this.state.modal_open} actions={<div><Button onClick={this.handleAddOrder}>{this.state.loading ? 'Loading...' : 'Submit'}</Button> <Button className="red" modal="close" waves="light" onClick={() => this.setState({ modal_open: false })}>Close</Button></div> }>
                    <Row>
                        <Input s={12} id='partner_name' placeholder="Maria Clara"  label="Investor Name" onChange={this.handleOnChange}/>
                        <Input s={12} id='email_address' placeholder="mariaclara@gmail.com" label="Investor Email" onChange={this.handleOnChange}/>
                        <Input s={12} id='mobile_number' label="Mobile Number" onChange={this.handleOnChange}/>
                        <Input s={12} id='address' label="Address" onChange={this.handleOnChange}/>
                        <Input s={12} id='account_number' label="Account Number" onChange={this.handleOnChange}/>
                    </Row>
                </Modal>
            </div>
        )
    }
}

const ConnectedOrderModal = props => (
    <ApiConsumer>
        {({ getUpcomingPayments }) => (
            <OrderModal
                {...props}
                getUpcomingPayments={getUpcomingPayments}
            />
        )}
    </ApiConsumer>
)

export default ConnectedOrderModal

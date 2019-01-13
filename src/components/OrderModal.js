import React, { Component } from 'react'
import axios from 'axios'
import { Button, Input, Modal, Row } from 'react-materialize'

import lib from '../lib'


class OrderModal extends Component {
    state = {
        partner_name: '',
        email_address: '',
        mobile_number: '',
        address: '',
        account_number: ''
    }

    handleOnChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleAddOrder = async (e) => { 
        e.preventDefault()
        const headers = lib.getHeadersWithJWT()
        const res = await axios.post('http://localhost:3005/api/package/5c251f357a4d2b2d4028fab6/orders', this.state, headers)
        console.log('res.data: ', res.data)
        console.log(this.state)
    }

    render() {
        return (
            <Modal header='Add Order' trigger={<Button>Add Order</Button>} actions={<Button onClick={this.handleAddOrder}>Submit</Button>}>
                <Row>
                    <Input s={12} id='partner_name' placeholder="Maria Clara"  label="Investor Name" onChange={this.handleOnChange}/>
                    <Input s={12} id='email_address' placeholder="mariaclara@gmail.com" label="Investor Email" onChange={this.handleOnChange}/>
                    <Input s={12} id='mobile_number' label="Mobile Number" onChange={this.handleOnChange}/>
                    <Input s={12} id='address' label="Address" onChange={this.handleOnChange}/>
                    <Input s={12} id='account_number' label="Account Number" onChange={this.handleOnChange}/>
                </Row>
            </Modal>
        )
    }
}

export default OrderModal
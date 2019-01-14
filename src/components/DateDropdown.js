import React, { Component } from 'react'
import { Button, Input, Row } from 'react-materialize'
import { ApiConsumer } from '../providers/ApiContext'

import { MONTHS } from '../constants'

class DateDropdown extends Component {
    state = { 
       year: this.props.year,

    }

    handleDateChange = async (type, val) => {
        if (type === 'month') 
            await this.props.changeMonth(val)
        if (type === 'date') 
            await this.props.changeDate(val)

        await this.props.getPayments()
    }

    handleYearChange = async (e) => {
        await this.props.changeYear(e.target.value)
        if (this.props.year.length === 4) {
            await this.props.getPayments()
        }
    }

    render() {
        return (
            <div id="date-dropdown" >
                <Input  id="date-dropdown-input" label="Year" value={this.props.year} onChange={e => this.handleYearChange(e)} />
                <Input  id="date-dropdown-input" type="select" label="Month" value={this.props.month} onChange={e => this.handleDateChange('month', e.target.value)}>
                    <option value=''></option>
                    {MONTHS.map((m) => {
                        return (
                            <option value={MONTHS.indexOf(m)+1}>{m}</option>
                        )
                    })}
                </Input>
                {/* <Input s={2} type="select" label="Date" onChange={e => this.handleDateChange('date', e.target.value)}>
                    <option value=""></option>
                    {[...Array(31).keys()].map((i) => {
                        return (
                            <option value={i+1}>{i+1}</option>
                        )
                    })}
                </Input> */}
                {/* <Button s={4} waves="light" onClick={this.props.getPayments}>Search</Button> */}
            </div>
            
        )
    }
}

const ConnectedDateDropdown = props => (
    <ApiConsumer>
        {({ year, month, date, changeYear, changeMonth, changeDate, getPayments }) => (
            <DateDropdown
                {...props}
                year={year}
                month={month}
                date={date}
                changeYear={changeYear}
                changeMonth={changeMonth}
                changeDate={changeDate}
                getPayments={getPayments}
            />
        )}
    </ApiConsumer>
)

  
        
export default ConnectedDateDropdown

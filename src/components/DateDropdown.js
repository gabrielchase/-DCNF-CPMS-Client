import React, { Component } from 'react'
import { Button, Input, Row } from 'react-materialize'
import { ApiConsumer } from '../providers/ApiContext'

const MONTHS = ['January', 'February',  'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

class DateDropdown extends Component {
    state = { 
       year: this.props.year
    }

    handleDateChange = (type, val) => {
        if (type === 'month') 
            this.props.changeMonth(val)
        if (type === 'date') 
            this.props.changeDate(val)
    }

    handleYearChange = (e) => {

    }

    render() {
        return (
            <Row>
                <Input s={4} label="Year" value={this.props.year} onChange={e => this.props.changeYear(e.target.value)} />
                <Input s={4} type="select" label="Month" onChange={e => this.handleDateChange('month', e.target.value)}>
                    <option value=""></option>
                    {MONTHS.map((m) => {
                        return (
                            <option value={MONTHS.indexOf(m)}>{m}</option>
                        )
                    })}
                </Input>
                <Input s={2} type="select" label="Date" onChange={e => this.handleDateChange('date', e.target.value)}>
                    <option value=""></option>
                    {[...Array(31).keys()].map((i) => {
                        return (
                            <option value={i+1}>{i+1}</option>
                        )
                    })}
                </Input>
                <Button waves="light" onClick={this.props.getPayments}>Search</Button>
            </Row>
            
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

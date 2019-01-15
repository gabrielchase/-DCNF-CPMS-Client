import React, { Component } from 'react'
import axios from 'axios'

import { ApiConsumer } from '../providers/ApiContext'

import constants from '../constants.json'

const API_URL = constants[process.env.NODE_ENV].API_URL

class Landing extends Component {
    state = {
        farm_name: `Don Chicho's`,
        loading: false
    }

    async componentDidMount() {
        document.body.style.backgroundColor = "#47BAA8"
        console.log(env.process.NODE_ENV)
        await axios.get(API_URL)
    }

    handleOnChange = ({ target: { value, id }}) => {
        this.setState({
            [id]: value
        })
    }

    handleLogin = async (event) => {
        event.preventDefault()

        this.setState({ loading: !this.state.loading })

        const success = await this.props.login(this.state.farm_name, this.state.password)
        
        if (success) {
            this.props.history.push('/dashboard')
        }
    }

    render() {
        return (
            <div class="valign-wrapper row login-box">
                <div class="col card hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4">
                    <form onSubmit={this.handleLogin}>
                        <div class="card-content">
                            <br/>
                            <p class="center-align"><img src="https://dcnurturefarm.com/wp-content/themes/donchichos/img/logo.png" height="100" width="100"/></p>
                            <br/>
                            <div class="row">
                                <div class="input-field col s12">
                                    <label for="email">Farm Name or Email Address</label>
                                    <input type="text"  name="email" id="email" onChange={this.handleOnChange} value={this.state.farm_name}/>
                                </div>
                                <div class="input-field col s12">
                                    <label for="password">Password </label>
                                    <input type="password" class="validate" name="password" id="password" onChange={this.handleOnChange} value={this.state.password}/>
                                </div>
                            </div>
                        </div>
                        <div class="card-action right-align">
                        <button class="btn waves-effect waves-light" type="submit" name="action">{this.state.loading ? 'Loading...' : 'Submit'}</button>
                        </div>
                    </form>
                </div>
                
            </div>
        )
    }
}

const ConnectedLanding = props => (
    <ApiConsumer>
        {({ is_auth, login }) => (
            <Landing
                {...props}
                is_auth={is_auth}
                login={login}
            />
        )}
    </ApiConsumer>
)

export default ConnectedLanding

import React, { Component } from 'react'
import { ApiConsumer } from '../providers/ApiContext'

class Landing extends Component {
    state = {
        farm_name: `Don Chicho's`,
        password: 'password'
    }

    handleOnChange = ({ target: { value, id }}) => {
        this.setState({
            [id]: value
        })
    }

    handleLogin = async (event) => {
        event.preventDefault()

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
                            <span class="card-title">Enter Credentials</span>
                            <div class="row">
                                <div class="input-field col s12">
                                    <label for="email">Farm Name or Email Address</label>
                                    <input type="text"  name="email" id="email" value={this.state.farm_name}/>
                                </div>
                                <div class="input-field col s12">
                                    <label for="password">Password </label>
                                    <input type="password" class="validate" name="password" id="password" value={this.state.password}/>
                                </div>
                            </div>
                        </div>
                        <div class="card-action right-align">
                        <button class="btn waves-effect waves-light" type="submit" name="action">Submit</button>
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

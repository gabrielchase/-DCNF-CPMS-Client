import React, { Component } from 'react'
import { AuthConsumer } from '../providers/AuthContext'


class Landing extends Component {
    state = {
        farm_name: '',
        password: ''
    }

    handleOnChange = ({ target: { value, id }}) => {
        this.setState({
            [id]: value
        })
    }

    render() {
        return (
            <AuthConsumer>
                { ({ login }) => ( 
                    <div class="w-full max-w-xs" id="landing">
                        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" id="login-form">
                            <div class="mb-4">
                                <label class="block text-grey-darker text-sm font-bold mb-2" for="farm_name">
                                    Farm Name
                                </label>
                                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="farm_name" type="text" placeholder="Don Chicho's" onChange={this.handleOnChange} />
                            </div>
                            <div class="mb-6">
                                <label class="block text-grey-darker text-sm font-bold mb-2" for="password">
                                    Password
                                </label>
                                <input class="shadow appearance-none border w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" onChange={this.handleOnChange} />
                            </div>
                
                            <div class="flex items-center justify-between">
                                <button class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => login(this.state.farm_name, this.state.password)}>
                                    Log In
                                </button>
                                <a class="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" >
                                    Forgot Password?
                                </a>
                            </div>
                        </form>
                        <p class="text-center text-grey text-xs" id="copyright">
                            ©2019 Don Chicho's Nurture Farm Corp. <br/> All rights reserved.
                        </p>
                    </div>
                )}
            </AuthConsumer>
        )
    }
}

export default Landing

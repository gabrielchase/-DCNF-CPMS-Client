import React from 'react'
import { ApiConsumer } from '../providers/ApiContext'
import { Link } from 'react-router-dom'

export default () => (
    <header>
        <ApiConsumer>
            { ({ is_auth, login, logout }) => ( 
                <div>
                    {/* <h3><Link to="/">HOME</Link></h3> */}

                    { is_auth ? (
                        <ul>
                            <Link to="/dashboard">Dashboard</Link>
                            <button onClick={logout}>Logout</button>
                        </ul> 
                    ) : (
                        <button onClick={login}>Login</button>
                    )
                    }
                </div>
            )}
        </ApiConsumer>
    </header>
)
import React from 'react'
import { AuthConsumer } from '../providers/AuthContext'
import { Link } from 'react-router-dom'

export default () => (
    <header>
        <AuthConsumer>
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
        </AuthConsumer>
    </header>
)
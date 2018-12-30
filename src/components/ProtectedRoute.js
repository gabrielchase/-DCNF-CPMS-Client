import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthConsumer } from '../providers/AuthContext'

const ProtectedRoute = ({ component: Component, ...rest}) => (
  <AuthConsumer>
    {({ is_auth }) => (
        <Route
            render={
                props =>
                    is_auth 
                    ? <Component {...props} /> 
                    : <Redirect to="/" />
            }
            {...rest}
        />
    )}
  </AuthConsumer>
)

export default ProtectedRoute
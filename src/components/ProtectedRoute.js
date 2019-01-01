import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { ApiConsumer } from '../providers/ApiContext'

const ProtectedRoute = ({ component: Component, ...rest}) => (
  <ApiConsumer>
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
  </ApiConsumer>
)

export default ProtectedRoute
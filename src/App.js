import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { AuthProvider } from './providers/AuthContext'


import Header from './components/Header'
import Dashboard from './components/Dashboard'
import Landing from './components/Landing'
import ProtectedRoute from './components/ProtectedRoute'
import history from './history'

const App = () => (
  <Router history={history}>
    <AuthProvider>
      {/* <Header /> */}
      <Switch>
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <Route path="/" component={Landing} /> 
      </Switch>
    </AuthProvider>
  </Router>
)

export default App 

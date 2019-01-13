import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { ApiProvider } from './providers/ApiContext'

import Dashboard from './components/Dashboard'
import Landing from './components/Landing'
import Partner from './components/Partner'
import ProtectedRoute from './components/ProtectedRoute'
import history from './history'

const App = () => (
  <Router history={history}>
    <ApiProvider>
        {/* <Header /> */}
        <Switch>
          <ProtectedRoute path="/dashboard" component={Dashboard} />
          <ProtectedRoute path="/partner/:order_id" component={Partner} />
          <Route path="/" component={Landing} /> 
        </Switch>
    </ApiProvider>
  </Router>
)

export default App 

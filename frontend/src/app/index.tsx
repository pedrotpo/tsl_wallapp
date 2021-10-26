import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from 'commons/components/Login'
import Main from 'app/pages/Main'
import Register from 'app/pages/Register'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" render={() => <Login />} />
        <Route path="/register" render={() => <Register />} />
        <Route path="/" render={() => <Main />} />
      </Switch>
    </Router>
  )
}

export default App

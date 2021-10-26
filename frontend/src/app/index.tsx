import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Box, Grid, GridItem } from '@chakra-ui/react'
import Main from 'app/pages/Main'
import Register from 'app/pages/Register'
import LoginForm from 'commons/components/LoginForm'
import NavBar from 'commons/components/NavBar'
import Footer from 'commons/components/Footer'

const App = () => {
  return (
    <Router>
      <Grid templateRows="60px 1fr 100px" height="100vh">
        <GridItem>
          <NavBar />
        </GridItem>

        <Switch>
          <Route path="/login" render={() => <LoginForm />} />
          <Route path="/register" render={() => <Register />} />
          <Route path="/" render={() => <Main />} />
        </Switch>

        <GridItem>
          <Footer />
        </GridItem>
      </Grid>
    </Router>
  )
}

export default App

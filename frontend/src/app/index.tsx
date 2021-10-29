import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Grid, GridItem } from '@chakra-ui/react'
import jwt from 'jwt-decode'
import Main from 'app/pages/Main'
import Register from 'app/pages/Register'
import LoginForm from 'commons/components/LoginForm'
import NavBar from 'commons/components/NavBar'
import Footer from 'commons/components/Footer'
import PostForm from 'commons/components/PostForm/PostForm'
import { ACCESS_TOKEN } from 'commons/constants'
import { useAppSelector, useDucks } from 'commons/hooks'
import { Decoded } from 'commons/types'

const App = () => {
  const authToken = localStorage.getItem(ACCESS_TOKEN)
  const userState = useAppSelector((state) => state.user.data)
  const { loadUserProfile } = useDucks()

  useEffect(() => {
    const isUserInfoLoaded = userState && Object.keys(userState).length !== 0
    if (authToken && !isUserInfoLoaded) {
      const { user_id } = jwt<Decoded>(authToken)
      loadUserProfile(user_id)
    }
  }, [userState, authToken, loadUserProfile])
  return (
    <Router>
      <Grid templateRows="70px 1fr 100px" height="100vh">
        <GridItem>
          <NavBar />
        </GridItem>

        <Switch>
          <Route path="/login" render={() => <LoginForm />} />
          <Route path="/register" render={() => <Register />} />
          <Route path="/post" render={() => <PostForm />} />
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

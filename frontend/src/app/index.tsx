import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Grid, GridItem } from '@chakra-ui/react'
import jwt from 'jwt-decode'
import Main from 'app/pages/Main'
import Register from 'app/pages/Register'
import Login from 'app/pages/Login'
import NavBar from 'commons/components/NavBar'
import Footer from 'commons/components/Footer'
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'commons/constants'
import { useAppSelector, useAppDispatch, useDucks } from 'commons/hooks'
import { logInUserSucceeded } from 'commons/ducks/auth'
import { DecodedJWT } from 'commons/types'

const App = () => {
  const authToken = localStorage.getItem(ACCESS_TOKEN) || ''
  const refreshToken = localStorage.getItem(REFRESH_TOKEN) || ''
  const userState = useAppSelector((state) => state.user.data)
  const dispatch = useAppDispatch()
  const { loadUserProfile } = useDucks()

  useEffect(() => {
    const isUserInfoLoaded = userState && Object.keys(userState).length !== 0
    if (authToken && !isUserInfoLoaded) {
      const access = jwt<DecodedJWT>(authToken)
      const refresh = jwt<DecodedJWT>(refreshToken)
      loadUserProfile(access.user_id)
      const decodedData = {
        user: access.user_id,
        access: {
          exp: access.exp,
          iat: access.iat
        },
        refresh: {
          exp: refresh.exp,
          iat: refresh.iat
        }
      }
      dispatch(logInUserSucceeded(decodedData))
    }
  }, [userState, authToken, loadUserProfile, dispatch, refreshToken])
  return (
    <Router>
      <Grid templateRows="70px 1fr 70px" height="100vh">
        <GridItem>
          <NavBar />
        </GridItem>

        <Switch>
          <Route path="/login/" render={() => <Login />} />
          <Route path="/register/" render={() => <Register />} />
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

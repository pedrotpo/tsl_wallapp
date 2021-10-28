import Axios from 'axios'
import jwt from 'jwt-decode'
import { BaseUser, UserDetail, Decoded } from 'commons/types'

const apiPath = 'http://localhost:8000/api'

const axios = Axios.create({
  baseURL: apiPath,
  timeout: 5000,
  headers: {
    Authorization: localStorage.getItem('access_token')
      ? `JWT ${localStorage.getItem('access_token')}`
      : '',
    'Content-Type': 'application/json',
    accept: 'application/json'
  }
})

// Set an interceptor to handle specific error cases and treat accordingly
axios.interceptors.response.use(
  (response) => {
    return response
  },
  async function (error) {
    const originalRequest = error.config

    if (typeof error.response === 'undefined') {
      return Promise.reject(error)
    }

    if (
      error.response.status === 401 &&
      originalRequest.url === `${apiPath}/token/refresh/`
    ) {
      window.location.href = '/login/'
      return Promise.reject(error)
    }

    if (
      error.response.data.code === 'token_not_valid' &&
      error.response.status === 401 &&
      error.response.statusText === 'Unauthorized'
    ) {
      const refreshToken = localStorage.getItem('refresh_token')

      if (refreshToken) {
        const tokenParts = jwt<Decoded>(refreshToken)
        const now = Math.ceil(Date.now() / 1000)

        if (tokenParts.exp > now) {
          return axios
            .post('/token/refresh/', { refresh: refreshToken })
            .then((response: any) => {
              //TODO Token Type
              localStorage.setItem('access_token', response.data.access)

              axios.defaults.headers.common[
                'Authorization'
              ] = `JWT ${response.data.access}`
              originalRequest.headers[
                'Authorization'
              ] = `JWT ${response.data.access}`

              return axios(originalRequest)
            })
            .catch((err) => {
              console.log(err)
            })
        } else {
          //If refresh token is expired, redirect to login screen
          window.location.href = '/login/'
        }
      } else {
        //If no refresh token is set, redirect to login screen
        window.location.href = '/login/'
      }
    }
    //Other errors should be handled by the duck from which it was called
    return Promise.reject(error)
  }
)

export default {
  auth: {
    login: (user: BaseUser) =>
      axios.post(`${apiPath}/token/`, user).then((res: any) => {
        localStorage.setItem('access_token', res.data.access)
        localStorage.setItem('refresh_token', res.data.refresh)
        axios.defaults.headers.common[
          'Authorization'
        ] = `JWT ${localStorage.getItem('access_token')}`
        return res.data
      }),
    validation: (config: any) =>
      axios.post(`${apiPath}/auth/validation`, config),
    logged: () => axios.get(`${apiPath}/auth/logged`),
    logout: () => axios.post(`${apiPath}/auth/logout`)
  },
  users: {
    createUser: (user: any) => axios.post(`${apiPath}/users/`, user),
    getUser: (id: number) => axios.get(`${apiPath}/users/${id}/`),
    updateUser: (id: number, user: any) =>
      axios.put(`${apiPath}/users/${id}/`, user)
  },
  posts: {
    getPosts: () => axios.get('/posts/'),
    createPosts: (post: any) => axios.post('/posts/', post)
  }
}

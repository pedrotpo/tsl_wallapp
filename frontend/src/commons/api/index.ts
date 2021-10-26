import Axios from 'axios'
import jwt from 'jwt-decode'
import { BaseUser, UserDetail, Decoded } from './types'

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

axios.interceptors.response.use(
  (response) => {
    return response
  },
  async function (error) {
    const originalRequest = error.config

    if (typeof error.response === 'undefined') {
      alert(
        'A server/network error occurred. ' +
          'Looks like CORS might be the problem. ' +
          'Sorry about this - we will get it fixed shortly.'
      )
      return Promise.reject(error)
    }

    if (
      error.response.status === 401 &&
      originalRequest.url === apiPath + 'token/refresh/'
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
              localStorage.setItem('access_token', response.data.access)
              localStorage.setItem('refresh_token', response.data.refresh)

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
          console.log('Refresh token is expired', tokenParts.exp, now)
          window.location.href = '/login/'
        }
      } else {
        console.log('Refresh token not available.')
        window.location.href = '/login/'
      }
    }

    // specific error handling done elsewhere
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
        return jwt<Decoded>(res.data.access)
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
    createPosts: (post: any, token: any) =>
      axios.post('/posts/', post, {
        headers: { Authorization: `JWT ${token}` }
      })
  }
}

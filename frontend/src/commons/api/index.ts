import Axios from 'axios'
import jwt_decode from 'jwt-decode'
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

export default {
  auth: {
    login: (user: BaseUser) =>
      axios.post(`${apiPath}/token/`, user).then((res: any) => {
        localStorage.setItem('access_token', res.data.access)
        localStorage.setItem('refresh_token', res.data.refresh)
        axios.defaults.headers.common[
          'Authorization'
        ] = `JWT ${localStorage.getItem('access_token')}`
        return jwt_decode<Decoded>(res.data.access)
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

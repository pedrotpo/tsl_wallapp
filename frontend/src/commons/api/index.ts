import Axios from 'axios'
import jwt from 'jwt-decode'
import {
  BaseUser,
  UserDetail,
  DecodedJWT,
  JWTToken,
  BasePost
} from 'commons/types'
import {
  API_URL,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  TOKEN_URL,
  REFRESH_URL,
  USERS_URL,
  POSTS_URL
} from 'commons/constants'

const axios = Axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    Authorization: localStorage.getItem(ACCESS_TOKEN)
      ? `JWT ${localStorage.getItem(ACCESS_TOKEN)}`
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

    if (
      (error.response.data.code === 'token_not_valid' &&
        error.response.status === 401 &&
        error.response.statusText === 'Unauthorized') ||
      error.response.status === 403
    ) {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN)

      if (refreshToken) {
        const tokenParts = jwt<DecodedJWT>(refreshToken)
        const now = Math.ceil(Date.now() / 1000)

        if (tokenParts.exp > now) {
          return axios
            .post<JWTToken>(REFRESH_URL, { refresh: refreshToken })
            .then((response) => {
              localStorage.setItem(ACCESS_TOKEN, response.data.access)

              axios.defaults.headers.common[
                'Authorization'
              ] = `JWT ${response.data.access}`
              originalRequest.headers[
                'Authorization'
              ] = `JWT ${response.data.access}`

              return axios(originalRequest)
            })
            .catch((error) => {
              return Promise.reject(error)
            })
        } else {
          //If refresh token is expired, redirect to login screen
          return Promise.reject(error)
        }
      } else {
        //If no refresh token is set, redirect to login screen
        return Promise.reject(error)
      }
    }
    //Other errors should be handled by the duck from which it was called
    return Promise.reject(error)
  }
)

const config = {
  headers: { Authorization: `JWT ${localStorage.getItem(ACCESS_TOKEN)}` }
}

export default {
  auth: {
    login: (user: BaseUser) =>
      axios.post<JWTToken>(TOKEN_URL, user).then((res) => {
        localStorage.setItem(ACCESS_TOKEN, res.data.access)
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
        axios.defaults.headers.common[
          'Authorization'
        ] = `JWT ${res.data.access}`
        return res.data
      })
  },
  users: {
    createUser: (user: UserDetail) => axios.post(USERS_URL, user, config),
    getUser: (id: number) => {
      return axios.get(`${USERS_URL}${id}/`, config)
    },
    updateUser: (id: number, user: UserDetail) =>
      axios.put(`${USERS_URL}${id}/`, user, config)
  },
  posts: {
    getPosts: (): any => axios.get(POSTS_URL),
    createPosts: (post: BasePost) => axios.post(POSTS_URL, post, config),
    deletePost: (id: number) => axios.delete(`${POSTS_URL}${id}/`, config)
  }
}

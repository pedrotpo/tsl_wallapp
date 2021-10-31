import jwt from 'jwt-decode'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import api from 'commons/api'
import type { RootState, AppDispatch, Decoded } from 'commons/types'
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'commons/constants'

import {
  logInUserStarted,
  logInUserSucceeded,
  logInUserFailed,
  logOutUser
} from 'commons/ducks/auth'

import {
  loadUserProfileStarted,
  loadUserProfileSucceeded,
  loadUserProfileFailed,
  clearUser
} from 'commons/ducks/user'

import {
  loadPostsStarted,
  loadPostsSucceeded,
  loadPostsFailed
} from 'commons/ducks/posts'

// Redux Typed Hooks
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// Ducks Hooks
export const useDucks = () => {
  const dispatch = useAppDispatch()
  return {
    loadPosts: async () => {
      dispatch(loadPostsStarted())
      try {
        const { data: posts } = await api.posts.getPosts()
        dispatch(loadPostsSucceeded(posts))
        Promise.resolve(posts)
      } catch (error: any) {
        dispatch(loadPostsFailed(error.message))
        Promise.reject(error)
      }
    },
    loadUserProfile: async (id: number | any) => {
      dispatch(loadUserProfileStarted())
      try {
        const { data } = await api.users.getUser(id)
        dispatch(loadUserProfileSucceeded(data))
      } catch (error: any) {
        dispatch(loadUserProfileFailed(error.message))
        Promise.reject(error)
      }
    },
    logInUser: async (values: any) => {
      dispatch(logInUserStarted())
      try {
        const res = await api.auth.login({
          email: values.email,
          password: values.password
        })
        const access = jwt<Decoded>(res.access)
        const refresh = jwt<Decoded>(res.refresh)
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
        return decodedData.user
      } catch (error: any) {
        dispatch(logInUserFailed(error.message))
        Promise.reject(error)
      }
    },
    logOutUser: () => {
      localStorage.removeItem(ACCESS_TOKEN)
      localStorage.removeItem(REFRESH_TOKEN)
      dispatch(logOutUser())
      dispatch(clearUser())
    },
    createPosts: async (value: any) => {
      try {
        const res = await api.posts.createPosts(value)
        Promise.resolve(res)
      } catch (error: any) {
        Promise.reject(error)
      }
    },
    deletePost: async (id: any) => {
      try {
        const res = await api.posts.deletePost(id)
        Promise.resolve(res)
      } catch (error: any) {
        Promise.reject(error)
      }
    }
  }
}

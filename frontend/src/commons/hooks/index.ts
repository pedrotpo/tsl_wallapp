import jwt from 'jwt-decode'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import api from 'commons/api'
import type { RootState, AppDispatch, Decoded } from 'commons/types'

import {
  logInUserStarted,
  logInUserSucceeded,
  logInUserFailed
} from 'commons/ducks/auth'

import {
  loadUserProfileStarted,
  loadUserProfileSucceeded,
  loadUserProfileFailed
} from 'commons/ducks/user'

import {
  createPostsStarted,
  createPostsSucceeded,
  createPostsFailed,
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
        console.log(data)
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
        console.log(res)
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
    createPosts: async (value: any) => {
      dispatch(createPostsStarted(value))
      try {
        const res = await api.posts.createPosts(value)
        dispatch(createPostsSucceeded())
        Promise.resolve(res)
      } catch (error: any) {
        console.log(error)
        dispatch(createPostsFailed(error.message))
        Promise.reject(error)
      }
    }
  }
}

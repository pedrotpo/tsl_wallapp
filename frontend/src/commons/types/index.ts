import store from 'commons/ducks/store'

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export interface BaseUser {
  id?: number
  email: string
  password?: string
}

export interface UserDetail extends BaseUser {
  first_name: string
  last_name: string
}

export interface DecodedJWT {
  exp: number
  iat: number
  jti: string
  token_type: string
  user_id: number
}

export interface JWTToken {
  access: string
  refresh: string
}

export interface BasePost {
  content: string
  author_id: number
}

export interface PostDetail extends BasePost {
  id: number
  author: string
  published: string
}

export interface AuthUserToken {
  exp: number
  iat: number
}
export interface AuthUser {
  user: number
  access: AuthUserToken
  refresh: AuthUserToken
}

export interface BaseUser {
  email: string
  password: string
}

export interface UserDetail extends BaseUser {
  first_name: string
  last_name: string
}

export interface Decoded {
  exp: number
  iat: number
  jti: string
  token_type: string
  user_id: number
}

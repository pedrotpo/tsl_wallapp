import { combineReducers } from 'redux'

// Reducers
// import { reducer as formReducer } from 'redux-form'
// import { reducer as notifications } from 'react-notification-system-redux'
import userReducer, { DUCK_NAME as USER_DUCK_NAME } from './user'
import postReducer, { DUCK_NAME as POSTS_DUCK_NAME } from './posts'
import authReducer, { DUCK_NAME as AUTH_DUCK_NAME } from './auth'

const reducer = combineReducers({
  [USER_DUCK_NAME]: userReducer,
  [POSTS_DUCK_NAME]: postReducer,
  [AUTH_DUCK_NAME]: authReducer
})

export default reducer

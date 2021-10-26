import { combineReducers } from 'redux'

// Reducers
// import { reducer as formReducer } from 'redux-form'
// import { reducer as notifications } from 'react-notification-system-redux'
import userReducer, { DUCK_NAME as USER_DUCK_NAME } from './user'
import postReducer, { DUCK_NAME as POSTS_DUCK_NAME } from './posts'

const reducer = combineReducers({
  [USER_DUCK_NAME]: userReducer,
  [POSTS_DUCK_NAME]: postReducer
})

export default reducer

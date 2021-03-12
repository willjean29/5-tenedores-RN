import {
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
  RELOAD_USER
} from './AuthTypes';

const AuthReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loading: true
      }
    case RELOAD_USER:
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false
      }
    case LOGIN_ERROR:
      return {
        ...state,
        user: false,
        loading: false
      }
    case LOGOUT: 
      return {
        user: false,
        loading: null,
        error: null
      }
    default:
      return state
  }
}

export default AuthReducer;
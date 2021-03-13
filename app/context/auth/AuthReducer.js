import {
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  REGISTER,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
  RELOAD_USER,
  RELOAD_USER_SUCCESS,
  RELOAD_USER_ERROR
} from './AuthTypes';

const AuthReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
    case REGISTER:
    case RELOAD_USER:
    case LOGOUT: 
      return {
        ...state,
        loading: true
      }
    case REGISTER_SUCCESS:
    case RELOAD_USER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false
      }
    case RELOAD_USER_ERROR:
    case LOGIN_ERROR:
    case REGISTER_ERROR:
      return {
        ...state,
        user: false,
        loading: false
      }
    case LOGOUT_ERROR:
      return {
        ...state,
        loading: false
      }
    case LOGOUT_SUCCESS: 
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
import React,{ useReducer } from 'react';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import firebase from '../../database/firebase';
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
  RELOAD_USER_ERROR,
  RELOAD_USER_SUCCESS
} from './AuthTypes';
const AuthState = (props) => {
  const initialState = {
    user: null,
    loading: null,
    error: null
  }
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const registerUser = async(email,password) => {
    dispatch({
      type: REGISTER
    })
    try {
      const user = await firebase.auth.createUserWithEmailAndPassword(email,password);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: user.user
      })
    } catch (error) {
      dispatch({
        type: REGISTER_ERROR,
        payload: user
      })
      throw new Error ("Error register");
    }
  }

  const loginUser = async(email, password) => {
    dispatch({
      type: LOGIN
    })
    try {
      const user = await firebase.auth.signInWithEmailAndPassword(email, password);
  
      dispatch({
        type: LOGIN_SUCCESS,
        payload: user.user
      })
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR
      })    
      throw new Error ("Ups");
    }
  }

  const logoutUser = async() => {
    dispatch({
      type: LOGOUT
    })
    try {
      await firebase.auth.signOut();
      dispatch({
        type: LOGOUT_SUCCESS
      })
    } catch (error) {
      dispatch({
        type: LOGOUT_ERROR
      })
    }
  }

  const reloadUser = () => {
    dispatch({
      type: RELOAD_USER
    })
    firebase.auth.onAuthStateChanged((user) =>{
      if (user === null){
        return (
          dispatch({
            type: RELOAD_USER_ERROR
          })
        )
      }
      dispatch({
        type: RELOAD_USER_SUCCESS,
        payload: user
      })
    });
  }
  return (  
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        loginUser,
        logoutUser,
        reloadUser,
        registerUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
 
export default AuthState;
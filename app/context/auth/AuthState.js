import React,{ useReducer } from 'react';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import firebase from '../../database/firebase';
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
const AuthState = (props) => {
  const initialState = {
    user: null,
    loading: null,
    error: null
  }
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const loginUser = async(email, password) => {
    let resp = false;
    dispatch({
      type: LOGIN
    })
    try {
      const user = await firebase.auth.signInWithEmailAndPassword(email, password);
      console.log(user);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: user.user
      })
      resp = true;
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR
      })    
      resp = false;
    }

    return resp;
  }

  const logoutUser = async() => {
    try {
      const user = await firebase.auth.signOut();
      dispatch({
        type: LOGOUT
      })
    } catch (error) {
      console.log(error)
    }
  }

  const reloadUser = () => {
    firebase.auth.onAuthStateChanged((user) =>{
      if (user === null){
        return (
          dispatch({
            type: RELOAD_USER,
            payload: false
          })
        )
      }
      // console.log("reload", user);
      dispatch({
        type: RELOAD_USER,
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
        reloadUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
 
export default AuthState;
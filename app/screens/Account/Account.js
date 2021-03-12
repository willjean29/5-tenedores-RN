import React, {useState, useEffect, useContext} from 'react';
import firebase from '../../database/firebase';
import AuthContext from '../../context/auth/AuthContext';
import UserLogged from './UserLogged';
import UserGuest from './UserGuest';

import Loading from '../../components/Loading';

const Account = () => {
  const {user,reloadUser} = useContext(AuthContext);
  // console.log(user);
  useEffect(() => {
    reloadUser();
  }, [])
  if(user === null) return <Loading isVisible={true} text="Cargando ..."/>
  return user ? <UserLogged/> : <UserGuest/>;
}
 
export default Account;
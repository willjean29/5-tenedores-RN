import React, {useState, useEffect} from 'react';
import firebase from '../../database/firebase';

import UserLogged from './UserLogged';
import UserGuest from './UserGuest';

import Loading from '../../components/Loading';

const Account = () => {
  const [login, setLogin] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    firebase.auth.onAuthStateChanged(user => {
      user ? setLogin(true) : setLogin(false)
    })
  }, [])
  if(login == null) return <Loading isVisible={true} text="Cargando ..."/>
  return ( 
    login ? <UserLogged/> : <UserGuest/>
  );
}
 
export default Account;
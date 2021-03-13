import React, {useEffect, useContext, useState} from 'react';
import AuthContext from '../../context/auth/AuthContext';
import UserLogged from './UserLogged';
import UserGuest from './UserGuest';

import Loading from '../../components/Loading';

const Account = () => {
  const [reloadUserInfo, setReloadUserInfo] = useState(false);
  const {user,reloadUser} = useContext(AuthContext);
  useEffect(() => {
    reloadUser();
    setReloadUserInfo(false);
  }, [reloadUserInfo])
  if(user === null) return <Loading isVisible={true} text="Cargando ..."/>
  return user ? <UserLogged setReloadUserInfo={setReloadUserInfo}/> : <UserGuest/>;
}
 
export default Account;
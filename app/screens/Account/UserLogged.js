import React, { useEffect, useRef, useState, useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Toast from 'react-native-easy-toast';
import { Button } from 'react-native-elements';
import AuthContext from '../../context/auth/AuthContext';
import Loading from '../../components/Loading';
import firebase from '../../database/firebase';
import InfoUser from './InfoUser';

const UserLogged = ({setReloadUserInfo}) => {
  const toast = useRef();
  const {user, logoutUser} = useContext(AuthContext);
  const [isVisible, setIsVisible] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  const handleLogaut = () => {
    logoutUser();
  }
  return ( 
    <View style={styles.viewUserInfo}>
      {user && (
        <InfoUser
          userInfo={user}
          setReloadUserInfo={setReloadUserInfo}
          setIsVisible={setIsVisible}
          setLoadingText={setLoadingText}
          toast={toast}
        />
      )}

      <Text>AccountOptions ...</Text>

      <Button
        title="Cerrar Sesión"
        containerStyle={styles.btnCloseSesionContainer}
        buttonStyle={styles.btnCloseSesion}
        titleStyle={styles.btnCloseSesionText}
        onPress={handleLogaut}
      />
      <Toast ref={toast} position="center" opacity={0.8}/>
      <Loading
        isVisible={isVisible}
        text={loadingText}
      />
    </View>
   );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    minHeight: "100%",
    backgroundColor: "#f2f2f2"
  },
  btnCloseSesionContainer: {
    marginTop: 30,
  },
  btnCloseSesion: {
    borderRadius: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e3e3e3",
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
    paddingVertical: 10
  },
  btnCloseSesionText: {
    color: "#00a680"
  }
})
 
export default UserLogged;
import React from 'react';
import { Text, View, Button } from 'react-native';
import firebase from '../../database/firebase';

const UserLogged = () => {
  const handleLogaut = () => {
    console.log("click");
    firebase.auth.signOut();
  }
  return ( 
    <View>
      <Text>User Logged</Text>
      <Button
        title="Cerrar Sesión"
        onPress={handleLogaut}
      />
    </View>
   );
}
 
export default UserLogged;
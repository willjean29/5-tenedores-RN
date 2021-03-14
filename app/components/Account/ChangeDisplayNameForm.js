import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import firebase from '../../database/firebase';
const ChangeDisplayNameForm = ({userInfo, setReloadUserInfo, setIsVisible, toast}) => {
  const [displayName, setDisplayName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async() => {
    setIsLoading(true);
    const update = {
      displayName: displayName
    }
    try {
      await firebase.auth.currentUser.updateProfile(update);
      setIsLoading(false);
      setIsVisible(false);
      setReloadUserInfo(true);
      toast.current.show("Nombre actualizado");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsVisible(false);
      toast.current.show("Hubo un error");
    }
  }
  return (  
    <View style={styles.view}>
      <Input
        placeholder="Nombres y Apellidos"
        style={styles.input}
        defaultValue={userInfo.displayName}
        rightIcon={
          <Icon type="material-community" name="account-circle" color="#ccc"/>
        }
        onChangeText={(text) =>setDisplayName(text)}
      />
      <Button
        title="Cambiar Nombre"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
        loading={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
  },
  input: {
    marginBottom: 10
  },
  btnContainer: {
    marginTop: 10,
    width: "95%"
  },
  btn:{
    backgroundColor: "#00a680"
  }
})
 
export default ChangeDisplayNameForm;
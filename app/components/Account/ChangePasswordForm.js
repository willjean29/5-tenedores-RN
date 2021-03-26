import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import firebase from '../../database/firebase';
import { validationPassword } from '../../utils/validations';
import { reauthenticate } from '../../utils/api';
const ChangePasswordForm = ({userInfo, setReloadUserInfo, setIsVisible, toast}) => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const onSubmitPassword = async() => {
    console.log({newPassword,repeatNewPassword,password});
    if(newPassword === "" || repeatNewPassword === "" || password === ""){
      setErrors({
        newPassword: newPassword === "" && "La contraseña no puede estar vacia",
        repeatNewPassword: repeatNewPassword === "" && "La contraseña no puede estar vacia",
        password: password === "" && "La contraseña no puede estar vacia"
      })
    }else if(newPassword !== repeatNewPassword){
      setErrors({
        newPassword: "Las contraseñas no son iguales",
        repeatNewPassword: "Las contraseñas no son iguales",
      })
    }else if(!validationPassword(newPassword)){
      setErrors({
        newPassword: "La contraseña debe ser mayor a 6 caracteres",
        repeatNewPassword: "La contraseña debe ser mayor a 6 caracteres"
      })
    }else {
      setIsLoading(true);
      try {
        await reauthenticate(password);
        try {
          await firebase.auth.currentUser.updatePassword(newPassword);
          setIsLoading(false);
          setIsVisible(false);
          setReloadUserInfo(true);
          toast.current.show("Contraseña actualizada");
        } catch (error) {
          console.log(error);
          setIsLoading(false);
          setIsVisible(false);
          toast.current.show("Error al actualizar contraseña");
        }
      } catch (error) {
        console.log(error);
        setErrors({
          password: "La contraseña no es correcta"
        })
        setIsLoading(false);
      }
    }
    
  }
  return (  
    <View
      style={styles.view}
    >
      <Input
        placeholder="Contraseña Actual"
        password={true}
        secureTextEntry={showPassword ? false : true}
        value={password}
        onChangeText={(text) => setPassword(text)}
        rightIcon={
          <Icon type="material-community" name={showPassword ? "eye": "eye-off"} color="#ccc"
            onPress={() => setShowPassword(!showPassword)}
          />
        }
        errorMessage={errors.password}
      />
      <Input
        placeholder="Nueva Contraseña"
        password={true}
        secureTextEntry={showPassword ? false : true}
        value={newPassword}
        onChangeText={(text) => setNewPassword(text)}
        rightIcon={
          <Icon type="material-community" name={showPassword ? "eye": "eye-off"} color="#ccc"
            onPress={() => setShowPassword(!showPassword)}
          />
        }
        errorMessage={errors.newPassword}
      />
      <Input
        placeholder="Repetir Nueva Contraseña"
        password={true}
        secureTextEntry={showPassword ? false : true}
        value={repeatNewPassword}
        onChangeText={(text) => setRepeatNewPassword(text)}
        rightIcon={
          <Icon type="material-community" name={showPassword ? "eye": "eye-off"} color="#ccc"
            onPress={() => setShowPassword(!showPassword)}
          />
        }
        errorMessage={errors.repeatNewPassword}
      />
      <Button
        title="Cambiar Contraseña"
        buttonStyle={styles.btn}
        containerStyle={styles.btnContainer}
        loading={isLoading}
        onPress={onSubmitPassword}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
  },
  btnContainer:{
    width: "95%"
  },
  btn: {
    backgroundColor: "#00a680"
  }
})
 
export default ChangePasswordForm;
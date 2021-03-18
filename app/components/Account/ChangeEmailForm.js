import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import firebase from'../../database/firebase';
import {validationEmail} from '../../utils/validations';
import {reauthenticate} from '../../utils/api';
const ChangeEmailForm = ({userInfo, setReloadUserInfo, setIsVisible, toast}) => {
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const onSubmitEmail = async() => {
    if(email === userInfo.email){
      setErrors({email: "El email no ha cambiado"});
    }else if(!validationEmail(email) || email === ""){
      setErrors({email: "Email Inválido"});
    }else if(password === ""){
      setErrors({password: "El password es obligatorio"});
    }else {
      setIsLoading(true);
      try {
        await reauthenticate(password);
        try {
          await firebase.auth.currentUser.updateEmail(email);
          setIsLoading(false);
          setIsVisible(false);
          setReloadUserInfo(true);
          toast.current.show("Email actualizado con exito");
        } catch (error) {
          console.log(error);
          setIsLoading(false);
          setIsVisible(false);
          toast.current.show("Error al actualizar email");
        }
      } catch (error) {
        console.log(error);
        setErrors({password: "La contraseña no es correcta"});
        setIsLoading(false);
      }
    }
  }
  return (  
    <View
      style={styles.view}
    >
      <Input
        placeholder="Correo Electrónico"
        defaultValue={email}
        rightIcon={
          <Icon type="material-community" name="at" color="#ccc"/>
        }
        onChangeText={(text) => setEmail(text)}
        errorMessage={errors.email}
      />
      <Input
        placeholder="Contraseña"
        password={true}
        secureTextEntry={showPassword ? false : true}
        rightIcon={
          <Icon 
            type="material-community" 
            name={showPassword ? "eye-off" : "eye"} 
            color="#ccc"
            onPress={() => setShowPassword(!showPassword)}
          />
        }
        onChangeText={(text) => setPassword(text)}
        errorMessage={errors.password}
      />
      <Button
        title="Cambiar Email"
        buttonStyle={styles.btn}
        containerStyle={styles.btnContainer}
        loading={isLoading}
        onPress={onSubmitEmail}
      />
    </View>
  );
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
 
export default ChangeEmailForm;

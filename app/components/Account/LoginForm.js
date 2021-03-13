
import React, { useState, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Input, Button, Icon} from 'react-native-elements';
import AuthContext from '../../context/auth/AuthContext';
import firebase from '../../database/firebase';
import {validationEmail,validationPassword} from '../../utils/validations';
import Loading from '../Loading';

const LoginForm = ({toast}) => {
  const navigation = useNavigation();
  const {loginUser} = useContext(AuthContext);
  const [isVisible, setIsVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: ""
  })

  const handleChangeData = (text,name) => {
    setUserData({
      ...userData,
      [name] : text
    })
  }
  const handleSubmitLogin = async() => {
    if(userData.email === "" || userData.password === ""){
      toast.current.show("Todos los campos son Obligatorios");
    }else if (!validationEmail(userData.email)){
      toast.current.show("Ingrese un email válido");
    }else if(!validationPassword(userData.password)){
      toast.current.show("Contraseña minima de 6 caracteres")
    }else {
      setIsVisible(true);
      try {
        await loginUser(userData.email,userData.password);
        setIsVisible(false);
        navigation.navigate("account");
      }catch(error){
        setIsVisible(false);
        toast.current.show("Email o contraseña incorrectos");
      }
    }
  }
  return ( 
    <View style={styles.formContainer}>
      <Input
        placeholder="Correo Electrónico"
        containerStyle={styles.inputForm}
        onChangeText={(text) => handleChangeData(text,"email")}
        rightIcon={
          <Icon type="material-community" name="at"
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.inputForm}
        password={true}
        secureTextEntry={showPassword ? false : true}
        onChangeText={(text) => handleChangeData(text,"password")}
        rightIcon={
          <Icon type="material-community" name={showPassword ? "eye-off" : "eye"}
            iconStyle={styles.iconRight}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Button
        title="Iniciar Sesión"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btnSubmit}
        onPress={handleSubmitLogin}
      />
      <Loading
        isVisible={isVisible}
        text="Iniciando Sesión"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer:{
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30
  },
  inputForm: {
    width: "100%",
    marginTop: 20
  },
  btnContainer: {
    marginTop: 20,
    width: "95%",
  },
  btnSubmit: {
    backgroundColor: "#00a680"
  },
  iconRight: {
    color: "#e1e1e1"
  }
})
 
export default LoginForm;
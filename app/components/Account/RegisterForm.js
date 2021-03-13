import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import {Input, Icon, Button} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import AuthContext from '../../context/auth/AuthContext';
import firebase from '../../database/firebase';
import {validationEmail,validationPassword} from '../../utils/validations';
import Loading from '../Loading';
const RegisterForm = ({toast}) => {
  const navigation = useNavigation();
  const {registerUser} = useContext(AuthContext);
  const [isVisible, setIsVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleSubmitData = async() => {
    if(email === "" || password === "" || repeatPassword === ""){
      toast.current.show("Todos los campos son obligatorios");
    }else if (!validationEmail(email)){
      toast.current.show("ingrese un email valido")
    }else if (password !== repeatPassword){
      toast.current.show("Las contraseñas deben ser iguales")
    }else if (!validationPassword(password)){
      toast.current.show("La contraseña debe tener 6 caracteres minimo");
    }else{
      setIsVisible(true);
      try {
        await registerUser(email,password);
        setIsVisible(false);
        navigation.navigate("account");
      } catch (error) {
        console.log(error);
        setIsVisible(false);
        toast.current.show("Email ya se encuentra registrado");
      }
    }
  }
  return (  
    <View style={styles.formContainer}>
      <Input
        placeholder="Correo Electrónico"
        containerStyle={styles.inputForm}
        rightIcon={
          <Icon type="material-community" name="at"
            iconStyle={styles.iconRight}
          />
        }
        onChangeText={(text) => setEmail(text)}
  
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.inputForm}
        password={true}
        secureTextEntry={showPassword ? false : true}
        rightIcon={
          <Icon type="material-community" name={showPassword ? "eye-off" : "eye"}
            iconStyle={styles.iconRight}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
        onChangeText={(text) => setPassword(text)}
      />
      <Input
        placeholder="Repetir Contraseña"
        containerStyle={styles.inputForm}
        password={true}
        secureTextEntry={showRepeatPassword ? false : true}
        rightIcon={
          <Icon type="material-community" name={showRepeatPassword ? "eye-off" : "eye"}
            iconStyle={styles.iconRight}
            onPress={() => setShowRepeatPassword(!showRepeatPassword)}
          />
        }
        onChangeText={(text) => setRepeatPassword(text)}
      />
      <Button
        title="Unirse"
        containerStyle={styles.btnConatainerRegister}
        buttonStyle={styles.btnRegister}
        onPress={handleSubmitData}
      />
      <Loading 
        isVisible={isVisible}
        text="Registrando Usuario"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    marginTop: 30,
  },
  inputForm: {
    width: "100%",
    marginTop: 20
  },
  btnConatainerRegister: {
    marginTop: 20,
    marginHorizontal: "5%"
  },
  btnRegister: {
    backgroundColor: "#00a680"
  },
  iconRight: {
    color: "#e1e1e1"
  }
})
 
export default RegisterForm;
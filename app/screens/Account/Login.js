import React, { useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import {Divider} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import LoginForm from '../../components/Account/LoginForm';
import Toast from 'react-native-easy-toast';


const Login = () => {
  const toast = useRef();
  return (  
    <ScrollView>
      <Image
        source={require('../../../assets/img/5-tenedores-letras-icono-logo.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.viewContainer}>
        <LoginForm toast={toast}/>
        <CreateAccout></CreateAccout>
      </View>
      <Divider style={styles.divider}/>
      {/* <Text>Social Login</Text> */}
      <Toast ref={toast} position="center" opacity={0.8}/>
    </ScrollView>
  );
}

const CreateAccout = () => {
  const navigation = useNavigation();
  return (
    <Text style={styles.textRegister}>
      ¿Aún no tienes una cuenta? 
      <Text 
        style={styles.btnRegister}
        onPress={() => navigation.navigate("register")}
      >
        {`${" "}`}Registrate
      </Text>
    </Text>
  )
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 150,
    marginTop: 20
  },
  viewContainer: {
    marginHorizontal: 40
  },
  textRegister: {
    marginTop: 15,
    // marginLeft: 10,
    // marginRight: 10,
    textAlign: "center"
  },
  btnRegister: {
    color: "#00a680",
    fontWeight: "bold"
  },
  divider: {
    backgroundColor: "#00a680",
    margin: 40
  }
})
 
export default Login;
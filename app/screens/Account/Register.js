import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-easy-toast';
import RegisterForm from '../../components/Account/RegisterForm';


const Register = () => {
  const toast = useRef();
  return (  
    <KeyboardAwareScrollView>
      <Image
        source={require('../../../assets/img/5-tenedores-letras-icono-logo.png')}
        resizeMode="contain"
        style={styles.image}
      />
      <View style={styles.viewForm}>
        <RegisterForm toast={toast}/>
      </View>
      <Toast ref={toast} position="center" opacity={0.8}/>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 150,
    marginTop: 20
  },
  viewForm: {
    marginHorizontal: 40
  }
})
export default Register;
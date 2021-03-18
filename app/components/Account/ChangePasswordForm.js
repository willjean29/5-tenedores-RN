import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
const ChangePasswordForm = () => {
  return (  
    <View>
      <Input
        placeholder="Nueva Contraseña"
        password={true}
        secureTextEntry={true}
        rightIcon={
          <Icon type="material-community" name="eye-off" color="#ccc"/>
        }
      />
      <Input
        placeholder="Repetir Nueva Contraseña"
        password={true}
        secureTextEntry={true}
        rightIcon={
          <Icon type="material-community" name="eye-off" color="#ccc"/>
        }
      />
      <Input
        placeholder="Contraseña Actual"
        password={true}
        secureTextEntry={true}
        rightIcon={
          <Icon type="material-community" name="eye-off" color="#ccc"/>
        }
      />
      <Button
        title="Cambiar Nombre"
      />
    </View>
  )
}
 
export default ChangePasswordForm;
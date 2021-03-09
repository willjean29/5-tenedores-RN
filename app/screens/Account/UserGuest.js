import React from 'react';
import { Text, View, ScrollView, Image, StyleSheet } from 'react-native';
import {Button} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';

const UserGuest = () => {
  const navigation = useNavigation();
  return ( 
    <ScrollView centerContent={true} style={styles.viewBody}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={require("../../../assets/img/user-guest.jpg")}
      />
      <Text style={styles.title}>Consulta tu perfil de 7 Tenedores</Text>
      <Text style={styles.description}>
        ¿Como describirías tu mejor restaurante? Busca y visualiza los mejores restaurantes de una forma sencilla, vota cual te ha gustado más y comenta como ha sito tu experiencia.
      </Text>
      <View style={styles.viewBtn}>
        <Button
          title="Ver tu perfil"
          buttonStyle={styles.btnStyle}
          containerStyle={styles.btnContainer}
          onPress={() => navigation.navigate("login")}
        />
      </View>
    </ScrollView>
   );
}

const styles = StyleSheet.create({
  viewBody: {
    marginHorizontal: 30
  },
  image: {
    height: 300,
    width: "100%",
    marginBottom: 40,
    marginTop: 20,
    borderRadius: 10
  },
  title: {
    textAlign: "center",
    fontSize: 20, 
    fontWeight: 'bold',
    marginBottom: 10
  },
  description: {
    textAlign: "center",
    marginBottom: 20
  },
  viewBtn: {
    alignItems: "center",
  },
  btnStyle: {
    backgroundColor: "#00a680"
  },
  btnContainer: {
    width: "70%"
  }
})
 
export default UserGuest;
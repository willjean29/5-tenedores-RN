import React, { useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../../context/auth/AuthContext';

const Restaurants = () => {
  const {user, reloadUser} = useContext(AuthContext); 
  const navigation = useNavigation();
  const [reloadUserInfo, setReloadUserInfo] = useState(false);
  useEffect(() => {
    reloadUser();
    setReloadUserInfo(false);
  }, [reloadUserInfo])
  return ( 
    <View
      style={styles.viewBody}
    >
      <Text>Restaurants</Text>
      {
        user && (
          <Icon
            type="material-community"
            name="plus"
            color="#00a680"
            containerStyle={styles.containerIcon}
            iconStyle={styles.icon}
            reverse
            onPress={() => navigation.navigate("add-restaurant")}
          />
        )
      }

    </View>
   );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#fff"
  },
  containerIcon:{
    position: "absolute",
    bottom: 10,
    right: 10,
    shadowColor: "red",
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.5
  },
  icon:{
  }
})
 
export default Restaurants;
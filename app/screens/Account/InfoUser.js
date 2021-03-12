import { Icon } from 'expo';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
const InfoUser = ({userInfo}) => {
  // console.log(userInfo);
  return (  
    <View style={styles.viewUserInfo}>
      <Avatar
        rounded
        size="large"
        source={
          userInfo.photoUrl
            ? {uri: userInfo.photoUrl}
            : require('../../../assets/img/avatar-default.jpg')
        }
        activeOpacity={0.7}
        containerStyle={styles.userAvatarContainer}
      >
        <Avatar.Accessory size={22}/>
      </Avatar>
      <View>
        <Text style={styles.displayName}>Jean Osco</Text>
        <Text>{userInfo.email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    paddingVertical: 30,
  },
  userAvatarContainer: {
    backgroundColor: "gray",
    marginRight: 20
  },
  displayName: {
    fontWeight: "bold",
    paddingBottom: 5
  }
})
 
export default InfoUser;
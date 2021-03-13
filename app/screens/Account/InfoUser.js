import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import AvatarDefault from '../../../assets/img/avatar-default.jpg';
import firebase from '../../database/firebase';
const InfoUser = ({userInfo, setReloadUserInfo, toast, setIsVisible, setLoadingText}) => {
  const openGaleryImages = async() => {
    const requestPermissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if(!requestPermissions.granted){
      toast.current.show("Se necesitan permisos para acceder a la galeria");
      return;
    }

    const mediaLibrary = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true
    });
    if(mediaLibrary.cancelled){
      toast.current.show("No se ha seleccionado imagen");
      return;
    }
    try {
      await uploadAvatar(mediaLibrary.uri);
      await updatePhotoUri();
    } catch (error) {
      console.log(error);
      toast.current.show("Error al subir la imagen");
    }
    
  }

  const uploadAvatar = async(uri) => {
    setLoadingText("Actualizando Avatar");
    setIsVisible(true);
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = firebase.storage.ref().child(`avatar/${userInfo.uid}`);
    return ref.put(blob);
  }

  const updatePhotoUri = async() => {
    try {
      const photo = await firebase.storage.ref(`avatar/${userInfo.uid}`).getDownloadURL();
      const update = {
        photoURL: photo
      }
      await firebase.auth.currentUser.updateProfile(update);
      setIsVisible(false);
      setReloadUserInfo(true);  
    } catch (error) {
      console.log(error);
      setIsVisible(false);
      toast.current.show("Error al actulizar la imagen");
    }
    
  }
  return (  
    <View style={styles.viewUserInfo}>
      <Avatar
        rounded
        size="large"
        source={
          userInfo.photoURL
            ? {uri: userInfo.photoURL}
            : AvatarDefault
        }
        activeOpacity={0.7}
        containerStyle={styles.userAvatarContainer}
      >
        <Avatar.Accessory 
          size={22}
          onPress={openGaleryImages}
        />
      </Avatar>
      <View>
        <Text style={styles.displayName}>{userInfo.displayName ? userInfo.displayName : "Anonimo"}</Text>
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
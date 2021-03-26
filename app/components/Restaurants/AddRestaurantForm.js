import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Input, Button, Icon, Avatar } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
const AddRestaurantForm = ({toast}) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [imagesSelected, setImagesSelected] = useState([]);
  const addRestaurant = () => {
    console.log("OK");
    console.log({name, address, description});
    console.log(imagesSelected);
  }
  return (  
    <ScrollView style={styles.scrollView} >
      <FormAdd
        setName={setName}
        setAddress={setAddress}
        setDescription={setDescription}
      />
      <UploadImage
        imagesSelected={imagesSelected}
        setImagesSelected={setImagesSelected}
        toast={toast}
      />
      <Button
        title="Crear Restaurante"
        buttonStyle={styles.btnAddRestaurant}
        onPress={addRestaurant}
      />
    </ScrollView>
  );
}

const FormAdd = ({setName, setAddress, setDescription}) => {
  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="Nombre del restaurante"
        onChangeText={(text) => setName(text)}
        containerStyle={styles.input}
      />
      <Input
        placeholder="Dirección"
        onChangeText={(text) => setAddress(text)}
        containerStyle={styles.input}
      />
      <Input
        placeholder="Descripcion del restaurante"
        onChangeText={(text) => setDescription(text)}
        inputContainerStyle={styles.textArea}
        multiline={true}
      />
    </View>
  )

}

const UploadImage = ({toast,setImagesSelected,imagesSelected}) => {
  const imageSelect = async() => {
    const requestPermissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if(!requestPermissions.granted){
      toast.current.show("Se necesitan permisos para acceder a la galeria")
      return;
    }
    const mediaLibrary = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true
    });

    if(mediaLibrary.cancelled){
      toast.current.show("No se ha seleccionado ninguna imagen")
      return;
    }
    setImagesSelected([...imagesSelected, mediaLibrary.uri])
  }
  
  const deleteImage = (img) => {
    Alert.alert(
      "Eliminar Imagen",
      "¿Desea eliminar esta imagen?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Si, eliminar",
          onPress: () => {
            const images = imagesSelected.filter((image) => image !== img);
            setImagesSelected(images);
          }
        }
      ],
      {cancelable: true}
    );
  }
  return (
    <View style={styles.viewImage}>
      {
        (imagesSelected.length < 4) && (
          <Icon
            type="material-community"
            name="camera"
            color="#7a7a7a"
            containerStyle={styles.icon}
            onPress={imageSelect}
          />
        )
      }
      <ScrollView style={styles.carousel} horizontal>
      {
        imagesSelected.map((image,index) => (
          <Avatar
            key={index}
            style={styles.miniatureStyle}
            source={{uri: image}}
            onPress={() => deleteImage(image)}
          />
        ))
      }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    height: "100%"
  },
  viewForm: {
    marginHorizontal: 10
  },
  input: {
    marginBottom: 10
  },
  textArea: {
    height: 100,
    width: "100%",
    padding: 0,
    margin: 0
  },
  btnAddRestaurant: {
    marginHorizontal: 20,
    backgroundColor: "#00a680"
  },
  viewImage: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginVertical: 20
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    height: 70,
    width: 70,
    backgroundColor: "#e3e3e3"
  },
  miniatureStyle: {
    marginRight: 10,
    height: 70,
    width: 70,
  },
})
 
export default AddRestaurantForm;
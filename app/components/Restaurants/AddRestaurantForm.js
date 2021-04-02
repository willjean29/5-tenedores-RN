import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Dimensions } from 'react-native';
import { Input, Button, Icon, Avatar, Image } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import uuid from 'random-uuid-v4';
import Modal from '../../components/Modal';
import firebase from '../../database/firebase';
import ImageDefault from '../../../assets/img/no-image.png';
const widthScreen = Dimensions.get("window").width;
const AddRestaurantForm = ({toast,setIsVisible}) => {
  const api = 'https://meet.arcavirtual.net/ejercicios/all';

  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [imagesSelected, setImagesSelected] = useState([]);
  const [isVisibleMap, setIsVisibleMap] = useState(false);
  const [locationRestaurant, setlLocationRestaurant] = useState(null);
  const addRestaurant = async() => {
    if(!name || !address || !description){
      toast.current.show("Todos los campos son obligatorios");
    }else if(imagesSelected.length === 0){
      toast.current.show("El restaurante debe tener una imagen");
    }else if(!locationRestaurant){
      toast.current.show("Seleccione una ubicación para el restaurante");
    }else{
      setIsVisible(true);
      try {
        const images = await uploadImageStorage(imagesSelected);
        await firebase.db.collection("restaurants").add({
          name,
          address,
          description,
          location: locationRestaurant,
          images,
          rating: 0,
          ratingTotal: 0,
          quantityVoting: 0,
          createAt: new Date(),
          createBy: firebase.auth.currentUser.uid
        })
        setIsVisible(false);
        toast.current.show("Restaurante creado con exito");
        navigation.navigate("restaurants");
      } catch (error) {
        console.log(error);
        setIsVisible(false);
        toast.current.show("Error al crear restaurante");
      }

    }

  }
  const uploadImageStorage = async(images) => {
    const imagesUrl = [];
    await Promise.all(
      images.map(async(image) => {
        const name = uuid()
        const response = await fetch(image);
        const blob = await response.blob();
        const ref = firebase.storage.ref("restaurants").child(name);
        await ref.put(blob);
        const photoName = await firebase.storage.ref(`restaurants/${name}`).getDownloadURL();
        imagesUrl.push(photoName);
      })
    )
    return imagesUrl;
  }
  return (  
    <ScrollView style={styles.scrollView} >
      <ImageRestautant imagesSelected={imagesSelected}/>
      <FormAdd
        setName={setName}
        setAddress={setAddress}
        setDescription={setDescription}
        setIsVisibleMap={setIsVisibleMap}
        locationRestaurant={locationRestaurant}
        address={address}
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
      <Map
        isVisibleMap={isVisibleMap}
        setIsVisibleMap={setIsVisibleMap}
        setlLocationRestaurant={setlLocationRestaurant}
        setAddress={setAddress}
        toast={toast}
      />
    </ScrollView>
  );
}

const ImageRestautant = ({imagesSelected}) => {
  return (
    <View style={styles.viewPhoto}>
      <Image
        source={
          imagesSelected[0] ? {uri:imagesSelected[0]} : ImageDefault
        }
        style={{height: 150, width: widthScreen}}
      />
    </View>
  )
}

const FormAdd = ({setName, setAddress, setDescription,setIsVisibleMap,locationRestaurant,address}) => {
  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="Nombre del restaurante"
        onChangeText={(text) => setName(text)}
        containerStyle={styles.input}
      />
      <Input
        placeholder="Dirección"
        defaultValue={`${address.substr(0,35)}`}
        disabled
        // onChangeText={(text) => setAddress(text)}
        containerStyle={styles.input}
        rightIcon={
          <Icon
            type="material-community"
            name="google-maps"
            color={locationRestaurant ? "#00a680":"#c2c2c2"}
            onPress={() => setIsVisibleMap(true)}
          />
        }
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

const Map = ({isVisibleMap, setIsVisibleMap,toast,setlLocationRestaurant,setAddress}) => {
  const [location, setLocation] = useState(null);
  useEffect(() => {
    const getLocation = async() => {
      const requestPermissions = await Location.requestPermissionsAsync();
      if(!requestPermissions.granted){
        toast.current.show("Se necesitan permisos para acceder a la ubicación del dispositivo");
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});

      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001
      })
    }
    getLocation();
  }, [])

  const saveLocation = async() => {
    setlLocationRestaurant(location);
    setIsVisibleMap(false);
    const api = `https://api.opencagedata.com/geocode/v1/json?q=${location.latitude}+${location.longitude}&key=a08ab980938843789855fc7e05f161d3&no_annotations=1&language=es`
    fetch(api)
    .then((response) => response.json())
    .then((json) => {
      setAddress(json.results[0].formatted);
    })
    .catch((error) => {
      console.error(error);
    });

    toast.current.show("Localización guardada con exito");
  }
  return (
    <Modal
      isVisible={isVisibleMap}
      setIsVisible={setIsVisibleMap}
    >
      <View>
        {location && (
          <MapView
            style={styles.mapStyles}
            initialRegion={location}
            showsUserLocation={true}
            onRegionChange={(region) => setLocation(region)}
          >
            <MapView.Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude
              }}
              draggable
              pinColor={"#00a680"}
            />
          </MapView>
        )}

        <View style={styles.viewMapsBtn}>
          <Button
            title="Guardar Ubicación"
            buttonStyle={styles.mapsBtnSave}
            onPress={saveLocation}
          />
          <Button
            title="Cancelar Ubicación"
            buttonStyle={styles.mapsBtnCancel}
            onPress={() => setIsVisibleMap(false)}
          />
        </View>
      </View>
    </Modal>
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
  viewPhoto: {
    // height: 200
    marginBottom: 20
  },
  mapStyles: {
    height: 500,
    width: "100%"
  },
  viewMapsBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  },
  mapsBtnSave: {
    backgroundColor: "#00a680"
  },
  mapsBtnCancel: {
    backgroundColor: "#a60d0d"
  }
})
 
export default AddRestaurantForm;
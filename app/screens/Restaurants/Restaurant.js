import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Dimensions, Platform } from 'react-native';
import { Rating, ListItem, Button, Icon } from 'react-native-elements';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import MapView from 'react-native-maps'; 
import openMap from 'react-native-open-maps';
import Toast from 'react-native-easy-toast';
import AuthContext from '../../context/auth/AuthContext';
import Carousel from '../../components/Corousel';
import Loading from '../../components/Loading';
import ListReviewRestaurant from '../../components/Restaurants/ListReviewRestaurant';
import firebase from '../../database/firebase';
const screenWidth = Dimensions.get('window').width;
const Restaurant = ({route,navigation}) => {
  const {params} = route;
  const {id, name} = params.restaurant;
  const {user} = useContext(AuthContext);
  const [restaurant, setRestaurant] = useState(null);
  const [rating, setRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const toast = useRef();
  useFocusEffect(
    useCallback(() => {
      const getRestaurant = async() => {
        const doc = await firebase.db.collection("restaurants").doc(id);
        const restaurant = await doc.get();
        navigation.setOptions({
          title: name
        })
        setRating(restaurant.data().rating)
        setRestaurant(restaurant.data());
      }
      getRestaurant();
    },[])
  )

  useEffect(() => {
    const getIsFavorite = async() => {
      if(restaurant){
        const response = await firebase.db.collection("favorites").where("idRestaurant","==",id).get();
        if(response.docs.length === 1){
          setIsFavorite(true);
        };
      }
    }
    getIsFavorite();
  }, [restaurant])
  const addFavorite = async() => {
    if(!user){
      toast.current.show("Para usar esta opción debe iniciar sesión");
      return;
    }else{
      const payload = {
        idUser: user.uid,
        idRestaurant: id
      }
      try {
        await firebase.db.collection("favorites").add(payload);
        setIsFavorite(true);
        toast.current.show("Restaurante agregado a favoritos");
      } catch (error) {
        console.log(error);
        toast.current.show("Error al agregar a favoritos");
      }
     
    }
  }

  const removeFavorite = async() => {
    if(!user){
      toast.current.show("Para usar esta opción debe iniciar sesión");
      return;
    }else{
      const response = await firebase.db.collection("favorites").where("idRestaurant","==",id).get();
      response.forEach(async(doc) => {
        const idDelete = doc.id;
        try {
          await firebase.db.collection("favorites").doc(idDelete).delete();
          setIsFavorite(false);
          toast.current.show("Restaurante removido de favoritos");
        } catch (error) {
          console.log(error);
          toast.current.show("Error al eliminar de favoritos");
        }
      })
    }
  }

  if (!restaurant) return <Loading isVisible={true} text="Cargando..." />;
  return (  
    <ScrollView style={styles.viewBody}>
      <View style={styles.viewFavorite}>
        <Icon
          type="material-community"
          name={isFavorite ? "heart" : "heart-outline" }
          onPress={isFavorite ? removeFavorite : addFavorite }
          color={isFavorite ? "#f00" : "#000" }
          size={26}
          underlayColor="transparent"
        />
      </View>
      <Carousel
        arrayImages={restaurant.images}
        height={200}
        width={screenWidth}
      />
      <TitleRestaurant
        name={restaurant.name}
        description={restaurant.description}
        rating={rating}
      />
      <RestaurantInfo
        restaurant={restaurant}
      />
      <ListReviewRestaurant
        idRestaurant={id}
      />
      <Toast ref={toast} position="center" opacity={0.8}/>
    </ScrollView>
  );
}

const TitleRestaurant = ({name, description, rating}) => {
  return (
    <View style={styles.viewRestaurantTitle}>
      <View style={{flexDirection: "row"}}>
        <Text style={styles.nameRestaurant}>{name}</Text>
        <Rating
          style={styles.rating}
          imageSize={25}
          readonly
          startingValue={parseFloat(rating)}
        />
      </View> 
      <Text style={styles.descriptionRestaurant}>{description}</Text>
    </View>
  )
}

const RestaurantInfo = ({restaurant}) => {
  const listInfo = [
    {
      text: restaurant.address,
      iconName: "map-marker",
      iconType: "material-community",
      color: "#00a680",
      action: null
    },
    // {
    //   text: "926-594-773",
    //   iconName: "phone",
    //   iconType: "material-community",
    //   color: "#00a680",
    //   action: null
    // },
    // {
    //   text: "willjean29@gmail.com",
    //   iconName: "at",
    //   iconType: "material-community",
    //   color: "#00a680",
    //   action: null
    // }
  ]
  return (
    <View style={styles.viewRestaurantInfo}>
      <Text style={styles.restaurantInfoTitle}>
        Informacion sobre el restaurante
      </Text>
      <Map
        name={restaurant.name}
        location={restaurant.location}
        address={restaurant.address}
      />
      {
        listInfo.map((item, index) => (
          <ListItem
            key={index}
            containerStyle={styles.containerListItem}
          >
            <ListItem.Chevron
              type={item.iconType}
              name={item.iconName}
              color={item.color}
              size={22}
            />
            <ListItem.Content>
              <ListItem.Title>
                {item.text}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))
      }
    </View>
  )
}

const Map = ({location, name, address}) => {
  const openViewMap = () => {
    openMap({
      latitude: location.latitude,
      longitude: location.longitude,
      provider: Platform.OS === "android" ? ['google'] : ['apple'],
      zoom: 19,
      end: address
    })
  }
  return (
    <View style={styles.viewMap}>
      <MapView
        style={styles.viewMapRestaurant}
        initialRegion={location}
        showsUserLocation={true}
        onPress={openViewMap}
      >
        <MapView.Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude
          }}
          pinColor={"#00a680"}
        />
      </MapView>

    </View>
  )
}
const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#fff"
  },
  viewRestaurantTitle: {
    padding: 15
  },
  nameRestaurant: {
    fontSize: 20,
    fontWeight: "bold"
  },
  descriptionRestaurant: {
    marginTop: 5,
    color: "gray"
  },
  rating: {
    position: 'absolute',
    right: 0
  },
  viewRestaurantInfo: {
    margin: 15,
    marginTop: 10
  },
  restaurantInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  viewMapRestaurant: {
    height: 150,
    width: "100%"
  },
  containerListItem: {
    borderBottomColor: "#d8d8d8",
    borderBottomWidth: 1
  },
  viewFavorite: {
    top: 0,
    position: "absolute",
    right: 0,
    zIndex: 2,
    backgroundColor: "#fff",
    borderRadius: 100,
    padding: 10
  }
})
 
export default Restaurant;
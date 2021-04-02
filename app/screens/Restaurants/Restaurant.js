import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Dimensions, Platform } from 'react-native';
import { Rating, ListItem } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import MapView from 'react-native-maps'; 
import openMap from 'react-native-open-maps';
import Carousel from '../../components/Corousel';
const screenWidth = Dimensions.get('window').width;
const Restaurant = ({route}) => {
  const navigation = useNavigation();
  const {params: {restaurant}} = route;
  const [rating, setRating] = useState(restaurant.rating);
  const listInfo = [
    {
      text: restaurant.address,
      iconName: "map-marker",
      iconType: "material-community",
      color: "#00a680",
      action: null
    },
    {
      text: "926-594-773",
      iconName: "phone",
      iconType: "material-community",
      color: "#00a680",
      action: null
    },
    {
      text: "willjean29@gmail.com",
      iconName: "at",
      iconType: "material-community",
      color: "#00a680",
      action: null
    }
  ]
  useEffect(() => {
    navigation.setOptions({
      title: restaurant.name
    })
  }, [])
  return (  
    <ScrollView style={styles.viewBody}>
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
      <Text style={styles.restaurantInfoTitle}>
        Informacion sobre el restaurante
      </Text>
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
  viewMap: {
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
    // borderWidth: 3,
    borderBottomColor: "#d8d8d8",
    borderBottomWidth: 1
  }
})
 
export default Restaurant;
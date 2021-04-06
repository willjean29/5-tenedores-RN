import React from 'react';
import { View, StyleSheet, FlatList, Text, ActivityIndicator, TouchableOpacity} from 'react-native';
import { Image, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native'
import ImageDefault from '../../../assets/img/no-image.png';
const ListRestaurants = ({restaurants,handleLoadMore,isLoading}) => {

  if(restaurants && restaurants.length === 0) return (
    <NotFoundRestaurants/>
  )
  return (  
    <View style={styles.viewRestaurants}>
      {
        (restaurants) ? (
          <>
            <FlatList
              data={restaurants}
              renderItem={({item}) => <RestaurantItem restaurant={item}/>}
              keyExtractor={(item) => item.id}
              onEndReachedThreshold={0.5}
              onEndReached={handleLoadMore}
              ListFooterComponent={<FooterList isLoading={isLoading}/>}
            />
          </>
        ) : (
          <View style={styles.loaderRestaurants}>
            <ActivityIndicator size="large" color="#00a680"/>
            <Text>Cargando Restaurantes ... </Text>
          </View>
        )
      }
    </View>
  );
}

const RestaurantItem = ({restaurant}) => {
  // console.log(restaurant);
  const navigation = useNavigation();
  const goRestaurant = () => {
    console.log("OK");
    navigation.navigate("restaurant",{restaurant});
  }
  return (
    <TouchableOpacity onPress={goRestaurant}>
      <View style={styles.viewRestaurant}>
        <View style={styles.viewRestaurantImage}>
          <Image
            resizeMode="cover"
            source={
              restaurant.images[0] ? (
                {uri : restaurant.images[0]}
              ) : (
                ImageDefault
              )
            }
            PlaceholderContent={<ActivityIndicator size="large" color="#00a680"/>}
            style={styles.imageRestaurant}
          />
        </View>
        <View style={styles.viewInfoRestaurant}>
          <Text style={styles.restaurantName}>
            {restaurant.name}
          </Text>
          <Text style={styles.restaurantAddress}>
            {restaurant.address.substr(0,60)}...
          </Text>
          <Text style={styles.restaurantDescription}>
            {restaurant.description.substr(0,60)}...
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const FooterList = ({isLoading}) => {
  if(isLoading){
    return (
      <View style={styles.loaderRestaurants}>
        <ActivityIndicator size="large" color="#00a680"/>
      </View>
    )
  }else{
    return null;
  }
}

const NotFoundRestaurants = () => {
  return (
    <View style={styles.viewNotFound}>
      <Icon
        type="material-community"
        name="alert-outline"
        size={50}
      />
      <Text style={styles.txtNotFound}>No hay restaurantes registrados</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  viewRestaurants: {
    flex: 1,
    justifyContent: "center"
  },  
  viewRestaurant: {
    flexDirection: "row",
    margin: 10
  },
  loaderRestaurants: {
    alignItems: "center"
  },
  viewRestaurantImage:{
    marginRight: 15,
    borderRadius: 100
  },
  viewInfoRestaurant: {
    flex: 1, 
    marginRight: 15, 
    justifyContent: "center",
  },
  imageRestaurant: {
    borderRadius: 100,
    width: 100,
    height: 100
  },
  restaurantName: {
    fontWeight: "bold"
  },
  restaurantAddress: {
    paddingTop: 5,
    color: "gray",
  },
  restaurantDescription: {
    paddingTop: 2,
    color: "gray",
  },
  viewNotFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  txtNotFound: {
    fontWeight: "bold",
    fontSize: 20
  },
})
 
export default ListRestaurants;
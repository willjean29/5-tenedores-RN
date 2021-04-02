import React from 'react';
import { View, StyleSheet, FlatList, Text, ActivityIndicator, TouchableOpacity} from 'react-native';
import { Image } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native'
import ImageDefault from '../../../assets/img/no-image.png';
const ListRestaurants = ({restaurants,handleLoadMore,isLoading}) => {
  return (  
    <View style={styles.viewRestaurants}>

      {
        (restaurants.length > 0 ) ? (
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
    navigation.navigate("restaurant");
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
        <View>
          <Text style={styles.restaurantName}>
            {restaurant.name}
          </Text>
          <Text style={styles.restaurantAddress}>
            {restaurant.address}
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
  },
  imageRestaurant: {
    width: 80,
    height: 80
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
    width: 250
  }
})
 
export default ListRestaurants;
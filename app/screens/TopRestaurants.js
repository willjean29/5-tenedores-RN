import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { Card, Icon, Image, Rating } from'react-native-elements';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import firebase from '../database/firebase';
const TopRestaurants = () => {
  const [topRestaurants, setTopRestaurants] = useState(null);
  useFocusEffect(
    useCallback(() => {
      const getTopRestaurants = async() => {
        const totalRestaurants = [];
        const response = await firebase.db.collection("restaurants").orderBy("rating","desc").limit(5).get();
        response.forEach((doc) => {
          const restaurant = doc.data();
          restaurant.id = doc.id;
          totalRestaurants.push(restaurant);
        })
        setTopRestaurants(totalRestaurants);
      }
      getTopRestaurants();
    }, [])
  )

  if(topRestaurants && topRestaurants.length === 0) return (
    <NotFoundTop/>
  )
  return (  
    <View style={styles.viewTopRestaurants}>
      {
        !topRestaurants ? (
          <View style={styles.viewLoading}>
            <View style={styles.loaderRestaurants}>
              <ActivityIndicator size="large" color="#00a680"/>
              <Text>Cargando Restaurantes ... </Text>
            </View>
          </View>
        ) : (
          <View style={styles.viewFlatlist}>
            <FlatList
              data={topRestaurants}
              renderItem={({item,index}) => <Restaurant restaurant={item} index={index}/>}
              keyExtractor={(item,index) => item.id}
            />
          </View>
        )
      }
    </View>
  );
}

const NotFoundTop = () => {
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

const Restaurant = ({restaurant,index}) => {
  const navigation = useNavigation();
  const [colorIcon, setcolorIcon] = useState("#fff");
  useEffect(() => {
    const selectColor = () => {
      switch (index) {
        case 0:
          setcolorIcon("#efb819")
          break;
    
        case 1:
          setcolorIcon("#e3e4e5")
          break;
        case 2:
          setcolorIcon("#cd7f32")
          break;
        default: 
          setcolorIcon("#000")
          break;
      }
    }
    selectColor();
  }, [])

  return (
    <TouchableOpacity onPress={() => navigation.navigate("restaurants", {
      screen: "restaurant",
      params: {
        restaurant
      }
    })}>
      <Card containerStyle={styles.containerCard}>
        <Icon
          type="material-community"
          name="chess-queen"
          color={colorIcon}
          size={30}
          containerStyle={styles.conatinerIcon}
        />
        <Image
          style={styles.restaurantImage}
          resizeMode="cover"
          source={{uri: restaurant.images[0]}}
          PlaceholderContent={<ActivityIndicator size="large" color="#00a680"/>}
        />
        <View style={styles.viewTtitleRating}>
          <Text style={styles.txtTitle}>{restaurant.name}</Text>
          <Rating
            readonly
            startingValue={parseFloat(restaurant.rating)}
            imageSize={20}
            style={styles.rating}
          />
        </View>
        <Text style={styles.txtDescription}>
          {restaurant.description.substr(0,30)}
        </Text>
      </Card>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  viewNotFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  txtNotFound: {
    fontWeight: "bold",
    fontSize: 20
  },
  viewTopRestaurants: {
    flex: 1
  },
  viewLoading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  viewFlatlist: {
    flex: 1
  },
  containerCard: {
    marginBottom: 20,
    borderWidth: 0,
  },
  conatinerIcon: {
    position: "absolute",
    left: -20,
    top: -20,
    zIndex: 1,
    backgroundColor: "#fff",
    borderRadius: 100,
    padding: 10,
    elevation: 14
  },
  restaurantImage: {
    width: "100%",
    height: 150,
  },
  viewTtitleRating: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10
  },
  txtTitle: {
    fontWeight: "bold",
    fontSize: 20
  },
  txtDescription: { 
    color: "gray",  
    marginTop: 0,
    textAlign: "justify"
  }

})
 
export default TopRestaurants;
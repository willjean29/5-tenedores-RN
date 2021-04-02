import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import ListRestaurants from '../../components/Restaurants/ListRestaurants';
import AuthContext from '../../context/auth/AuthContext';
import firebase from '../../database/firebase';
const Restaurants = () => {
  const {user, reloadUser} = useContext(AuthContext); 
  const navigation = useNavigation();
  const [reloadUserInfo, setReloadUserInfo] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [totalRestaurants, setTotalRestaurants] = useState(0);
  const [startRestaurants, setStartRestaurants] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const limitRestaurants= 7;

  useEffect(() => {
    reloadUser();
    setReloadUserInfo(false);
  }, [reloadUserInfo]);
  useFocusEffect(
    useCallback(() => {
      console.log("cargar restaurant");
      const getRestaurants = async() => {
        const response = await firebase.db.collection("restaurants").get();
        setTotalRestaurants(response.size);
        const resultRestaurants = [];
        const restaurants = await firebase.db.collection("restaurants").orderBy("createAt", "desc").limit(limitRestaurants).get();
        setStartRestaurants(restaurants.docs[restaurants.docs.length - 1]);
        restaurants.forEach((doc) => {
          const restaurant = doc.data();
          restaurant.id = doc.id;
          resultRestaurants.push(restaurant);
        });
        setRestaurants(resultRestaurants);
      }
      getRestaurants();
    },[])
  )


  const handleLoadMore = async() => {
    const resultRestaurants = [];
    restaurants.length < totalRestaurants && setIsLoading(true);
    const newRestaurants = await firebase.db.collection("restaurants").orderBy("createAt", "desc").startAfter(startRestaurants.data().createAt).limit(limitRestaurants).get();
    if(newRestaurants.docs.length > 0){
      setStartRestaurants(newRestaurants.docs[newRestaurants.docs.length - 1])
    }else{
      setIsLoading(false);
    }

    newRestaurants.forEach((doc) => {
      const restaurant = doc.data();
      restaurant.id = doc.id;
      resultRestaurants.push(restaurant);
    });

    setRestaurants([...restaurants, ...resultRestaurants]);
  }
  return ( 
    <View
      style={styles.viewBody}
    >
      {/* <Text>Restaurants</Text> */}
      <ListRestaurants
        restaurants={restaurants}
        handleLoadMore={handleLoadMore}
        isLoading={isLoading}
      />
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
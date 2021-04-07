import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SearchBar, ListItem, Icon, Image, Avatar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { FireSQL } from 'firesql';
import firebase from '../database/firebase';
import NotFound from '../../assets/img/no-result-found.png';
import { FlatList } from 'react-native-gesture-handler';
const fireSQL = new FireSQL(firebase.db,{includeId: "id"});
const Search = () => {
  const [search, setSearch] = useState("");
  const [searchRestaurants, setSearchRestaurants] = useState([]);
  console.log(searchRestaurants);
  useEffect(() => {
    const getRestaurantsSearch = async() => {
      if(search !== ""){
        const response = await fireSQL.query(`SELECT * FROM restaurants WHERE name LIKE '${search}%'`);
        setSearchRestaurants(response);
      }else{
        setSearchRestaurants([]);
      }
    }
    getRestaurantsSearch();
  }, [search])
  return (  
    <ScrollView style={styles.viewSearch}>
      <SearchBar
        placeholder="Busca tu restaurante ..."
        onChangeText={(text) => setSearch(text)}
        value={search}
        round
        platform="android"
        containerStyle={styles.conatinerSearch}
        inputContainerStyle={styles.conatinerInput}
        inputStyle={styles.input}
      />
      {
        (searchRestaurants.length === 0) ? (
          <NotFoundRestaurants/>
        ) : (
          <FlatList
            data={searchRestaurants}
            renderItem={({item}) => <Restaurant restaurant={item}/>}
            keyExtractor={(item,index) => item.id}
          />
        )
      }
    </ScrollView>
  );
}

const NotFoundRestaurants = () => {
  return (
    <View style={styles.viewNotFound}>
      <Image
        source={NotFound}
        size={26}
        style={styles.imageNotFound}
      />
    </View>
  )
}

const Restaurant = ({restaurant}) => {
  const navigation = useNavigation();
  return (
    <ListItem
      containerStyle={styles.containerRestaurant}
    >
      <Avatar
        source={{uri: restaurant.images[0]}}
        rounded
        size={50}
        containerStyle={{elevation: 14}}
      />
      <ListItem.Content>
        <ListItem.Title style={styles.txtTitle}>
          {restaurant.name}
        </ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron size={40}
        onPress={() => navigation.navigate("restaurants",{
          screen: "restaurant",
          params: {
            restaurant
          }
        })}
      />
    </ListItem>
  )
}
const styles = StyleSheet.create({
  viewSearch: {
    flex: 1
  },
  conatinerSearch: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginVertical: 20,
    marginHorizontal: "5%",
    width: "90%",
    elevation: 14,
    paddingHorizontal: 5
  },
  conatinerInput: {
    backgroundColor: "transparent",
    borderRadius: 20,
    alignItems: "center",
    margin: 0,
    padding: 0
  },
  viewNotFound: {
    marginTop: 50,
    flex: 1,
    alignItems: "center",
  },
  imageNotFound: {
    height: 200,
    width: 200
  },
  containerRestaurant: {
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: 20,
    borderRadius: 20,
    // borderWidth: 1,
    elevation: 10,
    padding: 10
  },
  txtTitle: {
    fontWeight: "bold",
  },
})
 
export default Search;

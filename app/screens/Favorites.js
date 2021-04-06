import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Icon, Button, Image } from 'react-native-elements';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Toast from 'react-native-easy-toast';
import Loading from '../components/Loading';
import AuthContext from '../context/auth/AuthContext';
import firebase from '../database/firebase';
const Favorites = () => {
  const {user} = useContext(AuthContext);
  const [favorites, setFavorites] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [reloadFavorites, setReloadFavorites] = useState(false);
  const toast = useRef();
  
  useFocusEffect(
    useCallback(() => {
      const getFavorites = async() => {
        const totalFavorites = [];
        if(user){
          const response = await firebase.db.collection("favorites").where("idUser","==",user.uid).get();
          const data = await getDataRestaurant(response);
          data.forEach((doc) => {
            const restaurant = doc.data();
            restaurant.id = doc.id;
            totalFavorites.push(restaurant);
          })
        }
        setFavorites(totalFavorites);
        setReloadFavorites(false);
      }
      getFavorites();
    }, [reloadFavorites])
  )

  const getDataRestaurant = async(data) => {
    const restaurants = [];
    data.forEach((doc) => {
      const restaurant = doc.data();
      const favorite = firebase.db.collection("restaurants").doc(restaurant.idRestaurant).get();
      restaurants.push(favorite);
    })
    return await Promise.all(restaurants);
  }

  if(!user) return (
    <UserNoLogged/>
  )
  if(favorites && favorites.length === 0) return (
    <NotFoundFavorites/>
  )
  return ( 
    <View style={styles.viewFavorites}>
      {
        !favorites ? (
          <View style={styles.viewLoading}>
            <View style={styles.loaderRestaurants}>
              <ActivityIndicator size="large" color="#00a680"/>
              <Text>Cargando Restaurantes ... </Text>
            </View>
          </View>

        ) : (
          <View style={styles.viewFlatlist}>
            <FlatList
              data={favorites}
              renderItem={({item}) => (
                <Restaurant 
                  restaurant={item} 
                  toast={toast}
                  setIsLoading={setIsLoading}
                  setReloadFavorites={setReloadFavorites}
                />
              )}
              keyExtractor={(item,index) => item.id}
            />
          </View>

        )
      }
      <Toast ref={toast} position="center" opacity={0.8}/>
      <Loading isVisible={isLoading} text="Eliminando Restaurante"/>
    </View>
   );
}

const Restaurant = ({restaurant,toast,setIsLoading,setReloadFavorites}) => {
  // console.log(restaurant);
  const navigation = useNavigation();
  const deleteRestaurant = async() => {
    setIsLoading(true);
    const response = await firebase.db.collection("favorites").where("idRestaurant","==",restaurant.id).get();
    response.forEach(async(doc) => {
      const idDelete = doc.id;
      try {
        await firebase.db.collection("favorites").doc(idDelete).delete();
        setIsLoading(false);
        setReloadFavorites(true);
        toast.current.show("Se elimino de favoritos");
        console.log("se elimino");
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        toast.current.show("Error al eliminar de favoritos")
      }
    })
  }
  const confirmDeleteRestaurant = () => {
    Alert.alert(
      "Eliminar Restaurante",
      "¿Desea eliminar de Favoritos?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Si, eliminar",
          onPress: () => deleteRestaurant()
        }
      ],
      {cancelable: true}
    );
  }
  return (
    <View style={styles.viewRestaurant}>
      <TouchableOpacity onPress={() => navigation.navigate("restaurants",{
        screen: "restaurant",
        params: {restaurant}
      })}>
        <Image
          resizeMode="cover"
          style={styles.imageRestaurant}
          source={{uri: restaurant.images[0]}}
          PlaceholderContent={<ActivityIndicator size="large" color="#00a680"/>}
        />
      </TouchableOpacity>
      <View style={styles.viewInfoRestaurant}>
        <Text style={styles.txtTitleRestaurant}>{restaurant.name}</Text>
        <View style={styles.conatinerIcon}>
          <Icon
            type="material-community"
            name="heart"
            size={30}
            color="#f00"
            onPress={() => confirmDeleteRestaurant()}
          />
        </View>

      </View>
    </View>
  )
}

const NotFoundFavorites = () => {
  return (
    <View style={styles.viewNotFound}>
      <Icon
        type="material-community"
        name="alert-outline"
        size={50}
      />
      <Text style={styles.txtNotFound}>No tiene restaurantes en su lista</Text>
    </View>
  )
}

const UserNoLogged = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.viewNotFound}>
      <Icon
        type="material-community"
        name="alert-outline"
        size={50}
      />
      <Text style={styles.txtNotFound}>Para tener acceso debe iniciar sesión</Text>
      <Button
        title="Iniciar Sesión"
        containerStyle={styles.btnContainerLogin}
        buttonStyle={styles.btnLogin}
        underlayColor={"transparent"}
        onPress={() => navigation.navigate("account",{screnn: "login"})}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  viewFavorites: {
    flex: 1
  },
  viewFlatlist: {
    flex: 1
  },
  viewLoading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
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
  btnContainerLogin: {
    marginTop: 20,
    width: "80%"
  },
  btnLogin: {
    backgroundColor: "#00a680"
  },
  viewRestaurant:{
    margin: 10,
    borderRadius: 20,
    elevation: 8
  },
  imageRestaurant: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius:10
  },
  viewInfoRestaurant: {
    backgroundColor: "#fff",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  txtTitleRestaurant: {
    fontWeight: "bold",
    fontSize: 30,
    padding: 10
  },
  conatinerIcon: {
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
    backgroundColor: "#fff",
    borderRadius: 100,
    padding: 10,
    position: "absolute",
    right: 0,
    bottom: 30
  }
})
 
export default Favorites;
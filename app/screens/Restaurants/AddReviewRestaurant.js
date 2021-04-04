import React, { useContext, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { AirbnbRating, Input, Button } from 'react-native-elements';
import Toast from 'react-native-easy-toast';
import Loading from '../../components/Loading';
import firebase from '../../database/firebase';
import AuthContext from '../../context/auth/AuthContext';
const AddReviewRestaurant = ({route, navigation}) => {
  const {params: {idRestaurant}} = route;
  const toast = useRef();
  const {user} = useContext(AuthContext);
  // console.log(user);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [rating, setRating] = useState(null);
  const sendComment = async() => {
    if(!rating || !title || !comment){
      toast.current.show("Todos los campos son obligatorios");
    }else{
      setisLoading(true);
      const payload = {
        idUser: user.uid,
        avatarUser: user.photoURL,
        idRestaurant,
        title,
        review: comment,
        rating,
        createAt: new Date()
      }
      try {
        await firebase.db.collection("reviews").add(payload);
        updateRating(payload.rating);
        setisLoading(false);
        toast.current.show("Comentario agregado con éxito");
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        toast.current.show("Error al agregar comentario");
      }  
    }

  }

  const updateRating = async(currentRating) => {
    const doc = await firebase.db.collection("restaurants").doc(idRestaurant);
    const restaurant = await doc.get();
    const quantityVoting =  restaurant.data().quantityVoting + 1;
    const ratingTotal = restaurant.data().ratingTotal + currentRating;
    const rating = ratingTotal / quantityVoting;
    const payload = {
      quantityVoting,
      ratingTotal,
      rating
    }

    await doc.update(payload);
    navigation.goBack(); 
  }
  return (  
    <ScrollView style={styles.viewBody}>
      <View style={styles.viewRating}>
        <AirbnbRating
          count={5}
          defaultRating={0}
          reviews={["Pésimo","Deficiente","Normal","Muy Bueno","Excelente"]}
          onFinishRating={(value) => setRating(value)}
        />
      </View>
      <View style={styles.formReview}>
        <Input
          placeholder="Titulo"
          containerStyle={styles.input}
          onChangeText={(text) => setTitle(text)}
        />
        <Input
          placeholder="Comentario"
          multiline={true}
          inputContainerStyle={styles.textArea}
          onChangeText={(text) => setComment(text)}
        />
        <Button
          title="Enviar Comentario"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btnAddReview}
          onPress={sendComment}
        />
      </View>
      <Toast ref={toast} position="center" opacity={0.8}/>
      <Loading
        isVisible={isLoading}
        text="Agregando Comentario"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  },
  viewRating: {
    height: 110,
    backgroundColor: "#f2f2f2f2"
  },
  formReview: {
    flex: 1,
    alignItems: "center",
    margin: 10,
    marginTop: 30
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
  btnContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginTop: 40,
    marginBottom: 20,
    width: "95%"
  },
  btnAddReview: {
    backgroundColor: "#00a680",
    padding: 10,
  }
})
 
export default AddReviewRestaurant;
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, Avatar, Rating } from 'react-native-elements';
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import AuthContext from '../../context/auth/AuthContext';
import firebase from '../../database/firebase';
import ImageDefault from '../../../assets/img/avatar-default.jpg';
const ListReviewRestaurant = ({idRestaurant}) => {
  console.log(idRestaurant);
  const {user} = useContext(AuthContext);
  const navigation = useNavigation();
  const [reviews, setReviews] = useState([]);
  useFocusEffect(
    useCallback(() => {
      const getReviews = async() => {
        const reviews = await firebase.db.collection("reviews").where("idRestaurant","==",idRestaurant).get();
        const reviewsTotal = [];
        reviews.forEach((doc) => {
          const review = doc.data();
          review.id = doc.id;
          reviewsTotal.push(review);
        })
        setReviews(reviewsTotal);
      }
      getReviews();
    }, [])
  )

  return ( 
    <View>
      {
        user ? (
          <Button
           title="Agregar Comentario"
           containerStyle={styles.btnContainer}
           buttonStyle={styles.btnAddReview}
           titleStyle={styles.btnTitleAddReview}
           onPress={() => navigation.navigate("add-review-restaurant",{
             idRestaurant: idRestaurant
           })}
           icon={{
             type: "material-community",
             name: "square-edit-outline",
             color: "#00a680"
           }}
          />
        ) : (
          <View>
            <Text style={styles.textNotLogued}>
              Para escribir un comentario necesita estar logeado{"\n"}
              <Text style={{fontWeight: "bold"}}
                onPress={() => navigation.navigate("login")}
              >
                pulsa AQUI para iniciar sesión
              </Text>
            </Text>
          </View>
        )
      }
      {
        reviews.map((item,index) => (
          <Review
            review={item}
            key={index}
          />
        ))
      }

    </View>
  );
}

const Review = ({review}) => {
  const date = new Date(review.createAt.seconds * 1000);
  const createAt = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes() < 10 ? "0" : ""}${date.getMinutes()}`;
  console.log(createAt);
  return (
    <View style={styles.viewReview}>
      <View style={styles.viewImageAvatar}>
        <Avatar
          size={"large"}
          rounded
          containerStyle={styles.imageAvatarUser}
          source={
            review.avatarUser ? {uri: review.avatarUser} : ImageDefault
          }
        />
      </View>
      <View style={styles.viewInfo}>
          <Text style={styles.reviewTitle}>{review.title}</Text>
          <Text style={styles.reviewText}>{review.review}</Text>
          <Rating
            imageSize={15}
            startingValue={review.rating}
            readonly
          />
          <Text style={styles.reviewDate}>{createAt}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  btnAddReview: {
    backgroundColor: "transparent"
  },
  btnTitleAddReview: {
    color: "#00a680"
  },
  btnContainer: {
    marginVertical: 5,
    textAlign: "center",
    marginHorizontal: "25%",
    width: "50%"
  },
  textNotLogued: {
    textAlign: "center",
    color: "#00a680",
    padding: 10
  },
  viewReview: {
    flexDirection: "row",
    padding: 15,
    borderBottomColor: "#e3e3e3",
    borderBottomWidth: 1,
 
  },
  viewImageAvatar: {
    marginRight: 15
  },
  imageAvatarUser: {
    height: 50,
    width: 50
  },
  viewInfo: {
    flex: 1,
    alignItems: "flex-start"
  },
  reviewTitle: {
    fontWeight: "bold"
  },
  reviewText: {
    color: "gray",
    paddingVertical: 10
  },
  reviewDate: {
    color: "gray",
    position: "absolute",
    bottom: 0,
    right: 0
  }
})
 
export default ListReviewRestaurant;
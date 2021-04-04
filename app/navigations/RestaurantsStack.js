import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Restaurants from '../screens/Restaurants/Restaurants';
import Restaurant from '../screens/Restaurants/Restaurant';
import AddRestaurant from '../screens/Restaurants/AddRestaurant';
import AddReviewRestaurant from '../screens/Restaurants/AddReviewRestaurant';
const Stack = createStackNavigator();

const RestaurantsStack = () => {
  return (  
    <Stack.Navigator>
      <Stack.Screen
        name="restaurants"
        component={Restaurants}
        options={{
          title: "Restaurantes"
        }}
      />
      <Stack.Screen
        name="add-restaurant"
        component={AddRestaurant}
        options={{
          title: "Agregar Restaurante"
        }}
      />
      <Stack.Screen
        name="restaurant"
        component={Restaurant}
        options={{
          title: "Restaurante"
        }}
      />
      <Stack.Screen
        name="add-review-restaurant"
        component={AddReviewRestaurant}
        options={{
          title: "Nuevo Comentario"
        }}
      />
    </Stack.Navigator>
  );
}
 
export default RestaurantsStack;
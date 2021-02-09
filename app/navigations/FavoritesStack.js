import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Favorites from '../screens/Favorites';
const Stack = createStackNavigator();

const FavoritesStack = () => {
  return (  
    <Stack.Navigator>
      <Stack.Screen
        name="favorites"
        component={Favorites}
        options={{
          title: "Restaurantes Favoritos"
        }}
      />
    </Stack.Navigator>
  );
}
 
export default FavoritesStack;
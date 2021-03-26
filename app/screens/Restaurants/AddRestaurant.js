import React, { useRef, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Toast from 'react-native-easy-toast';
import AddRestaurantForm from '../../components/Restaurants/AddRestaurantForm';
import Loading from '../../components/Loading';
const AddRestaurant = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toast = useRef();
  return (  
    <View>
      <AddRestaurantForm
        toast={toast}
        setIsVisible={setIsVisible}
      />
      <Toast ref={toast} position="center" opacity={0.8}/>
      <Loading
        isVisible={isVisible}
        text="Creando restaurantes"
      />
    </View>
  );
}

const styles = StyleSheet.create({})
 
export default AddRestaurant;
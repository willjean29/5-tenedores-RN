import React from 'react';
import { StyleSheet } from 'react-native';
import { Overlay } from 'react-native-elements';
const Modal = (props) => {
  const {isVisible, setIsVisible} = props;
  const onCloseModal = () => setIsVisible(false);
  return (  
    <Overlay
      isVisible={isVisible}
      onBackdropPress={onCloseModal}
      backdropStyle={{backgroundColor: "rgba(0,0,0,0.4)"}}
      overlayStyle={styles.overlay}
    >
      {props.children}
    </Overlay>
  );
}
 
const styles = StyleSheet.create({
  overlay: {
    borderColor: "#00a680",
    borderWidth: 2,
    borderRadius: 5,
    height: "auto",
    width: "90%"
  }
})
export default Modal;
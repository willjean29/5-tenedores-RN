import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import Modal from '../Modal';
import ChangeDisplayNameForm from './ChangeDisplayNameForm';
const AccountOptions = ({userInfo, setReloadUserInfo,toast}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);
  const selectedComponent = (key) => {
    switch (key) {
      case "displayName":
        console.log("cambiar nombre")
        setRenderComponent(
          <ChangeDisplayNameForm
            userInfo={userInfo}
            setReloadUserInfo={setReloadUserInfo}
            setIsVisible={setIsVisible}
            toast={toast}
          />
        );
        setIsVisible(true);
        break;
      case "email":
        console.log("cambiar email")
        setRenderComponent(<Text>{key}</Text>);
        setIsVisible(true);
        break;
      case "password":
        console.log("cambiar password")
        setRenderComponent(<Text>{key}</Text>);
        setIsVisible(true);
        break;
      default:
        console.log("cambiar default")
        break;
    }
  }
  const options = generateOptions(selectedComponent);
  return ( 
    <View>
      {
        options.map((option, index) => (
          <ListItem key={index}
            containerStyle={styles.menuItem}
            onPress={option.onPress}
          >
            <ListItem.Chevron
              type={option.iconType}
              name={option.iconName}
              color={option.iconColor}
              size={22}
            />
            <ListItem.Content>
              <ListItem.Title>{option.title}</ListItem.Title>
            </ListItem.Content>

            <ListItem.Chevron size={22}/>
          </ListItem>
        ))
      }
      {
        renderComponent && (
          <Modal
            isVisible={isVisible}
            setIsVisible={setIsVisible}
          >
            {renderComponent}
          </Modal>
        )
      }
    </View>
  );
}

const generateOptions = (selectedComponent) => {
  return [
    {
      title: "Cambiar Nombre y Apellidos",
      iconType: "material-community",
      iconName: "account-circle",
      iconColor: "#ccc",
      onPress: () => selectedComponent("displayName")
    },
    {
      title: "Cambiar Email",
      iconType: "material-community",
      iconName: "at",
      iconColor: "#ccc",
      onPress: () => selectedComponent("email")
    },
    {
      title: "Cambiar Contraseña",
      iconType: "material-community",
      iconName: "lock-reset",
      iconColor: "#ccc",
      onPress: () => selectedComponent("password")
    }
  ]
}

const styles = StyleSheet.create({
  menuItem: {
    borderColor: "#e3e3e3",
    borderBottomWidth: 2

  }
})
 
export default AccountOptions;
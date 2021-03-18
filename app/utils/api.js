import firebase from '../database/firebase';

export const reauthenticate = (password) => {
  const user = firebase.auth.currentUser;
  console.log(user);
  const credentials = firebase.getCredentials(user.email,password);
  console.log(credentials);
  return user.reauthenticateWithCredential(credentials);
}
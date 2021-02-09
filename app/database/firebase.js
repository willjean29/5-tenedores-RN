import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyAYpN61-mgQaocioPNQyfLPl-P4osUd9MU",
  authDomain: "tenedores-rn-39645.firebaseapp.com",
  projectId: "tenedores-rn-39645",
  storageBucket: "tenedores-rn-39645.appspot.com",
  messagingSenderId: "97525601205",
  appId: "1:97525601205:web:159090a6811b4570f7fffc"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default {
  firebaseApp
}
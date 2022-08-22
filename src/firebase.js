import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDLx9ODxdbTKK9xX1lHOqYVs1cKWB1t48k",
  authDomain: "redux-help-queue-96984.firebaseapp.com",
  projectId: "redux-help-queue-96984",
  storageBucket: "redux-help-queue-96984.appspot.com",
  messagingSenderId: "939758300074",
  appId: "1:939758300074:web:f306a1fc1f3127392059d3"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
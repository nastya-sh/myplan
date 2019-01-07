import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
// Initialize Firebase
var config = {
  apiKey: "AIzaSyACHre5QacUPejLAaMOLZPF7XIqNDgHfRY",
  authDomain: "testproject-myplan.firebaseapp.com",
  databaseURL: "https://testproject-myplan.firebaseio.com",
  projectId: "testproject-myplan",
  storageBucket: "testproject-myplan.appspot.com",
  messagingSenderId: "131699843399"
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;

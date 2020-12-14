import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCKpUKckOPj5T4S3oC3J-CNJdCsiSH-Hpg",
  authDomain: "portal-nutri.firebaseapp.com",
  databaseURL: "https://portal-nutri.firebaseio.com",
  projectId: "portal-nutri",
  storageBucket: "portal-nutri.appspot.com",
  messagingSenderId: "187580243155",
  appId: "1:187580243155:web:281a7bab074e96632bc826",
  measurementId: "G-ERTG3B3WNB"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();
firebase.getCurrentUser = function () {
  return new Promise(function (resolve, reject) {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};
firebase.auth().languageCode = "pt";

export const db = firebase.firestore();
const { Timestamp } = firebase.firestore;
export { Timestamp };

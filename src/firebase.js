import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAWNuZcHsuceooaXXsB2Se7P1IqCoCi95M",
  authDomain: "clone-668a7.firebaseapp.com",
  databaseURL: "https://clone-668a7.firebaseio.com",
  projectId: "clone-668a7",
  storageBucket: "clone-668a7.appspot.com",
  messagingSenderId: "416062479034",
  appId: "1:416062479034:web:3487afaa9b1665f1560083",
  measurementId: "G-V0LM1L0CED"
};

const firebaseApp =firebase.initializeApp(firebaseConfig);

const db=firebaseApp.firestore();
const auth=firebase.auth();

export {db,auth};
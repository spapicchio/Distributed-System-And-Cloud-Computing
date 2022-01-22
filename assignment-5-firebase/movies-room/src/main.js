import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"

import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWjIASzbLlfQeqlv_S3q7iaAM-yKpYyxo",
  authDomain: "assignment5-clouds.firebaseapp.com",
  databaseURL: "https://assignment5-clouds-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "assignment5-clouds",
  storageBucket: "assignment5-clouds.appspot.com",
  messagingSenderId: "513293719577",
  appId: "1:513293719577:web:58664afd2d325d64f7b288",
  measurementId: "G-0YSS1XVW4D",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
console.log(firebase);

//const analytics = getAnalytics(app);

createApp(App)
    .use(router)
    .mount("#app");

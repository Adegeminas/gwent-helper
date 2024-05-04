import './assets/main.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2uFKCaiJSCEppVicIDjPTjJz_dNz6zos",
  authDomain: "aobu-af634.firebaseapp.com",
  projectId: "aobu-af634",
  storageBucket: "aobu-af634.appspot.com",
  messagingSenderId: "730364342292",
  appId: "1:730364342292:web:3ce7213430a28194d53701",
  measurementId: "G-ZNL6B24GM4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import { createApp } from 'vue'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  defaults: {
    VBtn: {
        color: 'primary',
        variant: 'outlined',
        rounded: true,
    },
},
})

createApp(App).use(vuetify).mount('#app')
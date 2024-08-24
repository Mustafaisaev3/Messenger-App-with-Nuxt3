// firebase.js
import { initializeApp } from 'firebase/app'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { getFirestore, collection, addDoc } from 'firebase/firestore'

// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_STORAGE_BUCKET",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID"
// }

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBisKwQosqsrwO9TSeXO-Bhj83imGlyuc4",
  authDomain: "nuxt3-chat-app.firebaseapp.com",
  projectId: "nuxt3-chat-app",
  storageBucket: "nuxt3-chat-app.appspot.com",
  messagingSenderId: "906164032714",
  appId: "1:906164032714:web:4f4e818b8e45b826589033"
};

const app = initializeApp(firebaseConfig)
const storage = getStorage(app)
const db = getFirestore(app)

export { storage, db, ref, uploadBytes, getDownloadURL, collection, addDoc }
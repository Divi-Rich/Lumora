// Firebase Core
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";

// Firebase Authentication
import { getAuth } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";

// Firebase Firestore
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {

    apiKey: "YOUR_API_KEY",

    authDomain: "lumora-1136c.firebaseapp.com",

    projectId: "lumora-1136c",

    storageBucket: "lumora-1136c.firebasestorage.app",

    messagingSenderId: "555831918720",

    appId: "1:555831918720:web:5d1251846b43c92464e665"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
const auth = getAuth(app);

const db = getFirestore(app);

// Export
export { app, auth, db };
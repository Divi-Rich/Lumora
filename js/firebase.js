// Firebase Configuration

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyDrp55t4WNInqmxW7pI8GO6vlI3ufrEHtU",
  authDomain: "lumora-1136c.firebaseapp.com",
  projectId: "lumora-1136c",
  storageBucket: "lumora-1136c.firebasestorage.app",
  messagingSenderId: "555831918720",
  appId: "1:555831918720:web:5d1251846b43c92464e665"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export app
export { app };
// Firebase App
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyD3jIBnNz0E-7a5Ng7LP3EyPQgNmcrqJq4",
  authDomain: "lumora-ef511.firebaseapp.com",
  projectId: "lumora-ef511",
  storageBucket: "lumora-ef511.firebasestorage.app",
  messagingSenderId: "454253934180",
  appId: "1:454253934180:web:b33a6a1000368dc3349171"
};

const app = initializeApp(firebaseConfig);

export { app };
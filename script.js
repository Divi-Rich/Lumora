import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyDrp55t4WNInqmxW7pI8GO6vlI3ufrEHtU",
  authDomain: "lumora-1136c.firebaseapp.com",
  projectId: "lumora-1136c",
  storageBucket: "lumora-1136c.firebasestorage.app",
  messagingSenderId: "555831918720",
  appId: "1:555831918720:web:5d1251846b43c92464e665",
  measurementId: "G-GGCEW676RB"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

console.log("Firebase Connected!");

const btn = document.getElementById("testBtn");
const status = document.getElementById("status");

btn.addEventListener("click", () => {
    status.textContent = "✅ Firebase is connected successfully!";
});
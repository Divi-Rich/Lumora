// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";

// Your Firebase configuration
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
const auth = getAuth(app);

// --------------------
// SIGN UP
// --------------------
const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      alert("🎉 Account created successfully!");

      window.location.href = "dashboard.html";

    } catch (error) {
      alert(error.message);
    }
  });
}

// --------------------
// LOGIN
// --------------------
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
      await signInWithEmailAndPassword(auth, email, password);

      alert("✅ Login successful!");

      window.location.href = "dashboard.html";

    } catch (error) {
      alert(error.message);
    }
  });
}

// --------------------
// LOGOUT
// --------------------
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);

    alert("Logged out!");

    window.location.href = "../index.html";
  });
}
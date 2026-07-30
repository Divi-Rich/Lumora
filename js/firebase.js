// ==============================
// LUMORA FIREBASE
// ==============================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";

import {
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";

// Firebase Configuration

const firebaseConfig = {

apiKey: "AIzaSyD3jIBnNz0E-7a5Ng7LP3EyPQgNmcrqJq4",

authDomain: "lumora-ef511.firebaseapp.com",

projectId: "lumora-ef511",

storageBucket: "lumora-ef511.firebasestorage.app",

messagingSenderId: "454253934180",

appId: "1:454253934180:web:b33a6a1000368dc3349171"

};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// ==============================
// SIGN UP
// ==============================

const signupForm = document.getElementById("signupForm");

if (signupForm) {

signupForm.addEventListener("submit", (e) => {

e.preventDefault();

const email = document.getElementById("signupEmail").value;

const password = document.getElementById("signupPassword").value;

createUserWithEmailAndPassword(auth, email, password)

.then(() => {

alert("🎉 Account Created Successfully!");

window.location.href = "login.html";

})

.catch((error) => {

alert(error.message);

});

});

}

// ==============================
// LOGIN
// ==============================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

loginForm.addEventListener("submit", (e) => {

e.preventDefault();

const email = document.getElementById("loginEmail").value;

const password = document.getElementById("loginPassword").value;

signInWithEmailAndPassword(auth, email, password)

.then(() => {

alert("✅ Login Successful!");

window.location.href = "dashboard.html";

})

.catch((error) => {

alert(error.message);

});

});

}

// ==============================
// LOGOUT
// ==============================

window.logoutUser = function () {

signOut(auth)

.then(() => {

alert("Logged Out");

window.location.href = "../index.html";

})

.catch((error) => {

alert(error.message);

});

};
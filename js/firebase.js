import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";

import {
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
onAuthStateChanged,
signOut
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";

const firebaseConfig = {
apiKey: "AIzaSyDrp55t4WNInqmxW7pI8GO6vlI3ufrEHtU",
authDomain: "lumora-1136c.firebaseapp.com",
projectId: "lumora-1136c",
storageBucket: "lumora-1136c.firebasestorage.app",
messagingSenderId: "555831918720",
appId: "1:555831918720:web:5d1251846b43c92464e665"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

/* ---------- SIGN UP ---------- */

const signupForm = document.getElementById("signupForm");

if(signupForm){

signupForm.addEventListener("submit",(e)=>{

e.preventDefault();

const email=document.getElementById("signupEmail").value;

const password=document.getElementById("signupPassword").value;

createUserWithEmailAndPassword(auth,email,password)

.then(()=>{

alert("✅ Account created successfully!");

window.location.href="login.html";

})

.catch(error=>{

alert(error.message);

});

});

}

/* ---------- LOGIN ---------- */

const loginForm=document.getElementById("loginForm");

if(loginForm){

loginForm.addEventListener("submit",(e)=>{

e.preventDefault();

const email=document.getElementById("loginEmail").value;

const password=document.getElementById("loginPassword").value;

signInWithEmailAndPassword(auth,email,password)

.then(()=>{

window.location.href="dashboard.html";

})

.catch(error=>{

alert(error.message);

});

});

}

/* ---------- CHECK LOGIN ---------- */

onAuthStateChanged(auth,(user)=>{

if(user){

console.log("Logged in:",user.email);

}

});

window.logout=function(){

signOut(auth).then(()=>{

window.location.href="login.html";

});

};
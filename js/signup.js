import { auth, db } from "./firebase.js";

import {
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";

import {
    doc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";

const signupForm = document.getElementById("signupForm");

const fullName = document.getElementById("fullName");
const username = document.getElementById("username");
const email = document.getElementById("signupEmail");
const password = document.getElementById("signupPassword");

const togglePassword = document.getElementById("togglePassword");

// Show / Hide Password
togglePassword.addEventListener("click", () => {

    if (password.type === "password") {

        password.type = "text";
        togglePassword.textContent = "🙈";

    } else {

        password.type = "password";
        togglePassword.textContent = "👁️";

    }

});

// Create Account
signupForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    try {

        const userCredential = await createUserWithEmailAndPassword(

            auth,

            email.value,

            password.value

        );

        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {

            uid: user.uid,

            fullName: fullName.value,

            username: username.value.toLowerCase(),

            email: email.value,

            bio: "Hello! I'm new to Lumora.",

            profilePicture: "",

            followers: 0,

            following: 0,

            verified: false,

            createdAt: serverTimestamp()

        });

        alert("🎉 Welcome to Lumora!");

        window.location.href = "dashboard.html";

    } catch (error) {

        alert(error.message);

        console.error(error);

    }

});
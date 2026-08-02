import { auth } from "./firebase.js";

import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";

const loginForm = document.getElementById("loginForm");

const email = document.getElementById("loginEmail");
const password = document.getElementById("loginPassword");

// Create the eye button if it doesn't exist
let toggle = document.getElementById("togglePassword");

if (!toggle) {

    toggle = document.createElement("span");

    toggle.id = "togglePassword";

    toggle.innerHTML = "👁️";

    toggle.style.cursor = "pointer";

    toggle.style.marginLeft = "-35px";

    password.parentNode.appendChild(toggle);

}

toggle.addEventListener("click", () => {

    if (password.type === "password") {

        password.type = "text";

        toggle.innerHTML = "🙈";

    } else {

        password.type = "password";

        toggle.innerHTML = "👁️";

    }

});

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    try {

        await signInWithEmailAndPassword(

            auth,

            email.value,

            password.value

        );

        alert("✅ Welcome back to Lumora!");

        window.location.href = "dashboard.html";

    }

    catch (error) {

        alert(error.message);

        console.error(error);

    }

});
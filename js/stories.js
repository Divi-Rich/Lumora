import { auth } from "./firebase.js";

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";

const uploadBtn = document.getElementById("uploadStoryBtn");
const status = document.getElementById("storyStatus");

onAuthStateChanged(auth, (user) => {

    if (!user) {

        window.location.href = "login.html";

    }

});

uploadBtn.addEventListener("click", () => {

    status.textContent = "🚧 Story upload will be connected to Cloudinary and Firestore soon.";

});
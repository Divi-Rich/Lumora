// Import Firebase
import { app } from "./firebase.js";

import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";

const db = getFirestore(app);
const auth = getAuth(app);

const publishBtn = document.getElementById("publishBtn");
const postContent = document.getElementById("postContent");
const status = document.getElementById("status");

publishBtn.addEventListener("click", async () => {

    const content = postContent.value.trim();

    if (content === "") {
        status.style.color = "red";
        status.textContent = "Please write something first.";
        return;
    }

    const user = auth.currentUser;

    if (!user) {
        alert("Please login first.");
        window.location.href = "login.html";
        return;
    }

    try {

        await addDoc(collection(db, "posts"), {

            uid: user.uid,
            email: user.email,
            content: content,
            createdAt: serverTimestamp(),
            likes: 0,
            comments: 0

        });

        status.style.color = "#00ff88";
        status.textContent = "✅ Post published successfully!";

        postContent.value = "";

        setTimeout(() => {

            window.location.href = "feed.html";

        }, 1200);

    } catch (error) {

        console.error(error);

        status.style.color = "red";
        status.textContent = error.message;

    }

});
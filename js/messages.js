import { auth, db } from "./firebase.js";

import {
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";

const chatMessages = document.getElementById("chatMessages");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

let currentUser = null;

// Check if user is logged in
onAuthStateChanged(auth, (user) => {

    if (!user) {

        window.location.href = "login.html";
        return;

    }

    currentUser = user;

    loadMessages();

});

// Send Message
sendBtn.addEventListener("click", sendMessage);

messageInput.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {

        sendMessage();

    }

});

async function sendMessage() {

    const text = messageInput.value.trim();

    if (!text) return;

    try {

        await addDoc(collection(db, "messages"), {

            uid: currentUser.uid,

            sender: currentUser.email,

            text,

            createdAt: serverTimestamp()

        });

        messageInput.value = "";

    } catch (error) {

        console.error(error);

        alert(error.message);

    }

}

// Load Messages in Real Time
function loadMessages() {

    const q = query(

        collection(db, "messages"),

        orderBy("createdAt")

    );

    onSnapshot(q, (snapshot) => {

        chatMessages.innerHTML = "";

        snapshot.forEach((doc) => {

            const msg = doc.data();

            const mine = msg.uid === currentUser.uid;

            chatMessages.innerHTML += `

            <div class="message ${mine ? "sent" : "received"}">

                <strong>${mine ? "You" : msg.sender}</strong><br>

                ${msg.text}

            </div>

            `;

        });

        chatMessages.scrollTop = chatMessages.scrollHeight;

    });

}
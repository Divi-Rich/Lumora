import { auth, db } from "./firebase.js";

import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    orderBy,
    onSnapshot,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";


const usersList =
    document.getElementById("usersList");

const searchUser =
    document.getElementById("searchUser");

const chatMessages =
    document.getElementById("chatMessages");

const messageInput =
    document.getElementById("messageInput");

const sendBtn =
    document.getElementById("sendBtn");

const chatName =
    document.getElementById("chatName");

const chatStatus =
    document.getElementById("chatStatus");


let currentUser = null;

let selectedUser = null;

let unsubscribeMessages = null;

let allUsers = [];


// =====================================================
// AUTHENTICATION
// =====================================================

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.href = "login.html";

        return;

    }

    currentUser = user;

    await loadUsers();

});


// =====================================================
// LOAD USERS
// =====================================================

async function loadUsers() {

    usersList.innerHTML = `
        <p style="opacity:.7;text-align:center;padding:20px;">
            Loading users...
        </p>
    `;

    try {

        const snapshot =
            await getDocs(collection(db, "users"));

        allUsers = [];

        snapshot.forEach(userDoc => {

            const user = userDoc.data();

            // Don't show yourself
            if (user.uid === currentUser.uid) {
                return;
            }

            allUsers.push({
                id: userDoc.id,
                ...user
            });

        });

        renderUsers(allUsers);

    } catch (error) {

        console.error(error);

        usersList.innerHTML = `
            <p style="padding:20px;">
                Unable to load users.
            </p>
        `;

    }

}


// =====================================================
// DISPLAY USERS
// =====================================================

function renderUsers(users) {

    usersList.innerHTML = "";

    if (users.length === 0) {

        usersList.innerHTML = `
            <p style="text-align:center;opacity:.7;padding:20px;">
                No users found.
            </p>
        `;

        return;

    }


    users.forEach(user => {

        const userElement =
            document.createElement("div");

        userElement.className = "chat-user";


        userElement.innerHTML = `

            <div class="avatar">

                ${user.photoURL
                    ? `<img src="${user.photoURL}"
                            style="width:100%;height:100%;border-radius:50%;object-fit:cover;">`
                    : "👤"
                }

            </div>


            <div>

                <h3>
                    ${escapeHTML(
                        user.displayName ||
                        user.username ||
                        "Lumorian"
                    )}
                </h3>

                <p>
                    🟢 Available
                </p>

            </div>

        `;


        userElement.addEventListener(
            "click",
            () => selectUser(user)
        );


        usersList.appendChild(userElement);

    });

}


// =====================================================
// SELECT USER
// =====================================================

function selectUser(user) {

    selectedUser = user;


    chatName.textContent =
        user.displayName ||
        user.username ||
        "Lumorian";


    chatStatus.textContent =
        "💬 Private conversation";


    messageInput.disabled = false;

    sendBtn.disabled = false;


    if (unsubscribeMessages) {

        unsubscribeMessages();

        unsubscribeMessages = null;

    }


    loadConversation();

}


// =====================================================
// CREATE UNIQUE CONVERSATION ID
// =====================================================

function getConversationId() {

    const ids = [

        currentUser.uid,
        selectedUser.uid

    ];


    ids.sort();


    return ids.join("_");

}


// =====================================================
// LOAD PRIVATE CONVERSATION
// =====================================================

function loadConversation() {

    if (!selectedUser) return;


    const conversationId =
        getConversationId();


    const messagesRef =
        collection(
            db,
            "conversations",
            conversationId,
            "messages"
        );


    const q = query(
        messagesRef,
        orderBy("createdAt", "asc")
    );


    unsubscribeMessages =
        onSnapshot(q, (snapshot) => {

            chatMessages.innerHTML = "";


            if (snapshot.empty) {

                chatMessages.innerHTML = `

                    <div style="
                        text-align:center;
                        opacity:.6;
                        padding:30px;
                    ">

                        👋 Say hello!

                    </div>

                `;

                return;

            }


            snapshot.forEach(messageDoc => {

                const message =
                    messageDoc.data();


                const mine =
                    message.senderId ===
                    currentUser.uid;


                const messageElement =
                    document.createElement("div");


                messageElement.className =
                    `message ${
                        mine
                        ? "sent"
                        : "received"
                    }`;


                messageElement.innerHTML = `

                    ${escapeHTML(message.text)}

                `;


                chatMessages.appendChild(
                    messageElement
                );

            });


            chatMessages.scrollTop =
                chatMessages.scrollHeight;

        });

}


// =====================================================
// SEND MESSAGE
// =====================================================

sendBtn.addEventListener(
    "click",
    sendMessage
);


messageInput.addEventListener(
    "keypress",
    (event) => {

        if (event.key === "Enter") {

            event.preventDefault();

            sendMessage();

        }

    }
);


async function sendMessage() {

    if (!currentUser) return;

    if (!selectedUser) {

        alert("Select a user first.");

        return;

    }


    const text =
        messageInput.value.trim();


    if (!text) return;


    try {

        const conversationId =
            getConversationId();


        await addDoc(

            collection(
                db,
                "conversations",
                conversationId,
                "messages"
            ),

            {

                senderId:
                    currentUser.uid,

                receiverId:
                    selectedUser.uid,

                text: text,

                createdAt:
                    serverTimestamp()

            }

        );


        messageInput.value = "";

        messageInput.focus();


    } catch (error) {

        console.error(error);

        alert(
            "Message failed to send."
        );

    }

}


// =====================================================
// SEARCH USERS
// =====================================================

searchUser.addEventListener(
    "input",
    () => {

        const search =
            searchUser.value
                .trim()
                .toLowerCase();


        if (!search) {

            renderUsers(allUsers);

            return;

        }


        const filtered =
            allUsers.filter(user => {

                const name =
                    (
                        user.displayName ||
                        user.username ||
                        ""
                    ).toLowerCase();


                return name.includes(search);

            });


        renderUsers(filtered);

    }
);


// =====================================================
// BASIC HTML ESCAPING
// =====================================================

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}
import { auth, db } from "./firebase.js";

import {
    collection,
    getDocs,
    addDoc,
    doc,
    getDoc,
    setDoc,
    query,
    orderBy,
    onSnapshot,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";


// ==========================================
// ELEMENTS
// ==========================================

const usersList =
    document.getElementById("usersList");

const searchUser =
    document.getElementById("searchUser");

const chatName =
    document.getElementById("chatName");

const chatStatus =
    document.getElementById("chatStatus");

const chatMessages =
    document.getElementById("chatMessages");

const messageInput =
    document.getElementById("messageInput");

const sendBtn =
    document.getElementById("sendBtn");


// ==========================================
// VARIABLES
// ==========================================

let currentUser = null;

let selectedUser = null;

let unsubscribeMessages = null;

let allUsers = [];


// ==========================================
// AUTH
// ==========================================

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.href = "login.html";

        return;

    }

    currentUser = user;

    await loadUsers();

});


// ==========================================
// LOAD USERS
// ==========================================

async function loadUsers() {

    usersList.innerHTML =
        "<p>Loading Lumorians...</p>";

    try {

        const snapshot =
            await getDocs(
                collection(db, "users")
            );


        allUsers = [];


        snapshot.forEach((userDoc) => {

            const user = userDoc.data();

            // Don't show yourself
            if (userDoc.id === currentUser.uid) {

                return;

            }


            allUsers.push({

                uid: userDoc.id,

                ...user

            });

        });


        displayUsers(allUsers);


    } catch (error) {

        console.error(error);

        usersList.innerHTML = `

            <p>
                Unable to load users.
            </p>

        `;

    }

}


// ==========================================
// DISPLAY USERS
// ==========================================

function displayUsers(users) {

    usersList.innerHTML = "";


    if (users.length === 0) {

        usersList.innerHTML = `

            <div class="chat-user">

                <div class="avatar">
                    👤
                </div>

                <div>

                    <h3>No users found</h3>

                    <p>
                        Invite someone to Lumora!
                    </p>

                </div>

            </div>

        `;

        return;

    }


    users.forEach((user) => {

        const username =
            user.displayName ||
            user.username ||
            "Lumorian";


        const avatar =
            user.photoURL ||
            "👤";


        const userElement =
            document.createElement("div");


        userElement.className =
            "chat-user";


        userElement.innerHTML = `

            <div class="avatar">

                ${
                    avatar.startsWith("http")
                    ? `<img
                        src="${avatar}"
                        style="
                            width:100%;
                            height:100%;
                            border-radius:50%;
                            object-fit:cover;
                        ">`
                    : avatar
                }

            </div>


            <div>

                <h3>
                    ${escapeHTML(username)}
                </h3>

                <p>
                    💬 Start conversation
                </p>

            </div>

        `;


        userElement.addEventListener(
            "click",
            () => {

                selectUser(user);

            }
        );


        usersList.appendChild(userElement);

    });

}


// ==========================================
// SEARCH USERS
// ==========================================

searchUser.addEventListener(
    "input",
    () => {

        const search =
            searchUser.value
                .toLowerCase()
                .trim();


        const filtered =
            allUsers.filter((user) => {

                const name =
                    (
                        user.displayName ||
                        user.username ||
                        ""
                    ).toLowerCase();


                const email =
                    (
                        user.email ||
                        ""
                    ).toLowerCase();


                return (
                    name.includes(search) ||
                    email.includes(search)
                );

            });


        displayUsers(filtered);

    }
);


// ==========================================
// SELECT USER
// ==========================================

async function selectUser(user) {

    selectedUser = user;


    const username =
        user.displayName ||
        user.username ||
        "Lumorian";


    chatName.textContent =
        username;


    chatStatus.textContent =
        "🔒 Private conversation";


    messageInput.disabled = false;

    sendBtn.disabled = false;

    messageInput.placeholder =
        `Message ${username}...`;


    await loadConversation();

}


// ==========================================
// CREATE UNIQUE CONVERSATION ID
// ==========================================

function getConversationId(uid1, uid2) {

    return [uid1, uid2]
        .sort()
        .join("_");

}


// ==========================================
// LOAD CONVERSATION
// ==========================================

async function loadConversation() {

    if (!selectedUser || !currentUser) {

        return;

    }


    // Remove previous real-time listener
    if (unsubscribeMessages) {

        unsubscribeMessages();

    }


    const conversationId =
        getConversationId(
            currentUser.uid,
            selectedUser.uid
        );


    const conversationRef =
        doc(
            db,
            "conversations",
            conversationId
        );


    // Create conversation if it doesn't exist
    const conversationSnap =
        await getDoc(conversationRef);


    if (!conversationSnap.exists()) {

        await setDoc(
            conversationRef,
            {

                participants: [

                    currentUser.uid,

                    selectedUser.uid

                ],

                createdAt:
                    serverTimestamp(),

                lastMessage: "",

                lastMessageAt:
                    serverTimestamp()

            }
        );

    }


    chatMessages.innerHTML = `

        <div class="message received">

            🔒 This is a private conversation.

        </div>

    `;


    const messagesRef =
        collection(
            db,
            "conversations",
            conversationId,
            "messages"
        );


    const q =
        query(
            messagesRef,
            orderBy("createdAt", "asc")
        );


    unsubscribeMessages =
        onSnapshot(
            q,
            (snapshot) => {

                chatMessages.innerHTML = "";


                if (snapshot.empty) {

                    chatMessages.innerHTML = `

                        <div class="message received">

                            👋 Say hello!

                        </div>

                    `;

                    return;

                }


                snapshot.forEach(
                    (messageDoc) => {

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

                            ${escapeHTML(
                                message.text || ""
                            )}

                        `;


                        chatMessages.appendChild(
                            messageElement
                        );

                    }
                );


                chatMessages.scrollTop =
                    chatMessages.scrollHeight;

            }
        );

}


// ==========================================
// SEND MESSAGE
// ==========================================

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

    if (!currentUser) {

        return;

    }


    if (!selectedUser) {

        alert(
            "Select a user first."
        );

        return;

    }


    const text =
        messageInput.value
            .trim();


    if (!text) {

        return;

    }


    const conversationId =
        getConversationId(
            currentUser.uid,
            selectedUser.uid
        );


    try {

        const messagesRef =
            collection(
                db,
                "conversations",
                conversationId,
                "messages"
            );


        await addDoc(
            messagesRef,
            {

                senderId:
                    currentUser.uid,

                receiverId:
                    selectedUser.uid,

                senderName:
                    currentUser.displayName ||
                    currentUser.email ||
                    "Lumorian",

                text: text,

                createdAt:
                    serverTimestamp()

            }
        );


        // Update conversation preview

        await setDoc(
            doc(
                db,
                "conversations",
                conversationId
            ),
            {

                lastMessage: text,

                lastMessageAt:
                    serverTimestamp()

            },

            {
                merge: true
            }

        );


        messageInput.value = "";


        messageInput.focus();


    } catch (error) {

        console.error(error);

        alert(
            "Message failed: " +
            error.message
        );

    }

}


// ==========================================
// BASIC HTML ESCAPE
// ==========================================

function escapeHTML(value) {

    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}
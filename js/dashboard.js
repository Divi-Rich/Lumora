import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";

import {
    doc,
    getDoc,
    collection,
    query,
    orderBy,
    limit,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";

const welcomeUser = document.getElementById("welcomeUser");
const postsContainer = document.getElementById("postsContainer");
const logoutBtn = document.getElementById("logoutBtn");

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    // Load user information
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {

        const data = userSnap.data();

        welcomeUser.textContent =
            `👋 Welcome back, ${data.fullName}!`;

    }

    // Load latest posts
    const q = query(
        collection(db, "posts"),
        orderBy("createdAt", "desc"),
        limit(10)
    );

    const snapshot = await getDocs(q);

    postsContainer.innerHTML = "";

    snapshot.forEach((doc) => {

        const post = doc.data();

        postsContainer.innerHTML += `
            <div class="post-card">

                <p>${post.caption}</p>

                ${
                    post.image
                    ? `<img src="${post.image}" class="post-image">`
                    : ""
                }

                <div class="post-actions">

                    ❤️ ${post.likes}

                    💬 ${post.comments}

                </div>

            </div>
        `;

    });

});

// Logout
if (logoutBtn) {

    logoutBtn.addEventListener("click", async () => {

        await signOut(auth);

        window.location.href = "login.html";

    });

}
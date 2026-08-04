import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";

import {
    collection,
    query,
    where,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";

const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");
const profilePhoto = document.getElementById("profilePhoto");
const postCount = document.getElementById("postCount");
const myPosts = document.getElementById("myPosts");
const logoutBtn = document.getElementById("logoutBtn");
const editProfileBtn = document.getElementById("editProfileBtn");

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.href = "login.html";
        return;

    }

    profileName.textContent = user.displayName || "Lumora User";
    profileEmail.textContent = user.email;

    if (user.photoURL) {

        profilePhoto.src = user.photoURL;

    }

    loadMyPosts(user.uid);

});

async function loadMyPosts(uid) {

    try {

        const q = query(
            collection(db, "posts"),
            where("uid", "==", uid)
        );

        const snapshot = await getDocs(q);

        postCount.textContent = snapshot.size;

        myPosts.innerHTML = "";

        if (snapshot.empty) {

            myPosts.innerHTML = `
            <div class="post-card">
                <h3>No Posts Yet</h3>
                <p>Create your first Lumora post 🚀</p>
            </div>
            `;

            return;

        }

        snapshot.forEach((doc) => {

            const post = doc.data();

            myPosts.innerHTML += `

            <div class="post-card">

                <h3>${post.caption || "Untitled Post"}</h3>

                ${
                    post.image
                    ? `<img src="${post.image}" class="post-image">`
                    : ""
                }

                <div class="post-actions">

                    <span>❤️ ${post.likes || 0}</span>

                    <span>💬 ${post.comments || 0}</span>

                </div>

            </div>

            `;

        });

    } catch (error) {

        console.error(error);

        myPosts.innerHTML = `
        <div class="post-card">
            <p>${error.message}</p>
        </div>
        `;

    }

}

logoutBtn.addEventListener("click", async () => {

    await signOut(auth);

    window.location.href = "login.html";

});

editProfileBtn.addEventListener("click", () => {

    alert("🚀 Edit Profile feature is coming soon!");

});
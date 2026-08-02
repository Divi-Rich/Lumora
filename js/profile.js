import { auth, db } from "./firebase.js";

import {
    doc,
    getDoc,
    collection,
    query,
    where,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";

// HTML Elements
const fullName = document.getElementById("fullName");
const username = document.getElementById("username");
const bio = document.getElementById("bio");
const profileImage = document.getElementById("profileImage");

const followersCount = document.getElementById("followersCount");
const followingCount = document.getElementById("followingCount");
const postsCount = document.getElementById("postsCount");

const myPosts = document.getElementById("myPosts");

// Check if user is logged in
onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.href = "login.html";
        return;

    }

    try {

        // Load Profile
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {

            const data = userSnap.data();

            fullName.textContent = data.fullName || "Lumora User";

            username.textContent = "@" + (data.username || "user");

            bio.textContent = data.bio || "Welcome to Lumora.";

            followersCount.textContent = data.followers || 0;

            followingCount.textContent = data.following || 0;

            if (data.profilePicture) {

                profileImage.src = data.profilePicture;

            }

        }

        // Load User Posts
        const postsQuery = query(
            collection(db, "posts"),
            where("uid", "==", user.uid)
        );

        const postSnapshot = await getDocs(postsQuery);

        postsCount.textContent = postSnapshot.size;

        myPosts.innerHTML = "";

        if (postSnapshot.empty) {

            myPosts.innerHTML = `
                <div class="post-card">
                    <h3>No Posts Yet</h3>
                    <p>Create your first post!</p>
                </div>
            `;

        } else {

            postSnapshot.forEach((doc) => {

                const post = doc.data();

                myPosts.innerHTML += `

                    <div class="post-card">

                        <p>${post.content}</p>

                        <small>
                            ❤️ ${post.likes || 0}
                            &nbsp;&nbsp;
                            💬 ${post.comments || 0}
                        </small>

                    </div>

                `;

            });

        }

    } catch (error) {

        console.error(error);

        myPosts.innerHTML = `
            <div class="post-card">
                <p>${error.message}</p>
            </div>
        `;

    }

});
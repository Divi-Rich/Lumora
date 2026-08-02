// Import Firebase App
import { app } from "./firebase.js";

import {
    getFirestore,
    collection,
    query,
    orderBy,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";

const db = getFirestore(app);

const postsContainer = document.getElementById("postsContainer");

async function loadPosts() {

    postsContainer.innerHTML = "<p>Loading posts...</p>";

    try {

        const postsQuery = query(
            collection(db, "posts"),
            orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(postsQuery);

        if (snapshot.empty) {

            postsContainer.innerHTML = `
                <div class="post-card">
                    <h3>No Posts Yet</h3>
                    <p>Be the first person to post on Lumora!</p>
                </div>
            `;

            return;
        }

        postsContainer.innerHTML = "";

        snapshot.forEach((doc) => {

            const post = doc.data();

            const card = document.createElement("div");

            card.className = "post-card";

            card.innerHTML = `

                <div class="post-header">

                    <h3>${post.email}</h3>

                </div>

                <p class="post-content">

                    ${post.content}

                </p>

                <div class="post-footer">

                    ❤️ ${post.likes || 0} Likes

                    &nbsp;&nbsp;

                    💬 ${post.comments || 0} Comments

                </div>

            `;

            postsContainer.appendChild(card);

        });

    } catch (error) {

        console.error(error);

        postsContainer.innerHTML = `

            <div class="post-card">

                <h3>Error</h3>

                <p>${error.message}</p>

            </div>

        `;

    }

}

loadPosts();
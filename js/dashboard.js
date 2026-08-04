import {
    collection,
    getDocs,
    orderBy,
    query,
    doc,
    updateDoc,
    increment
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";

const welcomeUser = document.getElementById("welcomeUser");
const postsContainer = document.getElementById("postsContainer");
const logoutBtn = document.getElementById("logoutBtn");

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.href = "login.html";
        return;

    }

    welcomeUser.textContent = `👋 Welcome, ${user.displayName || "Lumorian"}!`;

    loadPosts();

});

async function loadPosts() {

    postsContainer.innerHTML = "<p>Loading posts...</p>";

    try {

        const q = query(
            collection(db, "posts"),
            orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);

        postsContainer.innerHTML = "";

        if (snapshot.empty) {

            postsContainer.innerHTML = `
            <div class="post-card">
                <h3>No posts yet</h3>
                <p>Be the first to share something on Lumora 🚀</p>
            </div>
            `;

            return;

        }

        snapshot.forEach(doc => {

            const post = doc.data();

            postsContainer.innerHTML += `
            <div class="post-card">

                <h3>${post.caption || "Untitled Post"}</h3>

                ${
                    post.image
                    ? `<img src="${post.image}" class="post-image">`
                    : ""
                }

 <div class="post-actions">

    <span onclick="likePost('${doc.id}')">
        ❤️ <span id="likes-${doc.id}">${post.likes || 0}</span>
    </span>

    <span>
        💬 ${post.comments || 0}
    </span>

</div>

            </div>
            `;

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

logoutBtn.addEventListener("click", async () => {

    await signOut(auth);

    window.location.href = "login.html";

});

window.likePost = async function(postId){

    try{

        const postRef = doc(db, "posts", postId);

        await updateDoc(postRef, {

            likes: increment(1)

        });

        loadPosts();

    }catch(error){

        console.error(error);

        alert("Failed to like post.");

    }

}
import { auth, db } from "./firebase.js";

import {
    collection,
    getDocs,
    getDoc,
    orderBy,
    query,
    doc,
    updateDoc,
    increment,
    arrayUnion,
    arrayRemove,
    addDoc,
    serverTimestamp
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

    welcomeUser.textContent =
        `👋 Welcome, ${user.displayName || "Lumorian"}!`;

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
                <p>Be the first to share something 🚀</p>
            </div>
            `;

            return;

        }

        snapshot.forEach(postDoc => {

            const post = postDoc.data();

            postsContainer.innerHTML += `

            <div class="post-card">

                <h3>${post.caption || "Untitled Post"}</h3>

                ${
                    post.image
                    ? `<img src="${post.image}" class="post-image">`
                    : ""
                }

                <div class="post-actions">

                    <span onclick="likePost('${postDoc.id}')">

                        ❤️
                        <span id="likes-${postDoc.id}">
                            ${post.likes || 0}
                        </span>

                    </span>

                    <span onclick="toggleComments('${postDoc.id}')">

                        💬 ${post.comments || 0}

                    </span>

                </div>

<div class="post-owner-actions">

    <button onclick="editPost('${postDoc.id}')">
        ✏ Edit
    </button>

    <button onclick="deletePost('${postDoc.id}')">
        🗑 Delete
    </button>

</div>

                <div
                    class="comments-box"
                    id="comments-${postDoc.id}"
                    style="display:none;">

                    <div id="comments-list-${postDoc.id}"></div>

                    <input
                        id="comment-input-${postDoc.id}"
                        type="text"
                        placeholder="Write a comment...">

                    <button
                        class="primary"
                        onclick="addComment('${postDoc.id}')">

                        Send

                    </button>

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

// ===============================
// LIKE / UNLIKE POST
// ===============================

window.likePost = async function(postId){

    try{

        const user = auth.currentUser;

        if(!user){
            alert("Please login first.");
            return;
        }

        const postRef = doc(db,"posts",postId);

        const snap = await getDoc(postRef);

        if(!snap.exists()) return;

        const post = snap.data();

        const likedBy = post.likedBy || [];

        if(likedBy.includes(user.uid)){

            await updateDoc(postRef,{
                likes: increment(-1),
                likedBy: arrayRemove(user.uid)
            });

        }else{

            await updateDoc(postRef,{
                likes: increment(1),
                likedBy: arrayUnion(user.uid)
            });

        }

        loadPosts();

    }catch(error){

        console.error(error);

        alert(error.message);

    }

};


// ===============================
// OPEN / CLOSE COMMENTS
// ===============================

window.toggleComments = async function(postId){

    const box = document.getElementById(`comments-${postId}`);

    if(box.style.display === "none"){

        box.style.display = "block";

        loadComments(postId);

    }else{

        box.style.display = "none";

    }

};


// ===============================
// LOAD COMMENTS
// ===============================

async function loadComments(postId){

    const container =
        document.getElementById(`comments-list-${postId}`);

    container.innerHTML = "Loading...";

    const q = query(
        collection(db,"posts",postId,"comments"),
        orderBy("createdAt","asc")
    );

    const snap = await getDocs(q);

    container.innerHTML = "";

    if(snap.empty){

        container.innerHTML = "<p>No comments yet.</p>";

        return;

    }

    snap.forEach(commentDoc=>{

        const comment = commentDoc.data();

        container.innerHTML += `
            <div class="comment">
                <b>${comment.username}</b>
                <p>${comment.text}</p>
            </div>
        `;

    });

}


// ===============================
// ADD COMMENT
// ===============================

window.addComment = async function(postId){

    const input =
        document.getElementById(`comment-input-${postId}`);

    const text = input.value.trim();

    if(text === "") return;

    const user = auth.currentUser;

    if(!user){

        alert("Please login.");

        return;

    }

    await addDoc(

        collection(db,"posts",postId,"comments"),

        {

            uid:user.uid,

            username:user.displayName || "Lumorian",

            text:text,

            createdAt:serverTimestamp()

        }

    );

    await updateDoc(

        doc(db,"posts",postId),

        {

            comments:increment(1)

        }

    );

    input.value = "";

    loadComments(postId);

    loadPosts();

};
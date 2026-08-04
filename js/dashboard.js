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
deleteDoc,
serverTimestamp
}
from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";

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
        ❤️ <span id="likes-${doc.id}">
            ${post.likes || 0}
        </span>
    </span>

    <span onclick="toggleComments('${doc.id}')">
        💬 ${post.comments || 0}
    </span>

</div>

<div class="comments-box" id="comments-${doc.id}" style="display:none;">

    <div id="comments-list-${doc.id}"></div>

    <input
        id="comment-input-${doc.id}"
        type="text"
        placeholder="Write a comment...">

    <button
        class="primary"
        onclick="addComment('${doc.id}')">

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

window.likePost = async function(postId){

    snap.forEach(doc=>{

        const comment=doc.data();

        container.innerHTML+=`

        <div class="comment">

            <b>${comment.username}</b>

            <p>${comment.text}</p>

        </div>

        `;

    });

}


window.addComment = async function(postId){

    const input=document.getElementById(`comment-input-${postId}`);

    const text=input.value.trim();

    if(text==="") return;

    const user=auth.currentUser;

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

    input.value="";

    loadComments(postId);

    loadPosts();

}

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

}

window.toggleComments = async function(postId){

    const box = document.getElementById(`comments-${postId}`);

    if(box.style.display==="none"){

        box.style.display="block";

        loadComments(postId);

    }else{

        box.style.display="none";

    }

}

async function loadComments(postId){

    const container = document.getElementById(`comments-list-${postId}`);

    container.innerHTML="Loading...";

    const q=query(

        collection(db,"posts",postId,"comments"),

        orderBy("createdAt","asc")

    );

    const snap=await getDocs(q);

    container.innerHTML="";

    if(snap.empty){

        container.innerHTML="<p>No comments yet.</p>";

        return;

    }

import { db } from "./firebase.js";

import {

collection,

query,

orderBy,

getDocs

} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";

const postsContainer=document.getElementById("postsContainer");

async function loadPosts(){

postsContainer.innerHTML="<p>Loading...</p>";

try{

const q=query(

collection(db,"posts"),

orderBy("createdAt","desc")

);

const snapshot=await getDocs(q);

if(snapshot.empty){

postsContainer.innerHTML=`

<div class="post-card">

<h2>No Posts Yet</h2>

<p>Be the first to post on Lumora.</p>

</div>

`;

return;

}

postsContainer.innerHTML="";

snapshot.forEach(doc=>{

const post=doc.data();

postsContainer.innerHTML+=`

<div class="post-card">

<h3>${post.email}</h3>

<p>${post.content}</p>

<div class="post-actions">

<button>❤️ ${post.likes}</button>

<button>💬 ${post.comments}</button>

</div>

</div>

`;

});

}catch(error){

postsContainer.innerHTML=`

<div class="post-card">

<h2>Error</h2>

<p>${error.message}</p>

</div>

`;

}

}

loadPosts();
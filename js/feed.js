import { db } from "./firebase.js";

import {
collection,
getDocs,
query,
orderBy
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";

const feedContainer = document.getElementById("feedContainer");

async function loadFeed(){

try{

const q=query(

collection(db,"posts"),

orderBy("createdAt","desc")

);

const snapshot=await getDocs(q);

feedContainer.innerHTML="";

if(snapshot.empty){

feedContainer.innerHTML=`
<div class="post-card">

<h3>No Posts Yet</h3>

<p>Create the first Lumora post 🚀</p>

</div>
`;

return;

}

snapshot.forEach(doc=>{

const post=doc.data();

feedContainer.innerHTML+=`

<div class="post-card">

<h3>${post.caption}</h3>

${post.image?`<img src="${post.image}" class="post-image">`:""}

<div class="post-actions">

<span>❤️ ${post.likes||0}</span>

<span>💬 ${post.comments||0}</span>

<span>📤 Share</span>

</div>

</div>

`;

});

}catch(error){

feedContainer.innerHTML=`

<div class="post-card">

<p>${error.message}</p>

</div>

`;

}

}

loadFeed();
import { auth, db } from "./firebase.js";

import {

collection,

addDoc,

serverTimestamp

} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";

const publishBtn = document.getElementById("publishBtn");

const postContent = document.getElementById("postContent");

const status = document.getElementById("status");

publishBtn.addEventListener("click", async () => {

const text = postContent.value.trim();

if(text===""){

status.style.color="red";

status.textContent="Please write something.";

return;

}

const user = auth.currentUser;

if(!user){

alert("Please login.");

window.location.href="login.html";

return;

}

try{

await addDoc(collection(db,"posts"),{

uid:user.uid,

email:user.email,

content:text,

likes:0,

comments:0,

createdAt:serverTimestamp()

});

status.style.color="#00ff88";

status.textContent="✅ Post Published!";

postContent.value="";

setTimeout(()=>{

window.location.href="feed.html";

},1000);

}catch(error){

status.style.color="red";

status.textContent=error.message;

}

});
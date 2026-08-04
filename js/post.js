import { auth, db } from "./firebase.js";
import { uploadImage } from "./cloudinary.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";

const postForm = document.getElementById("postForm");
const caption = document.getElementById("caption");
const image = document.getElementById("postImage");

postForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    try{

        const user = auth.currentUser;

        if(!user){
            alert("Please login first.");
            return;
        }

        let imageUrl = "";

        if(image.files.length > 0){
            imageUrl = await uploadImage(image.files[0]);
        }

        await addDoc(collection(db, "posts"), {

    uid: user.uid,

    caption: caption.value,

    image: imageUrl,

    likes: 0,

    likedBy: [],

    comments: 0,

    createdAt: serverTimestamp()

});

        alert("🎉 Post published!");

        postForm.reset();

    }catch(error){

        console.error(error);

        alert(error.message);

    }

});
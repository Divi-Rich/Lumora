import { auth, db } from "./firebase.js";

import {
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";

const fullName = document.getElementById("fullName");
const username = document.getElementById("username");
const bio = document.getElementById("bio");

const profileImage = document.getElementById("profileImage");
const profilePreview = document.getElementById("profilePreview");

const saveBtn = document.getElementById("saveProfileBtn");
const status = document.getElementById("status");

let currentUser;

// Check Login
onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.href = "login.html";
        return;

    }

    currentUser = user;

    try {

        const docRef = doc(db, "users", user.uid);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {

            const data = docSnap.data();

            fullName.value = data.fullName || "";

            username.value = data.username || "";

            bio.value = data.bio || "";

            if (data.profilePicture) {

                profilePreview.src = data.profilePicture;

            }

        }

    } catch (error) {

        console.error(error);

    }

});

// Preview Selected Image
profileImage.addEventListener("change", () => {

    const file = profileImage.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function(e){

        profilePreview.src = e.target.result;

    };

    reader.readAsDataURL(file);

});

// Save Profile
saveBtn.addEventListener("click", async () => {

    try {

        await updateDoc(

            doc(db, "users", currentUser.uid),

            {

                fullName: fullName.value,

                username: username.value.toLowerCase(),

                bio: bio.value

            }

        );

        status.style.color = "#00ff88";

        status.textContent = "✅ Profile Updated Successfully";

    }

    catch(error){

        status.style.color = "red";

        status.textContent = error.message;

    }

});
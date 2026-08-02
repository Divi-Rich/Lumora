import { auth } from "./firebase.js";

import {
    signOut
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";

// Buttons
const editProfileBtn = document.getElementById("editProfileBtn");
const changePasswordBtn = document.getElementById("changePasswordBtn");
const notificationsBtn = document.getElementById("notificationsBtn");
const languageBtn = document.getElementById("languageBtn");
const aboutBtn = document.getElementById("aboutBtn");
const logoutBtn = document.getElementById("logoutBtn");

// Edit Profile
editProfileBtn.addEventListener("click", () => {

    window.location.href = "edit-profile.html";

});

// Change Password
changePasswordBtn.addEventListener("click", () => {

    alert("🚧 Change Password feature is coming soon.");

});

// Notifications
notificationsBtn.addEventListener("click", () => {

    alert("🔔 Notification settings coming soon.");

});

// Language
languageBtn.addEventListener("click", () => {

    alert("🌍 Multiple languages coming soon.");

});

// About
aboutBtn.addEventListener("click", () => {

    alert("🌟 Lumora\n\nDiscover • Learn • Connect • Grow\n\nVersion 1.0");

});

// Logout
logoutBtn.addEventListener("click", async () => {

    const confirmLogout = confirm("Do you want to logout?");

    if (!confirmLogout) return;

    try {

        await signOut(auth);

        alert("👋 You have been logged out.");

        window.location.href = "login.html";

    } catch (error) {

        alert(error.message);

        console.error(error);

    }

});
// =======================================
// LUMORA SCRIPT v1.0
// =======================================

console.log("🌟 Lumora Loaded Successfully");

// ===============================
// IMAGE PREVIEW
// ===============================

const imageUpload = document.getElementById("imageUpload");
const imagePreview = document.getElementById("imagePreview");

if (imageUpload && imagePreview) {

imageUpload.addEventListener("change", function () {

const file = this.files[0];

if (!file) return;

const reader = new FileReader();

reader.onload = function (e) {

imagePreview.innerHTML = `
<img src="${e.target.result}" alt="Preview">
`;

};

reader.readAsDataURL(file);

});

}

// ===============================
// VIDEO PREVIEW
// ===============================

const videoUpload = document.getElementById("videoUpload");
const videoPreview = document.getElementById("videoPreview");

if (videoUpload && videoPreview) {

videoUpload.addEventListener("change", function () {

const file = this.files[0];

if (!file) return;

const url = URL.createObjectURL(file);

videoPreview.innerHTML = `
<video controls>
<source src="${url}">
Your browser does not support video.
</video>
`;

});

}

// ===============================
// CREATE POST
// ===============================

const postForm = document.getElementById("postForm");

if (postForm) {

postForm.addEventListener("submit", function (e) {

e.preventDefault();

const title = document.getElementById("postTitle").value;

const content = document.getElementById("postContent").value;

const image = imagePreview.innerHTML;

const video = videoPreview.innerHTML;

const post = {

author: "Eduok Divine Richard",

title: title,

content: content,

image: image,

video: video,

likes: 0,

date: new Date().toLocaleString()

};

let posts = JSON.parse(localStorage.getItem("lumoraPosts")) || [];

posts.unshift(post);

localStorage.setItem("lumoraPosts", JSON.stringify(posts));

alert("🎉 Post Published Successfully!");

postForm.reset();

imagePreview.innerHTML = "";

videoPreview.innerHTML = "";

});

}

// ===============================
// LOAD POSTS
// ===============================

const postsContainer = document.getElementById("postsContainer");

if (postsContainer) {

const posts = JSON.parse(localStorage.getItem("lumoraPosts")) || [];

if (posts.length === 0) {

postsContainer.innerHTML = `
<div class="feed-card">
<h2>No Posts Yet</h2>
<p>Create your first post to see it here.</p>
</div>
`;

}

posts.forEach((post, index) => {

postsContainer.innerHTML += `

<div class="feed-card">

<div class="post-header">

<div class="avatar">👤</div>

<div>

<h3>${post.author}</h3>

<small>${post.date}</small>

</div>

</div>

<h2>${post.title}</h2>

<p>${post.content}</p>

${post.image}

${post.video}

<div class="post-actions">

<button onclick="likePost(${index}, this)">
❤️ ${post.likes}
</button>

<button onclick="commentPost()">
💬 Comment
</button>

<button onclick="sharePost()">
🔄 Share
</button>

<button onclick="savePost()">
🔖 Save
</button>

</div>

</div>

`;

});

}

// ===============================
// LIKE POST
// ===============================

function likePost(index, button) {

let posts = JSON.parse(localStorage.getItem("lumoraPosts")) || [];

posts[index].likes++;

localStorage.setItem("lumoraPosts", JSON.stringify(posts));

button.innerHTML = "❤️ " + posts[index].likes;

}

// ===============================
// COMMENT
// ===============================

function commentPost() {

alert("💬 Comments will be added in Lumora v2.");

}

// ===============================
// SHARE
// ===============================

function sharePost() {

alert("🔄 Share feature coming soon.");

}

// ===============================
// SAVE
// ===============================

function savePost() {

alert("🔖 Post Saved!");

}

// ===============================
// START BUTTON
// ===============================

const startButton = document.querySelector(".primary");

if (startButton && !postForm) {

startButton.addEventListener("click", function () {

alert("🚀 Welcome to Lumora!");

});

}

console.log("✅ Lumora Ready");
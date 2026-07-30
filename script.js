// ===============================
// LUMORA SCRIPT
// ===============================

// Image Preview
const imageUpload = document.getElementById("imageUpload");
const imagePreview = document.getElementById("imagePreview");

if (imageUpload) {

imageUpload.addEventListener("change", function () {

const file = this.files[0];

if(file){

const reader = new FileReader();

reader.onload = function(e){

imagePreview.innerHTML = `
<img src="${e.target.result}" alt="Preview">
`;

};

reader.readAsDataURL(file);

}

});

}

// Video Preview
const videoUpload = document.getElementById("videoUpload");
const videoPreview = document.getElementById("videoPreview");

if(videoUpload){

videoUpload.addEventListener("change",function(){

const file=this.files[0];

if(file){

const url=URL.createObjectURL(file);

videoPreview.innerHTML=`
<video controls>
<source src="${url}">
</video>
`;

}

});

}

// Create Post
const postForm=document.getElementById("postForm");

if(postForm){

postForm.addEventListener("submit",function(e){

e.preventDefault();

const title=document.getElementById("postTitle").value;
const content=document.getElementById("postContent").value;

const post={

title:title,

content:content,

date:new Date().toLocaleString()

};

let posts=JSON.parse(localStorage.getItem("lumoraPosts"))||[];

posts.unshift(post);

localStorage.setItem("lumoraPosts",JSON.stringify(posts));

alert("🎉 Your post has been published!");

postForm.reset();

imagePreview.innerHTML="";

videoPreview.innerHTML="";

});

}

// Load Posts
const postsContainer=document.getElementById("postsContainer");

if(postsContainer){

const posts=JSON.parse(localStorage.getItem("lumoraPosts"))||[];

posts.forEach(post=>{

postsContainer.innerHTML+=`

<div class="feed-card">

<h2>${post.title}</h2>

<p>${post.content}</p>

<small>${post.date}</small>

</div>

`;

});

}
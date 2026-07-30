// ===============================
// LUMORA v0.3
// ===============================

// Welcome Message
console.log("🚀 Welcome to Lumora");

// Buttons
const primaryButtons = document.querySelectorAll(".primary");
const secondaryButtons = document.querySelectorAll(".secondary");

// Start Journey Button
primaryButtons.forEach(button => {

button.addEventListener("click", () => {

alert(
"🚀 Welcome to Lumora!\n\nYour journey begins now."
);

});

});

// Explore Button
secondaryButtons.forEach(button => {

button.addEventListener("click", () => {

window.scrollTo({

top:document.body.scrollHeight/2,

behavior:"smooth"

});

});

});

// Navbar Shadow
const header=document.querySelector("header");

window.addEventListener("scroll",()=>{

if(window.scrollY>30){

header.style.boxShadow="0 10px 25px rgba(0,0,0,.25)";

}else{

header.style.boxShadow="none";

}

});

// Reveal Animation
const cards=document.querySelectorAll(".card");

const reveal=()=>{

cards.forEach(card=>{

const top=card.getBoundingClientRect().top;

const screen=window.innerHeight;

if(top<screen-80){

card.style.opacity="1";

card.style.transform="translateY(0)";

}

});

};

cards.forEach(card=>{

card.style.opacity="0";

card.style.transform="translateY(40px)";
card.style.transition=".6s";

});

window.addEventListener("scroll",reveal);

reveal();

// Footer Year
const year=new Date().getFullYear();

const footer=document.querySelector("footer p:last-child");

footer.innerHTML=`© ${year} Lumora. All Rights Reserved.`;

console.log("✅ Lumora Loaded Successfully");
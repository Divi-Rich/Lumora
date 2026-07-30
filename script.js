// ===============================
// LUMORA SCRIPT v0.5
// ===============================

console.log("🌟 Lumora Loaded");

// Like buttons
const buttons = document.querySelectorAll(".feed-actions button");

buttons.forEach(button=>{

button.addEventListener("click",()=>{

if(button.innerText.includes("❤️")){

button.style.background="#ef4444";

button.innerText="❤️ Liked";

}

else if(button.innerText.includes("💬")){

alert("Comments feature coming soon!");

}

else if(button.innerText.includes("📤")){

alert("Share feature coming soon!");

}

else if(button.innerText.includes("🔖")){

button.style.background="#22c55e";

button.innerText="✅ Saved";

}

});

});

// Welcome Button

const primary=document.querySelector(".primary");

if(primary){

primary.addEventListener("click",()=>{

alert("🚀 Welcome to Lumora!");

});

}

console.log("✅ Feed Ready");
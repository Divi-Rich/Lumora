// ==========================================
// LUMORA v0.4
// COMPLETE SCRIPT.JS
// ==========================================

console.log("🚀 Lumora Loaded Successfully");

// ===========================
// BUTTONS
// ===========================

const primaryButtons = document.querySelectorAll(".primary");
const secondaryButtons = document.querySelectorAll(".secondary");

primaryButtons.forEach(button => {

    button.addEventListener("click", () => {

        alert(
`🚀 Welcome to Lumora!

Your journey starts now.

Discover.
Learn.
Connect.
Grow.`
        );

    });

});

secondaryButtons.forEach(button => {

    button.addEventListener("click", () => {

        window.scrollTo({

            top: document.body.scrollHeight,

            behavior: "smooth"

        });

    });

});

// ===========================
// STICKY NAVBAR SHADOW
// ===========================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {

        header.style.boxShadow =
            "0 10px 25px rgba(0,0,0,.35)";

    } else {

        header.style.boxShadow = "none";

    }

});

// ===========================
// CARD ANIMATION
// ===========================

const cards = document.querySelectorAll(".card,.dashboard-card");

cards.forEach(card => {

    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";
    card.style.transition = ".7s";

});

function revealCards() {

    cards.forEach(card => {

        const position = card.getBoundingClientRect().top;

        const screen = window.innerHeight;

        if (position < screen - 80) {

            card.style.opacity = "1";
            card.style.transform = "translateY(0)";

        }

    });

}

window.addEventListener("scroll", revealCards);

revealCards();

// ===========================
// BUTTON HOVER EFFECT
// ===========================

const buttons = document.querySelectorAll("button");

buttons.forEach(button => {

    button.addEventListener("mouseenter", () => {

        button.style.transform = "scale(1.05)";

    });

    button.addEventListener("mouseleave", () => {

        button.style.transform = "scale(1)";

    });

});

// ===========================
// LOGIN FORM
// ===========================

const loginForm = document.querySelector("form");

if (loginForm) {

    loginForm.addEventListener("submit", function(e){

        e.preventDefault();

        alert("✅ Login feature coming in Lumora v0.5");

    });

}

// ===========================
// AUTO YEAR
// ===========================

const footer = document.querySelector("footer");

if (footer) {

    const year = new Date().getFullYear();

    footer.innerHTML = footer.innerHTML.replace("2026", year);

}

// ===========================
// CONSOLE
// ===========================

console.log("✅ Navigation Ready");

console.log("✅ Dashboard Ready");

console.log("✅ Animations Ready");

console.log("✅ Lumora v0.4 Running");
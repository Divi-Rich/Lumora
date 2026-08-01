function animate(id, end) {

let current = 0;

const speed = Math.ceil(end / 100);

const counter = setInterval(() => {

current += speed;

if (current >= end) {
current = end;
clearInterval(counter);
}

document.getElementById(id).textContent = current.toLocaleString();

}, 20);

}

animate("users", 1285);
animate("posts", 5432);
animate("groups", 86);
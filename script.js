/* ======================================================
   LUMORA V3.0
   MAIN JAVASCRIPT
====================================================== */


/* ==========================
   ANIMATED COUNTERS
========================== */

function animate(id, end) {

    const element = document.getElementById(id);

    if (!element) {
        return;
    }

    let current = 0;

    const duration = 1800;

    const steps = 100;

    const increment = end / steps;

    const intervalTime = duration / steps;


    const counter = setInterval(() => {

        current += increment;


        if (current >= end) {

            current = end;

            clearInterval(counter);

        }


        element.textContent =
            Math.floor(current).toLocaleString();

    }, intervalTime);

}


/* ==========================
   START COUNTERS
========================== */

document.addEventListener("DOMContentLoaded", () => {

    animate("users", 1285);

    animate("posts", 5432);

    animate("groups", 86);

});
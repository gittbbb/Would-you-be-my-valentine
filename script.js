const noButton = document.getElementById("no");
const yesButton = document.getElementById("yes");
const mainContent = document.getElementById("mainContent");
const success = document.getElementById("success");

let scale = 1;

function moveButton() {
    const maxX = window.innerWidth - noButton.offsetWidth;
    const maxY = window.innerHeight - noButton.offsetHeight;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    noButton.style.left = randomX + "px";
    noButton.style.top = randomY + "px";

    // Rétrécissement progressif
    if (scale > 0.2) {
        scale -= 0.05;
        noButton.style.transform = `scale(${scale})`;
    }
}

// Ultra réactif : se déclenche dès qu'on approche
document.addEventListener("mousemove", (e) => {
    const rect = noButton.getBoundingClientRect();

    const distance = Math.hypot(
        e.clientX - (rect.left + rect.width / 2),
        e.clientY - (rect.top + rect.height / 2)
    );

    if (distance < 120) {
        moveButton();
    }
});

yesButton.addEventListener("click", () => {
    mainContent.classList.add("hidden");
    success.classList.remove("hidden");
});

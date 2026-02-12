const noButton = document.getElementById("no");
const yesButton = document.getElementById("yes");
const message = document.getElementById("message");

noButton.addEventListener("mouseenter", () => {
    const container = document.querySelector(".buttons");

    const maxX = container.clientWidth - noButton.offsetWidth;
    const maxY = container.clientHeight - noButton.offsetHeight;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    noButton.style.left = `${randomX}px`;
    noButton.style.top = `${randomY}px`;
});

yesButton.addEventListener("click", () => {
    message.textContent = "Excellent choix 😍🎉";
});

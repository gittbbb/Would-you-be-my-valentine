const noButton = document.getElementById("no");
const yesButton = document.getElementById("yes");
const mainContent = document.getElementById("mainContent");
const success = document.getElementById("success");

let yesScale = 1;

// --- BOUTON NON QUI FUIT ---
function moveNoButton() {
    const maxX = window.innerWidth - noButton.offsetWidth;
    const maxY = window.innerHeight - noButton.offsetHeight;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    noButton.style.left = randomX + "px";
    noButton.style.top = randomY + "px";
}

document.addEventListener("mousemove", (e) => {
    const rect = noButton.getBoundingClientRect();

    const distance = Math.hypot(
        e.clientX - (rect.left + rect.width / 2),
        e.clientY - (rect.top + rect.height / 2)
    );

    if (distance < 150) {
        moveNoButton();

        // Faire grossir le OUI légèrement
        yesScale += 0.05;
        yesButton.style.transform = `scale(${yesScale})`;
    }
});

// --- CONFETTIS + FEU D'ARTIFICE ---
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function createExplosion(x, y) {
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: x,
            y: y,
            angle: Math.random() * 2 * Math.PI,
            speed: Math.random() * 5 + 2,
            radius: Math.random() * 3 + 2,
            alpha: 1
        });
    }
}

function animateFireworks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, index) => {
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        p.alpha -= 0.01;

        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 60%)`;
        ctx.fill();

        if (p.alpha <= 0) {
            particles.splice(index, 1);
        }
    });

    requestAnimationFrame(animateFireworks);
}

animateFireworks();

// --- CLIC SUR OUI ---
yesButton.addEventListener("click", () => {
    mainContent.classList.add("hidden");
    success.classList.remove("hidden");

    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createExplosion(
                Math.random() * canvas.width,
                Math.random() * canvas.height / 2
            );
        }, i * 300);
    }
});

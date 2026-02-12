const noButton = document.getElementById("no");
const yesButton = document.getElementById("yes");
const zone = document.querySelector(".button-zone");
const mainContent = document.getElementById("mainContent");
const success = document.getElementById("success");

let yesScale = 1;
let angle = 0;

// --- NON tourne autour du OUI ---
function orbitNoButton() {
    const yesRect = yesButton.getBoundingClientRect();
    const zoneRect = zone.getBoundingClientRect();

    const centerX = yesRect.left - zoneRect.left + yesRect.width / 2;
    const centerY = yesRect.top - zoneRect.top + yesRect.height / 2;

    const radius = 100;

    angle += 0.1;

    const x = centerX + radius * Math.cos(angle) - noButton.offsetWidth / 2;
    const y = centerY + radius * Math.sin(angle) - noButton.offsetHeight / 2;

    noButton.style.left = x + "px";
    noButton.style.top = y + "px";
}

document.addEventListener("mousemove", (e) => {
    const rect = noButton.getBoundingClientRect();

    const distance = Math.hypot(
        e.clientX - (rect.left + rect.width / 2),
        e.clientY - (rect.top + rect.height / 2)
    );

    if (distance < 150) {
        orbitNoButton();

        yesScale += 0.05;
        yesButton.style.transform = `scale(${yesScale})`;
    }
});

// --- FEU D’ARTIFICE ---
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function explode(x, y) {
    for (let i = 0; i < 120; i++) {
        particles.push({
            x,
            y,
            angle: Math.random() * 2 * Math.PI,
            speed: Math.random() * 6 + 2,
            radius: Math.random() * 3 + 2,
            alpha: 1
        });
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        p.alpha -= 0.01;

        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${Math.random()*360},100%,60%)`;
        ctx.fill();

        if (p.alpha <= 0) particles.splice(i, 1);
    });

    requestAnimationFrame(animate);
}

animate();

// --- CLIC OUI ---
yesButton.addEventListener("click", () => {
    mainContent.classList.add("hidden");
    success.classList.remove("hidden");

    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            explode(
                Math.random() * canvas.width,
                Math.random() * canvas.height / 2
            );
        }, i * 250);
    }
});

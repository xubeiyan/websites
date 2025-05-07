const canvas = document.getElementById("Matrix");
const context = canvas.getContext("2d");

const katakana = "アウエオカキケコサシスセソタツテナニヌネハヒホマミムメモヤヨラリワー";
const latin = "*+:<>z|¦╌▪꞊";
const nums = "012345789";

const alphabet = katakana + latin + nums;

const fontSize = 16;

let columns = canvas.width / fontSize;
let rainDrops = Array.from({ length: columns }).fill(canvas.height);

const draw = () => {
    context.fillStyle = "rgba(0, 0, 0, 0.05)";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "#0F0";
    context.font = fontSize + "px myFont, monospace";

    for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(
            Math.floor(Math.random() * alphabet.length)
        );
        context.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            rainDrops[i] = 0;
        }
        rainDrops[i]++;
    }
};

let fps = 15;
let fpsInterval, now, then, elapsed;
let animateId = null;

const animate = () => {
    animateId = requestAnimationFrame(animate);

    now = Date.now();
    elapsed = now - then;

    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        draw();
    }
};

const startAnimating = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const columns = canvas.width / fontSize;
    rainDrops = Array.from({ length: columns }).fill(canvas.height);
    fpsInterval = 1000 / fps;
    then = window.performance.now();
    animate();
};

startAnimating();

window.addEventListener("resize", () => {
    cancelAnimationFrame(animateId);
    startAnimating();
});

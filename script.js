const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

// Setup the initial canvas.
const setupCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};

window.addEventListener('resize', setupCanvas);
setupCanvas();

// Particle color variations.
const colors = ['red', 'blue', 'green', 'yellow', 'pink', 'white', 'purple']; 

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update(mouseX, mouseY) {
        let dx = mouseX - this.x;
        let dy = mouseY - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let maxDistance = 100;

        if (distance < maxDistance) {
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let maxSpeed = 2; 

            this.speedX += forceDirectionX * maxSpeed;
            this.speedY += forceDirectionY * maxSpeed;
        }

        this.x += this.speedX;
        this.y += this.speedY;

        this.speedX *= 0.95; 
        this.speedY *= 0.95;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

const generateParticles = (count) => Array.from({ length: count }, () => new Particle());

const randomParticleCount = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
const particles = generateParticles(randomParticleCount);

let mouseX = 0;
let mouseY = 0;

canvas.addEventListener('mousemove', (event) => {
    mouseX = event.clientX - canvas.offsetLeft;
    mouseY = event.clientY - canvas.offsetTop;
});

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update(mouseX, mouseY);
        particle.draw();
    });

    requestAnimationFrame(animate);
};

animate();

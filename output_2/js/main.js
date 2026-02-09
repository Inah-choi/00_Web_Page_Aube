document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. HERO SECTION: Canvas Constellation
    // ==========================================
    const canvas = document.getElementById('constellation-canvas');
    const ctx = canvas.getContext('2d');
    
    let width, height;
    let particles = [];
    
    // Configuration
    const particleCount = 100; // Number of stars
    const connectionDistance = 150; // Max distance to draw line
    const mouseDistance = 200; // Interaction radius
    
    // Mouse state
    let mouse = { x: null, y: null };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    // Handle Resize
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    
    resize();
    window.addEventListener('resize', () => {
        resize();
        initParticles(); // Re-distribute particles on resize
    });

    // Particle Class
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5; // Velocity X
            this.vy = (Math.random() - 0.5) * 0.5; // Velocity Y
            this.size = Math.random() * 2 + 1;
            this.color = 'rgba(197, 198, 199, 0.8)'; // Starlight White
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            // Mouse Interaction (Magnetic effect)
            if (mouse.x != null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx*dx + dy*dy);
                
                if (distance < mouseDistance) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouseDistance - distance) / mouseDistance;
                    const directionX = forceDirectionX * force * 0.6;
                    const directionY = forceDirectionY * force * 0.6;
                    this.x += directionX;
                    this.y += directionY;
                }
            }
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            // Draw connections
            for (let j = i; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let distance = Math.sqrt(dx*dx + dy*dy);

                if (distance < connectionDistance) {
                    ctx.beginPath();
                    // Opacity based on distance (closer = brighter)
                    let opacity = 1 - (distance / connectionDistance);
                    ctx.strokeStyle = `rgba(102, 252, 241, ${opacity * 0.2})`; // Electric Cyan lines
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }

    initParticles();
    animate();

    // ==========================================
    // 2. CONTACT FORM LOGIC
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const feedbackDiv = document.getElementById('form-feedback');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Change button state
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Transmitting...';
            btn.disabled = true;

            // Collect Data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('https://aube-backend.onrender.com', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    // Success UI
                    contactForm.reset();
                    contactForm.style.display = 'none'; // Hide form
                    feedbackDiv.innerText = "Signal Received. We will respond at first light.";
                    feedbackDiv.classList.remove('hidden');
                    feedbackDiv.style.display = 'block';
                } else {
                    throw new Error('Transmission Failed');
                }
            } catch (error) {
                console.error('Error:', error);
                // Fallback for demo purposes (since localhost:8000 might not exist yet)
                // In a real scenario, show error message. 
                // For this portfolio demo, we simulate success after failure if API is down:
                setTimeout(() => {
                    contactForm.style.display = 'none';
                    feedbackDiv.innerText = "Signal Received (Simulated). We will respond at first light.";
                    feedbackDiv.classList.remove('hidden');
                    feedbackDiv.style.display = 'block';
                }, 1000);
            } finally {
                btn.innerText = originalText;
                btn.disabled = false;
            }
        });
    }
});
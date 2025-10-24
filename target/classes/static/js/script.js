// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const spans = hamburger.querySelectorAll('span');
        hamburger.classList.toggle('active');

        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Close menu when clicking on nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth scrolling for navigation links - FIXED to prevent errors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Skip if it's just "#" (like the Download CV button)
        if (href === '#' || href.length <= 1) {
            return; // Don't prevent default, let other handlers work
        }

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });

    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 14, 39, 0.9)';
        navbar.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 14, 39, 0.7)';
        navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)';
    }
});

// Enhanced typing effect
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const texts = ['Software Engineer 💻', 'Java Developer ☕', 'Tech Enthusiast 🚀', 'Problem Solver 🧩'];
    let textIndex = 0, charIndex = 0, isDeleting = false;

    function type() {
        const currentText = texts[textIndex];
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? 50 : 100);
        }
    }
    setTimeout(type, 1000);
}

// ===================================
// CONTACT FORM WITH BACKEND API
// ===================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalContent = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        try {
            const response = await fetch('/api/contact/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok && data.success) {
                showNotification('✅ Thank you! Your message has been sent successfully! I will get back to you soon. 🚀', 'success');
                contactForm.reset();
            } else {
                showNotification('❌ ' + (data.message || 'Something went wrong. Please try again.'), 'error');
            }

        } catch (error) {
            console.error('Error:', error);
            showNotification('❌ Network error. Please check your connection and try again.', 'error');
        } finally {
            submitBtn.innerHTML = originalContent;
            submitBtn.disabled = false;
        }
    });
}

// Notification function
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1.5rem 2rem;
        background: ${type === 'success' ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'linear-gradient(135deg, #f5576c, #f093fb)'};
        color: white;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        z-index: 10001;
        font-weight: 600;
        animation: slideIn 0.3s ease;
        max-width: 400px;
        font-size: 1rem;
    `;

    notification.textContent = message;
    document.body.appendChild(notification);

    const style = document.createElement('style');
    style.textContent = '@keyframes slideIn { from { transform: translateX(400px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }';
    document.head.appendChild(style);

    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 5000);
}

// Scroll reveal animation
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -100px 0px' };
const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

const elementsToAnimate = document.querySelectorAll('.project-card, .skill-category, .timeline-item, .stat-item, .contact-item, .about-text');
elementsToAnimate.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
});

// Parallax effect for hero section
document.addEventListener('mousemove', (e) => {
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage && window.innerWidth > 968) {
        const moveX = (e.clientX - window.innerWidth / 2) / 50;
        const moveY = (e.clientY - window.innerHeight / 2) / 50;
        heroImage.style.transform = `translate(${moveX}px, ${moveY}px) scale(1)`;
    }
});

// Skill tags animation
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.1}s`;
});

// Project cards tilt effect
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Counter animation for stats
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const target = entry.target.querySelector('h3');
            const value = parseFloat(target.textContent);
            target.textContent = '0';
            animateCounter(target, value);
            entry.target.classList.add('counted');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// Page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
});

// ===================================
// PROFESSIONAL FIREWORKS ANIMATION
// ===================================
const downloadCVBtn = document.getElementById('downloadCVBtn');

if (downloadCVBtn) {
    downloadCVBtn.addEventListener('click', function(e) {
        e.preventDefault();
        launchFireworks();
        setTimeout(() => showContactMessage(), 8000);
    });
}

function launchFireworks() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const fireworks = [];
    const particles = [];
    const colors = [
        ['#FF1744', '#F50057', '#D500F9'],
        ['#FFD600', '#FFC107', '#FF6F00'],
        ['#00E5FF', '#00B0FF', '#2979FF'],
        ['#76FF03', '#00E676', '#00C853'],
        ['#FF4081', '#E040FB', '#7C4DFF'],
        ['#FF6E40', '#FF3D00', '#DD2C00'],
        ['#EEFF41', '#C6FF00', '#AEEA00'],
        ['#18FFFF', '#00E5FF', '#00B8D4']
    ];

    class Firework {
        constructor(x, y, targetY) {
            this.x = x;
            this.y = y;
            this.targetY = targetY;
            this.speed = 3;
            this.acceleration = 1.05;
            this.exploded = false;
            this.colorPalette = colors[Math.floor(Math.random() * colors.length)];
            this.trail = [];
        }

        update() {
            if (!this.exploded) {
                this.trail.push({x: this.x, y: this.y});
                if (this.trail.length > 10) this.trail.shift();
                this.speed *= this.acceleration;
                this.y -= this.speed;
                if (this.y <= this.targetY) this.explode();
            }
        }

        draw() {
            if (!this.exploded) {
                ctx.beginPath();
                for (let i = 0; i < this.trail.length; i++) {
                    const t = this.trail[i];
                    ctx.fillStyle = `rgba(255, 255, 255, ${i / this.trail.length})`;
                    ctx.arc(t.x, t.y, 2, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.fillStyle = '#fff';
                ctx.beginPath();
                ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        explode() {
            this.exploded = true;
            const particleCount = 100 + Math.random() * 50;
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle(this.x, this.y, this.colorPalette));
            }
        }
    }

    class Particle {
        constructor(x, y, colorPalette) {
            this.x = x;
            this.y = y;
            this.color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            const angle = Math.random() * Math.PI * 2;
            const speed = 1 + Math.random() * 6;
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
            this.gravity = 0.05;
            this.friction = 0.98;
            this.alpha = 1;
            this.decay = 0.015 + Math.random() * 0.01;
            this.size = 2 + Math.random() * 2;
            this.sparkle = Math.random() > 0.5;
        }

        update() {
            this.vx *= this.friction;
            this.vy *= this.friction;
            this.vy += this.gravity;
            this.x += this.vx;
            this.y += this.vy;
            this.alpha -= this.decay;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2);
            gradient.addColorStop(0, this.color);
            gradient.addColorStop(0.5, this.color + '80');
            gradient.addColorStop(1, this.color + '00');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            if (this.sparkle && this.alpha > 0.5) {
                ctx.fillStyle = '#fff';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 0.5, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        }
    }

    let launchCount = 0;
    const launchInterval = setInterval(() => {
        if (launchCount >= 15) {
            clearInterval(launchInterval);
            return;
        }
        fireworks.push(new Firework(Math.random() * canvas.width, canvas.height, 100 + Math.random() * 200));
        launchCount++;
    }, 400);

    function animate() {
        ctx.fillStyle = 'rgba(10, 14, 39, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = fireworks.length - 1; i >= 0; i--) {
            fireworks[i].update();
            fireworks[i].draw();
            if (fireworks[i].exploded) fireworks.splice(i, 1);
        }

        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw();
            if (particles[i].alpha <= 0) particles.splice(i, 1);
        }

        if (fireworks.length > 0 || particles.length > 0) {
            requestAnimationFrame(animate);
        } else {
            setTimeout(() => document.body.removeChild(canvas), 1000);
        }
    }
    animate();
}

function showContactMessage() {
    const modal = document.createElement('div');
    modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(10,14,39,0.95);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;z-index:10000;animation:fadeIn 0.3s ease';

    const modalContent = document.createElement('div');
    modalContent.style.cssText = 'background:linear-gradient(135deg,rgba(102,126,234,0.1),rgba(118,75,162,0.1));backdrop-filter:blur(20px);border:2px solid rgba(102,126,234,0.3);border-radius:20px;padding:3rem;max-width:500px;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,0.5);animation:scaleIn 0.4s cubic-bezier(0.4,0,0.2,1)';

    modalContent.innerHTML = `
        <div style="font-size:4rem;margin-bottom:1rem">🎆</div>
        <h2 style="font-size:2rem;margin-bottom:1rem;background:linear-gradient(135deg,#667eea,#764ba2);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;font-weight:800">CV Request</h2>
        <p style="font-size:1.2rem;color:#b4b9d4;margin-bottom:2rem;line-height:1.6">Please contact <strong style="color:#667eea">Shubham</strong> directly to request the CV.</p>
        <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap">
            <a href="mailto:spcse900@gmail.com" style="padding:1rem 2rem;background:linear-gradient(135deg,#667eea,#764ba2);color:white;text-decoration:none;border-radius:10px;font-weight:600;display:inline-flex;align-items:center;gap:0.5rem;transition:transform 0.3s"><i class="fas fa-envelope"></i> Email Me</a>
            <a href="https://linkedin.com/in/ShubhamPrajapati" target="_blank" style="padding:1rem 2rem;background:rgba(255,255,255,0.1);color:white;text-decoration:none;border-radius:10px;font-weight:600;display:inline-flex;align-items:center;gap:0.5rem;border:2px solid rgba(102,126,234,0.5);transition:transform 0.3s"><i class="fab fa-linkedin"></i> LinkedIn</a>
        </div>
        <button id="closeModal" style="margin-top:2rem;padding:0.8rem 2rem;background:transparent;color:#b4b9d4;border:1px solid rgba(255,255,255,0.2);border-radius:10px;cursor:pointer;font-size:1rem;transition:all 0.3s">Close</button>
    `;

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    const style = document.createElement('style');
    style.textContent = '@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes scaleIn{from{transform:scale(0.8);opacity:0}to{transform:scale(1);opacity:1}}@keyframes fadeOut{from{opacity:1}to{opacity:0}}';
    document.head.appendChild(style);

    const close = () => {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => document.body.removeChild(modal), 300);
    };

    modal.querySelector('#closeModal').addEventListener('click', close);
    modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
}

console.log('🎆 Portfolio with professional fireworks and backend API loaded!');

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');

        // Animate hamburger
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

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
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

    // Navbar background on scroll
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
    const texts = [
        'Software Engineer 💻',
        'Java Developer ☕',
        'Tech Enthusiast 🚀',
        'Problem Solver 🧩'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

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

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Add loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate sending (replace with actual API call)
        setTimeout(() => {
            alert('Thank you for your message! I will get back to you soon. 🚀');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Scroll reveal animation with Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe elements
const elementsToAnimate = document.querySelectorAll(
    '.project-card, .skill-category, .timeline-item, .stat-item, .contact-item, .about-text'
);

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

// Add cursor trail effect (optional)
const createCursorTrail = () => {
    document.addEventListener('mousemove', (e) => {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
        document.body.appendChild(trail);

        setTimeout(() => {
            trail.remove();
        }, 500);
    });
};

// Uncomment to enable cursor trail
// createCursorTrail();

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

// Animate stats when they come into view
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

// Add smooth page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
});

console.log('🚀 Portfolio loaded successfully!');
// ===================================
// DOWNLOAD CV - FIRECRACKER ANIMATION
// ===================================

// Get the Download CV button
const downloadCVBtn = document.getElementById('downloadCVBtn');

if (downloadCVBtn) {
    downloadCVBtn.addEventListener('click', function(e) {
        e.preventDefault();

        // Create firecracker animation
        createFirecrackerAnimation();

        // Show contact message after a short delay
        setTimeout(() => {
            showContactMessage();
        }, 1500);
    });
}

// Firecracker Animation Function
function createFirecrackerAnimation() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe', '#FFD700', '#FF6B6B'];
    const particleCount = 100;

    // Create container for firecrackers
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '9999';
    document.body.appendChild(container);

    // Create multiple firecracker bursts
    for (let burst = 0; burst < 5; burst++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight * 0.6;
            createBurst(container, x, y, particleCount / 5, colors);
        }, burst * 300);
    }

    // Remove container after animation
    setTimeout(() => {
        document.body.removeChild(container);
    }, 4000);
}

// Create individual burst
function createBurst(container, x, y, count, colors) {
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        const color = colors[Math.floor(Math.random() * colors.length)];
        const angle = (Math.PI * 2 * i) / count;
        const velocity = 2 + Math.random() * 4;

        particle.style.position = 'absolute';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = color;
        particle.style.boxShadow = `0 0 10px ${color}`;

        container.appendChild(particle);

        // Animate particle
        let vx = Math.cos(angle) * velocity;
        let vy = Math.sin(angle) * velocity;
        let px = x;
        let py = y;
        let opacity = 1;
        let frame = 0;

        const animate = () => {
            frame++;
            vy += 0.1; // Gravity
            px += vx;
            py += vy;
            opacity -= 0.015;

            particle.style.left = px + 'px';
            particle.style.top = py + 'px';
            particle.style.opacity = opacity;

            if (opacity > 0 && frame < 150) {
                requestAnimationFrame(animate);
            } else {
                container.removeChild(particle);
            }
        };

        requestAnimationFrame(animate);
    }
}

// Show Contact Message with Beautiful Modal
function showContactMessage() {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(10, 14, 39, 0.95);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;

    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
        backdrop-filter: blur(20px);
        border: 2px solid rgba(102, 126, 234, 0.3);
        border-radius: 20px;
        padding: 3rem;
        max-width: 500px;
        text-align: center;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        animation: scaleIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    `;

    modalContent.innerHTML = `
        <div style="font-size: 4rem; margin-bottom: 1rem;">📄</div>
        <h2 style="font-size: 2rem; margin-bottom: 1rem; background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
            CV Request
        </h2>
        <p style="font-size: 1.2rem; color: #b4b9d4; margin-bottom: 2rem; line-height: 1.6;">
            Please contact <strong style="color: #667eea;">Shubham</strong> directly to request the CV.
        </p>
        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
            <a href="mailto:spcse900@gmail.com" style="padding: 1rem 2rem; background: linear-gradient(135deg, #667eea, #764ba2); color: white; text-decoration: none; border-radius: 10px; font-weight: 600; display: inline-flex; align-items: center; gap: 0.5rem; transition: transform 0.3s;">
                <i class="fas fa-envelope"></i> Email Me
            </a>
            <a href="https://linkedin.com/in/ShubhamPrajapati" target="_blank" style="padding: 1rem 2rem; background: rgba(255, 255, 255, 0.1); color: white; text-decoration: none; border-radius: 10px; font-weight: 600; display: inline-flex; align-items: center; gap: 0.5rem; border: 2px solid rgba(102, 126, 234, 0.5); transition: transform 0.3s;">
                <i class="fab fa-linkedin"></i> LinkedIn
            </a>
        </div>
        <button id="closeModal" style="margin-top: 2rem; padding: 0.8rem 2rem; background: transparent; color: #b4b9d4; border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 10px; cursor: pointer; font-size: 1rem; transition: all 0.3s;">
            Close
        </button>
    `;

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Add animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes scaleIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    // Close modal
    const closeBtn = modal.querySelector('#closeModal');
    closeBtn.addEventListener('click', () => {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    });

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        }
    });

    // Add fadeOut animation
    style.textContent += `
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
}

console.log('🎆 Firecracker animation loaded!');

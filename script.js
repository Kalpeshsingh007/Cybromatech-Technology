// Initialize AOS animation library
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
} else {
    console.warn('AOS is not defined. Make sure it is properly imported.');
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Back to top button
window.addEventListener('scroll', function() {
    const backToTop = document.querySelector('.back-to-top');
    if (window.scrollY > 300) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Set active nav link based on scroll position
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formElements = this.elements;
        const formData = {};
        
        for (let i = 0; i < formElements.length; i++) {
            const element = formElements[i];
            if (element.name && element.value) {
                formData[element.name] = element.value;
            }
        }
        
        // Show success message (in a real implementation, you would send this data to a server)
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Mobile menu toggle
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

if (navbarToggler) {
    navbarToggler.addEventListener('click', function() {
        navbarCollapse.classList.toggle('show');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    if (navbarCollapse && navbarCollapse.classList.contains('show') && !e.target.closest('.navbar')) {
        navbarCollapse.classList.remove('show');
    }
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
        }
    });
});

// Testimonial carousel autoplay
const testimonialCarousel = document.getElementById('testimonialCarousel');
if (testimonialCarousel) {
    if (typeof bootstrap !== 'undefined' && bootstrap.Carousel) {
        const carousel = new bootstrap.Carousel(testimonialCarousel, {
            interval: 5000,
            wrap: true
        });
    } else {
        console.warn('Bootstrap Carousel is not defined. Make sure Bootstrap is properly imported.');
    }
}

// Counter animation for stats
function animateCounter(el) {
    const target = parseInt(el.innerText);
    const duration = 2000;
    const step = target / duration * 10;
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            clearInterval(timer);
            el.innerText = target;
        } else {
            el.innerText = Math.floor(current);
        }
    }, 10);
}

// Animate counters when they come into view
const statElements = document.querySelectorAll('.stat h3, .stat-card h3');
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

statElements.forEach(el => {
    observer.observe(el);
});
// Mobile Navigation Toggle - will be initialized after components load
function initMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add active class to current navigation item
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.research-card, .stat-item, .content-card, .timeline-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Form submission handler
if (document.querySelector('.contact-form')) {
    document.querySelector('.contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Simulate form submission
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}

// Typing animation for hero text with HTML support
function typeWriterHTML(element, htmlContent, speed = 100) {
    // Parse the HTML to separate text from tags
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    
    // Extract text content for typing
    const textContent = tempDiv.textContent || tempDiv.innerText;
    
    // Clear the element
    element.innerHTML = '';
    
    let i = 0;
    let currentHTML = '';
    let isInsideTag = false;
    let tagBuffer = '';
    let textIndex = 0;
    
    function type() {
        if (i < htmlContent.length) {
            const char = htmlContent.charAt(i);
            
            // Check if we're entering a tag
            if (char === '<') {
                isInsideTag = true;
                tagBuffer = char;
            }
            // Check if we're exiting a tag
            else if (char === '>' && isInsideTag) {
                isInsideTag = false;
                tagBuffer += char;
                currentHTML += tagBuffer;
                tagBuffer = '';
                
                // Update the element with current HTML
                element.innerHTML = currentHTML;
            }
            // If we're inside a tag, just collect it
            else if (isInsideTag) {
                tagBuffer += char;
            }
            // If we're outside tags, this is text to be typed
            else {
                currentHTML += char;
                element.innerHTML = currentHTML;
                textIndex++;
            }
            
            i++;
            
            // Only delay for actual text characters, not HTML tags
            const delay = isInsideTag || (htmlContent.charAt(i-1) === '>') ? 0 : speed;
            setTimeout(type, delay);
        }
    }
    
    setTimeout(type, 500);
}

// Initialize typing animation on homepage
function initTypeAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    
    if (heroTitle && (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/website'))) {
        // Prevent double animation
        if (heroTitle.dataset.animated) {
            return;
        }
        heroTitle.dataset.animated = 'true';
        
        const originalHTML = heroTitle.innerHTML;
        typeWriterHTML(heroTitle, originalHTML, 80);
    }
}

// Run typing animation after components are loaded
document.addEventListener('componentsLoaded', function() {
    initMobileNavigation(); // Initialize navigation after components load
    initTypeAnimation();
});

// Improved fallback: run after DOM loaded with multiple attempts
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile navigation immediately on all pages
    initMobileNavigation();
    
    // Try immediately for homepage animations
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle && !heroTitle.dataset.animated) {
            initMobileNavigation();
            initTypeAnimation();
        }
    }, 100);
    
    // Wait for components to load, then run animations as fallback
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle && !heroTitle.dataset.animated) {
            initMobileNavigation();
            initTypeAnimation();
        }
    }, 500);
    
    // Final fallback after longer delay
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle && !heroTitle.dataset.animated) {
            initMobileNavigation();
            initTypeAnimation();
        }
    }, 1000);
    
    // Final final fallback
    setTimeout(() => {
        if (document.querySelector('.hero-title') && !document.querySelector('.hero-title').dataset.animated) {
            initMobileNavigation();
            initTypeAnimation();
        }
    }, 2000);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation
document.addEventListener('DOMContentLoaded', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}); 
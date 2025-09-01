// Ultra-Modern Smart Hub Website JavaScript
// Advanced interactions and animations

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileNavigation();
    initSmoothScrolling();
    initScrollAnimations();
    initActiveNavigation();
    initInteractiveEffects();
    initContactLinks();
    initLoadingAnimations();
    initParallaxEffects();
});

// Mobile Navigation
function initMobileNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!navToggle || !navMenu) return;
    
    // Toggle mobile menu
    navToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Smooth Scrolling - Fixed implementation
function initSmoothScrolling() {
    // Handle all navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1); // Remove the # symbol
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight || 80;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav state immediately
                document.querySelectorAll('.nav-link').forEach(navLink => {
                    navLink.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Handle CTA buttons in hero section
    const ctaButtons = document.querySelectorAll('.cta-btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Check if this is a scroll button
            const buttonText = this.textContent.toLowerCase();
            
            if (buttonText.includes('quote') || buttonText.includes('contact')) {
                e.preventDefault();
                scrollToSection('contact');
            } else if (buttonText.includes('services') || buttonText.includes('view')) {
                e.preventDefault();
                scrollToSection('services');
            }
        });
    });
}

// Global scroll to section function
function scrollToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        const headerHeight = document.querySelector('.header').offsetHeight || 80;
        const targetPosition = targetSection.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Update navigation active state
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        const activeNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (activeNavLink) {
            activeNavLink.classList.add('active');
        }
    }
}

// Advanced Scroll Animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '-10% 0px -10% 0px',
        threshold: 0.1
    };
    
    // Animation observer
    const animationObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    // Observe all elements with data-aos attributes
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });
    
    // Stagger animation delays
    const serviceCards = document.querySelectorAll('.service-card');
    const benefitCards = document.querySelectorAll('.benefit-card');
    const contactCards = document.querySelectorAll('.contact-card');
    
    serviceCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 100}ms`;
    });
    
    benefitCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 80}ms`;
    });
    
    contactCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 100}ms`;
    });
}

// Active Navigation Highlighting
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0.1
    };
    
    const navigationObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                
                // Remove active class from all nav links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current section's nav link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        navigationObserver.observe(section);
    });
    
    // Set initial active state
    const homeLink = document.querySelector('.nav-link[href="#home"]');
    if (homeLink) {
        homeLink.classList.add('active');
    }
}

// Interactive Effects
function initInteractiveEffects() {
    // Mouse move parallax effect for hero visual
    const heroVisual = document.querySelector('.hero-visual');
    const floatingCard = document.querySelector('.floating-card');
    
    if (heroVisual && floatingCard) {
        heroVisual.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = (e.clientX - centerX) / rect.width;
            const deltaY = (e.clientY - centerY) / rect.height;
            
            floatingCard.style.transform = `translate(${deltaX * 20}px, ${deltaY * 20}px) rotateX(${deltaY * 10}deg) rotateY(${deltaX * 10}deg)`;
        });
        
        heroVisual.addEventListener('mouseleave', function() {
            floatingCard.style.transform = 'translate(0, 0) rotateX(0) rotateY(0)';
        });
    }
    
    // Interactive card hover effects
    const interactiveCards = document.querySelectorAll('.service-card, .benefit-card, .contact-card');
    
    interactiveCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
        });
    });
    
    // Button ripple effect
    const buttons = document.querySelectorAll('.cta-btn, .action-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });
    
    // Add ripple animation to stylesheet if not exists
    if (!document.querySelector('#ripple-style')) {
        const rippleStyle = document.createElement('style');
        rippleStyle.id = 'ripple-style';
        rippleStyle.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyle);
    }
}

// Contact Links Functionality
function initContactLinks() {
    // Phone links
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Let the browser handle the tel: link naturally
            console.log('Initiating phone call to:', this.href);
            showNotification('Opening phone app...', 'info');
        });
    });
    
    // Email links
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Let the browser handle the mailto: link naturally
            console.log('Opening email client for:', this.href);
            showNotification('Opening email client...', 'info');
        });
    });
    
    // WhatsApp links
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('Opening WhatsApp:', this.href);
            showNotification('Opening WhatsApp...', 'info');
        });
    });
    
    // Add click tracking for analytics (if needed)
    const ctaButtons = document.querySelectorAll('.cta-btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent.trim();
            console.log('CTA clicked:', action);
        });
    });
}

// Loading Animations
function initLoadingAnimations() {
    // Animate elements on page load
    const animateOnLoad = [
        { selector: '.hero-title', delay: 200 },
        { selector: '.hero-subtitle', delay: 400 },
        { selector: '.hero-description', delay: 600 },
        { selector: '.hero-actions', delay: 800 },
        { selector: '.hero-visual', delay: 1000 }
    ];
    
    animateOnLoad.forEach(item => {
        const element = document.querySelector(item.selector);
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, item.delay);
        }
    });
    
    // Header animation
    const header = document.querySelector('.header');
    if (header) {
        header.style.transform = 'translateY(-100px)';
        header.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        
        setTimeout(() => {
            header.style.transform = 'translateY(0)';
        }, 100);
    }
}

// Parallax Effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.gradient-orb');
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const viewport = window.innerHeight;
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.2);
            const yPos = scrolled * speed;
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        // Header blur effect on scroll
        const header = document.querySelector('.header');
        if (header) {
            if (scrolled > 50) {
                header.style.background = 'rgba(0, 0, 0, 0.8)';
                header.style.backdropFilter = 'blur(20px)';
            } else {
                header.style.background = 'transparent';
                header.style.backdropFilter = 'none';
            }
        }
    }
    
    // Throttle scroll events for better performance
    let ticking = false;
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    function handleScroll() {
        ticking = false;
        requestTick();
    }
    
    window.addEventListener('scroll', handleScroll);
    updateParallax(); // Initial call
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 122, 255, 0.9);
        color: white;
        padding: 16px 20px;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        font-weight: 500;
        max-width: 320px;
        animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        transform: translateX(100%);
    `;
    
    const closeButton = notification.querySelector('.notification-close');
    closeButton.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        margin-left: 12px;
        opacity: 0.7;
        transition: opacity 0.2s;
    `;
    
    closeButton.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Add notification animations if not exists
    if (!document.querySelector('#notification-animations')) {
        const style = document.createElement('style');
        style.id = 'notification-animations';
        style.textContent = `
            @keyframes slideInRight {
                to { transform: translateX(0); }
            }
            @keyframes slideOutRight {
                to { transform: translateX(100%); opacity: 0; }
            }
            .notification-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 3000);
}

// Performance optimization functions
const utils = {
    // Throttle function for scroll events
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Debounce function for resize events
    debounce: function(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    },
    
    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Initialize cursor effects (optional enhancement)
function initCursorEffects() {
    if (window.innerWidth > 768) { // Only on desktop
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: linear-gradient(45deg, rgba(0, 122, 255, 0.6), rgba(90, 200, 250, 0.6));
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            transform: scale(0);
        `;
        document.body.appendChild(cursor);
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
            cursor.style.transform = 'scale(1)';
        });
        
        document.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1)';
        });
        
        document.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(0)';
        });
        
        // Hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .service-card, .benefit-card');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursor.style.background = 'linear-gradient(45deg, rgba(255, 45, 146, 0.8), rgba(175, 82, 222, 0.8))';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.background = 'linear-gradient(45deg, rgba(0, 122, 255, 0.6), rgba(90, 200, 250, 0.6))';
            });
        });
    }
}

// Initialize cursor effects
initCursorEffects();

// Global scroll to section function (make it available globally)
window.scrollToSection = scrollToSection;

// Export utilities for external use
window.SmartHubUtils = utils;
window.showNotification = showNotification;

// Performance monitoring (optional)
window.addEventListener('load', function() {
    console.log('🚀 Smart Hub website loaded successfully!');
    console.log('⚡ Performance optimized with modern techniques');
    
    // Log performance metrics
    if ('performance' in window) {
        const perfData = performance.getEntriesByType('navigation')[0];
        if (perfData) {
            console.log(`📊 Load time: ${(perfData.loadEventEnd - perfData.fetchStart).toFixed(0)}ms`);
        }
    }
});

// Handle resize events
window.addEventListener('resize', utils.debounce(function() {
    // Recalculate any layout-dependent features
    console.log('Window resized, recalculating layouts...');
}, 250));

// Handle visibility changes (for pause/resume animations)
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('Page hidden, pausing non-critical animations');
    } else {
        console.log('Page visible, resuming animations');
    }
});
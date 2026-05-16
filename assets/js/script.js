// script.js
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ========== NAVBAR SCROLL EFFECT ==========
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    function updateNavbar() {
        if (window.scrollY > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    }
    
    window.addEventListener('scroll', updateNavbar);
    updateNavbar(); // Ejecutar al cargar

    // ========== MOBILE MENU TOGGLE ==========
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('show');
            const icon = menuBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }

    // ========== SMOOTH SCROLL ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Cerrar menú móvil si está abierto
                if (mobileMenu && mobileMenu.classList.contains('show')) {
                    mobileMenu.classList.remove('show');
                    const icon = menuBtn?.querySelector('i');
                    if (icon) {
                        icon.classList.add('fa-bars');
                        icon.classList.remove('fa-times');
                    }
                }
                
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Actualizar active state
                updateActiveLink(targetId);
            }
        });
    });

    // ========== ACTIVE LINK ON SCROLL ==========
    function updateActiveLink(currentId) {
        // Remover active de todos
        navLinks.forEach(link => link.classList.remove('active'));
        mobileNavLinks.forEach(link => link.classList.remove('active'));
        
        // Agregar active al actual
        document.querySelectorAll(`a[href="${currentId}"]`).forEach(link => {
            link.classList.add('active');
        });
    }

    // Detectar sección activa durante el scroll
    function setActiveSection() {
        const sections = document.querySelectorAll('section');
        const navbarHeight = navbar.offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 10;
            const sectionBottom = sectionTop + section.offsetHeight;
            const scroll = window.scrollY;
            
            if (scroll >= sectionTop && scroll < sectionBottom) {
                const id = '#' + section.getAttribute('id');
                updateActiveLink(id);
            }
        });
    }
    
    window.addEventListener('scroll', setActiveSection);
    setActiveSection(); // Ejecutar al cargar

    // ========== COUNTER ANIMATION ==========
    const counters = document.querySelectorAll('.counter');
    let animationStarted = false;
    
    function startCounters() {
        if (animationStarted) return;
        
        counters.forEach(counter => {
            const updateCounter = () => {
                const target = parseInt(counter.getAttribute('data-target'));
                const current = parseInt(counter.innerText);
                const increment = Math.ceil(target / 50);
                
                if (current < target) {
                    counter.innerText = Math.min(current + increment, target);
                    setTimeout(updateCounter, 20);
                } else {
                    counter.innerText = target;
                }
            };
            
            updateCounter();
        });
        
        animationStarted = true;
    }

    // Intersection Observer para los contadores
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounters();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar la sección de estadísticas
    const statsSection = document.querySelector('#qui-sommes-nous .stat-item');
    if (statsSection) {
        observer.observe(statsSection.parentElement);
    }

    // ========== FORM HANDLING ==========
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener valores
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validación básica
            if (!name || !email || !message) {
                showNotification('Por favor completa todos los campos requeridos', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Por favor ingresa un email válido', 'error');
                return;
            }
            
            // Simular envío (aquí iría la lógica real de envío)
            showNotification('¡Mensaje enviado con éxito! Te contactaremos pronto.', 'success');
            contactForm.reset();
        });
    }
    
    // Validar email
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Mostrar notificación
    function showNotification(message, type) {
        // Eliminar notificaciones existentes
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Crear notificación
        const notification = document.createElement('div');
        notification.className = `notification fixed top-24 right-4 p-4 rounded-lg shadow-lg z-50 animate-fade-in ${
            type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Eliminar después de 3 segundos
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // ========== IMAGE LOADING ==========
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
        }
    });

    // ========== WHATSAPP BUTTON CLICK TRACKING ==========
    const whatsappBtns = document.querySelectorAll('a[href*="wa.me"]');
    
    whatsappBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            console.log('WhatsApp button clicked'); // Puedes reemplazar con analytics
        });
    });

    // ========== SCROLL REVEAL ANIMATION ==========
    const revealElements = document.querySelectorAll('.service-card, .stat-item, .counter');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px'
    });
    
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });
});
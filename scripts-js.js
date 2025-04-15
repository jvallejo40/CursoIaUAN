// Función de utilidad para verificar si un elemento está en el viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// Función para manejar animaciones de desplazamiento
function handleScrollAnimation() {
    const animatedElements = document.querySelectorAll('.objective-card, .accordion, .tool-item, .step-item');
    
    animatedElements.forEach(element => {
        if (isElementInViewport(element) && !element.classList.contains('animated')) {
            element.classList.add('animated');
            element.style.opacity = '1';
            element.style.transform = element.classList.contains('objective-card') ? 'translateY(0)' : 
                                   element.classList.contains('tool-item') ? 'rotate(0deg)' : 'translateX(0)';
        }
    });
}

// Función inicial cuando se carga el DOM
document.addEventListener('DOMContentLoaded', function() {
    // Referencias cacheadas para mejorar rendimiento
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    const animatedElements = document.querySelectorAll('.objective-card, .accordion, .tool-item, .step-item');
    
    // Configuración inicial de elementos animados
    animatedElements.forEach(element => {
        if (element.classList.contains('objective-card')) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
        } else if (element.classList.contains('tool-item')) {
            element.style.opacity = '0';
            element.style.transform = 'rotate(-8deg)';
        } else {
            element.style.opacity = '0';
            element.style.transform = 'translateX(30px)';
        }
    });
    
    // Manejo de acordeones
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector('.accordion-icon');
            
            // Cerrar otros acordeones
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== header) {
                    const otherContent = otherHeader.nextElementSibling;
                    const otherIcon = otherHeader.querySelector('.accordion-icon');
                    otherContent.style.maxHeight = null;
                    otherIcon.style.transform = 'rotate(0deg)';
                }
            });
            
            // Alternar el elemento clickeado
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                icon.style.transform = 'rotate(0deg)';
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });
    
    // Alternar menú móvil
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
    
    // Desplazamiento suave para enlaces ancla
    anchorLinks.forEach(anchor => {
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
                
                // Cerrar menú móvil si está abierto
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            }
        });
    });
    
    // Iniciar animaciones con un pequeño retraso para permitir que la página se cargue
    setTimeout(handleScrollAnimation, 300);
    
    // Escuchar eventos de desplazamiento para activar animaciones
    window.addEventListener('scroll', handleScrollAnimation);
});

/**
 * Fletes y Transportes Limache y Olmué
 * main.js – Vanilla JavaScript
 */
document.addEventListener('DOMContentLoaded', () => {

    /* ==============================================================
       1. NAVBAR – Fondo sólido al hacer scroll
    ============================================================== */
    const navbar = document.getElementById('navbar');
    const scrollThreshold = 50;

    const handleNavScroll = () => {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('nav-solid');
        } else {
            navbar.classList.remove('nav-solid');
        }
    };

    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll(); // estado inicial

    /* ==============================================================
       2. MENÚ MÓVIL – Toggle hamburguesa
    ============================================================== */
    const mobileBtn = document.getElementById('mobile-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            const isOpen = !mobileMenu.classList.contains('hidden');
            mobileMenu.classList.toggle('hidden');

            // Cambiar icono
            if (isOpen) {
                menuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>';
            } else {
                menuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>';
            }
        });

        // Cerrar menú al hacer clic en un enlace
        document.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>';
            });
        });
    }

    /* ==============================================================
       3. SMOOTH SCROLL – Para enlaces internos
    ============================================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const topPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: topPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ==============================================================
       4. INTERSECTION OBSERVER – Animaciones fade-up al scroll
    ============================================================== */
    const fadeElements = document.querySelectorAll('.fade-up');

    if ('IntersectionObserver' in window && fadeElements.length > 0) {
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -60px 0px'
        });

        fadeElements.forEach(el => fadeObserver.observe(el));
    } else {
        // Fallback: mostrar todo si no soporta IntersectionObserver
        fadeElements.forEach(el => el.classList.add('visible'));
    }

    /* ==============================================================
       5. BOTÓN FLOTANTE WHATSAPP – Aparece con delay después del scroll
    ============================================================== */
    const waFloat = document.getElementById('wa-float');

    if (waFloat) {
        let waShown = false;

        const showWaButton = () => {
            if (!waShown && window.scrollY > 300) {
                waShown = true;
                waFloat.style.opacity = '1';
                waFloat.style.pointerEvents = 'auto';
                waFloat.style.transform = 'scale(1)';
            }
        };

        // Mostrar después de 2s o al hacer scroll
        setTimeout(() => {
            if (window.scrollY > 100) {
                waShown = true;
                waFloat.style.opacity = '1';
                waFloat.style.pointerEvents = 'auto';
            }
        }, 2000);

        window.addEventListener('scroll', showWaButton, { passive: true });
    }

    /* ==============================================================
       6. PRECARGAR IMÁGENES HERO – Para Meta Ads (carga rápida)
    ============================================================== */
    const heroImg = document.querySelector('#inicio img');
    if (heroImg && !heroImg.complete) {
        heroImg.addEventListener('load', () => {
            heroImg.style.opacity = '1';
        });
    }

    /* ==============================================================
       7. NÚMERO WHATSAPP DINÁMICO (parámetro UTM)
       Permite cambiar el número desde la URL: ?wa=56987654321
    ============================================================== */
    const urlParams = new URLSearchParams(window.location.search);
    const customWA = urlParams.get('wa');

    if (customWA && /^[0-9]{10,15}$/.test(customWA)) {
        document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
            const currentHref = link.getAttribute('href');
            link.setAttribute('href', currentHref.replace(/wa\.me\/\d+/, `wa.me/${customWA}`));
        });
    }

});

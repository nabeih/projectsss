/* ============================================
   AOS Animation Init
============================================ */
AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 80,
});

/* ============================================
   Navbar Scroll Effect
============================================ */
const navbar = document.getElementById('mainNavbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

/* ============================================
   Active Nav Link on Scroll
============================================ */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
        if (scrollPos >= section.offsetTop) {
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

/* ============================================
   Smooth Scroll for Anchor Links
============================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });

            // إغلاق القائمة في الجوال
            const navCollapse = document.getElementById('navMenu');
            if (navCollapse.classList.contains('show')) {
                new bootstrap.Collapse(navCollapse).hide();
            }
        }
    });
});

/* ============================================
   Back to Top Button
============================================ */
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ============================================
   Animated Counter for Stats
============================================ */
function animateCounter(el, target, duration = 2000) {
    const start = 0;
    const startTime = performance.now();
    const isDecimal = target.toString().includes('.');

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = start + (target - start) * easeOut;

        if (isDecimal) {
            el.textContent = current.toFixed(1) + '%';
        } else if (target >= 1000000) {
            el.textContent = '+' + Math.floor(current / 1000000) + 'M';
        } else if (target >= 1000) {
            el.textContent = '+' + Math.floor(current / 1000) + 'K';
        } else {
            el.textContent = Math.floor(current);
        }

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            if (target === 500) el.textContent = '+500';
            else if (target === 1000000) el.textContent = '+1M';
            else if (target === 99.9) el.textContent = '99.9%';
        }
    }

    requestAnimationFrame(update);
}

/* تشغيل العدادات عند ظهورها */
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.hero-stat h3');
            statNumbers.forEach((el, index) => {
                const text = el.textContent;
                let target = 0;

                if (text.includes('500')) target = 500;
                else if (text.includes('1M')) target = 1000000;
                else if (text.includes('99.9')) target = 99.9;

                if (target) {
                    setTimeout(() => animateCounter(el, target), index * 200);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

/* ============================================
   Parallax Effect for Hero Shapes
============================================ */
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.hero-shape');

    shapes.forEach((shape, i) => {
        const speed = (i + 1) * 0.15;
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

/* ============================================
   Typing Effect for Hero Title (اختياري)
============================================ */
// يمكن تفعيلها إذا أردت تأثير كتابة على العنوان

/* ============================================
   Console Message
============================================ */
console.log('%c👋 متجر الأناقة', 'color: #fbbf24; font-size: 24px; font-weight: bold;');
console.log('%cنظام إدارة متكامل لمتاجر الملابس', 'color: #4f46e5; font-size: 14px;');
// Aguardar o Lucide carregar e inicializar
function initLucide() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    } else {
        setTimeout(initLucide, 100);
    }
}

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLucide);
} else {
    initLucide();
}

// Dark Mode
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Verificar preferência salva
if (localStorage.getItem('theme') === 'dark') {
    html.classList.add('dark-mode');
}

themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark-mode');
    localStorage.setItem('theme', html.classList.contains('dark-mode') ? 'dark' : 'light');
    initLucide(); // Reinicializar ícones após mudança de tema
});

// Smooth scroll navigation
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

// Sidebar Navigation Active State
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('section');
const timelineDots = document.querySelectorAll('.timeline-dot');

function updateActiveState() {
    let currentSection = sections[0].getAttribute('id');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const scrollPos = window.pageYOffset + window.innerHeight / 2;

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    // Update active nav item and timeline dots
    navItems.forEach(item => {
        item.classList.toggle('active', item.getAttribute('data-section') === currentSection);
    });

    timelineDots.forEach(dot => {
        dot.classList.toggle('active', dot.getAttribute('data-section') === currentSection);
    });
}

window.addEventListener('scroll', updateActiveState);
updateActiveState(); // Chamar na inicialização

// Intersection Observer para animações de entrada
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Aplicar animação aos cards
document.querySelectorAll('.skill-card, .case-study, .step, .experience-item, .certificate-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Efeito no botão do hero
const primaryButtons = document.querySelectorAll('.btn-primary');
primaryButtons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Atualizar ícones quando trocar tema
const observer2 = new MutationObserver(() => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

observer2.observe(html, { attributes: true, attributeFilter: ['class'] });


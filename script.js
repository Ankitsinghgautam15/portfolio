/* ═══════════════════════════════════════════════════════════
   PORTFOLIO — JAVASCRIPT
═══════════════════════════════════════════════════════════ */

// ── NAV SCROLL ──────────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ── MOBILE NAV ──────────────────────────────────────────────
const toggle = document.getElementById('navToggle');
const mobile = document.getElementById('navMobile');

toggle.addEventListener('click', () => {
  mobile.classList.toggle('open');
});

function closeMobile() {
  mobile.classList.remove('open');
}

// ── SCROLL ANIMATIONS (IntersectionObserver) ─────────────────
const aosElements = document.querySelectorAll('[data-aos]');
const aosObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('aos-visible');
        }, i * 80);
        aosObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
);
aosElements.forEach(el => aosObserver.observe(el));

// ── SKILL BARS: animate when visible ────────────────────────
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);
skillFills.forEach(el => {
  el.style.animationPlayState = 'paused';
  skillObserver.observe(el);
});

// ── ACTIVE NAV LINK HIGHLIGHT ────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function setActiveNav() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === '#' + current
      ? 'var(--text)'
      : '';
  });
}
window.addEventListener('scroll', setActiveNav, { passive: true });

// ── SMOOTH COUNT-UP ANIMATION FOR STATS ─────────────────────
function countUp(el, target, suffix = '') {
  const isFloat = target.toString().includes('.');
  let start = 0;
  const duration = 1800;
  const step = 16;
  const increment = target / (duration / step);

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = isFloat
      ? start.toFixed(1) + suffix
      : Math.floor(start) + suffix;
  }, step);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat-num');
      nums.forEach(num => {
        const raw = num.textContent.trim();
        const numVal = parseFloat(raw.replace(/[^0-9.]/g, ''));
        const suffix = raw.replace(/[0-9.]/g, '');
        countUp(num, numVal, suffix);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.hero-stats');
if (statsSection) statsObserver.observe(statsSection);

// ── CURSOR GLOW (desktop only) ────────────────────────────────
if (window.matchMedia('(pointer: fine)').matches) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed; pointer-events: none; z-index: 9999;
    width: 300px; height: 300px; border-radius: 50%;
    background: radial-gradient(circle, rgba(108,99,255,0.06) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: left 0.15s ease, top 0.15s ease;
  `;
  document.body.appendChild(glow);
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
}

// ── TYPING EFFECT FOR HERO (subtle) ──────────────────────────
// (Already handled via CSS animations)

// ── TILT EFFECT ON CARDS ─────────────────────────────────────
document.querySelectorAll('.exp-item, .blog-card, .skill-group').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

console.log('%c👋 Hey Developer!', 'color: #6C63FF; font-size: 20px; font-weight: bold;');
console.log('%cPortfolio built for Ankit Singh Gautam | Senior Android Engineer', 'color: #00D9C4; font-size: 14px;');
console.log('%cClean Architecture enthusiast | Kotlin | Jetpack Compose | 5+ years', 'color: #A0A0C0; font-size: 12px;');


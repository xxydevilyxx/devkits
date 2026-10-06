const revealItems = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.1 });

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 45, 240)}ms`;
  observer.observe(item);
});

const filters = document.querySelectorAll('.filter');
const rows = document.querySelectorAll('.template-row');

filters.forEach((filter) => {
  filter.addEventListener('click', () => {
    filters.forEach((item) => item.classList.remove('active'));
    filter.classList.add('active');

    const category = filter.dataset.filter;
    rows.forEach((row) => {
      const match = category === 'all' || row.dataset.category === category;
      row.classList.toggle('hidden', !match);
    });
  });
});

const topbar = document.querySelector('.topbar');
const menuToggle = document.querySelector('.menu-toggle');
menuToggle?.addEventListener('click', () => {
  const open = topbar.classList.toggle('nav-open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    topbar.classList.remove('nav-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const orb = document.querySelector('.cursor-orb');
window.addEventListener('pointermove', (event) => {
  if (!orb) return;
  orb.style.left = `${event.clientX}px`;
  orb.style.top = `${event.clientY}px`;
});

const heroVisual = document.querySelector('.hero-visual');
const frontCard = document.querySelector('.card-front');
if (heroVisual && frontCard && window.matchMedia('(pointer:fine)').matches) {
  heroVisual.addEventListener('pointermove', (event) => {
    const rect = heroVisual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    frontCard.style.transform = `rotate(-7deg) perspective(900px) rotateY(${x * 7}deg) rotateX(${y * -7}deg)`;
  });
  heroVisual.addEventListener('pointerleave', () => {
    frontCard.style.transform = 'rotate(-7deg)';
  });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

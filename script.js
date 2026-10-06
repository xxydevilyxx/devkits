const revealItems = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 45, 240)}ms`;
  observer.observe(item);
});

// Template filter
const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.template-card');

filters.forEach((filter) => {
  filter.addEventListener('click', () => {
    filters.forEach((item) => item.classList.remove('active'));
    filter.classList.add('active');

    const category = filter.dataset.filter;
    cards.forEach((card) => {
      const match = category === 'all' || card.dataset.category === category;
      card.classList.toggle('hidden', !match);
    });
  });
});

// Mouse-follow glow on desktop
const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', (event) => {
  if (!glow) return;
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});

// Subtle parallax on the hero code card
const visual = document.querySelector('.hero-visual');
const codeCard = document.querySelector('.code-card');

if (visual && codeCard && window.matchMedia('(pointer:fine)').matches) {
  visual.addEventListener('pointermove', (event) => {
    const rect = visual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    codeCard.style.transform = `rotate(-2deg) perspective(900px) rotateY(${x * 5}deg) rotateX(${y * -5}deg)`;
  });

  visual.addEventListener('pointerleave', () => {
    codeCard.style.transform = 'rotate(-3deg)';
  });
}

// Mobile navigation
const menu = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menu?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('mobile-open');
  menu.textContent = open ? '×' : '☰';
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('mobile-open');
    if (menu) menu.textContent = '☰';
  });
});

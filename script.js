(() => {
  // Prevent Safari from restoring a horizontal scroll offset.
  if (history.scrollRestoration) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);

  const boot = () => {
  document.documentElement.classList.add('cinematic-ready');

  // Keep the opening state visible long enough to make the blur/zoom unmistakable.
  window.setTimeout(() => {
    document.body.classList.remove('is-booting');
    document.body.classList.add('is-ready');
  }, 1050);
};

if (document.readyState === 'loading') {
  window.addEventListener('load', boot, { once: true });
} else {
  boot();
}

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    entry.target.classList.add('revealed');
    revealObserver.unobserve(entry.target);
  });
}, {
  threshold: 0.08,
  rootMargin: '0px 0px -12% 0px'
});

revealElements.forEach((el, i) => {
  el.style.animationDelay = Math.min(i * 80, 320) + 'ms';
  revealObserver.observe(el);
});

const filters = document.querySelectorAll('.filter');
const specimens = document.querySelectorAll('.specimen');
const count = document.querySelector('#count');

function updateFilter(category) {
  let visible = 0;
  specimens.forEach((item) => {
    const show = category === 'all' || item.dataset.category === category;
    item.classList.toggle('hidden', !show);
    if (show) visible++;
  });
  if (count) count.textContent = String(visible).padStart(2,'0');
}
filters.forEach((button) => {
  button.addEventListener('click', () => {
    filters.forEach((b) => b.classList.remove('active'));
    button.classList.add('active');
    updateFilter(button.dataset.filter);
  });
});

const header = document.querySelector('.header');
const menu = document.querySelector('.menu');
menu?.addEventListener('click', () => {
  const open = header.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('nav a').forEach((link) => link.addEventListener('click', () => {
  header.classList.remove('open');
  menu?.setAttribute('aria-expanded','false');
}));

window.addEventListener('pointermove', (e) => {
  document.documentElement.style.setProperty('--mx', e.clientX + 'px');
  document.documentElement.style.setProperty('--my', e.clientY + 'px');
});

const object = document.querySelector('.object-card');
const stage = document.querySelector('.opening-object');
if (object && stage && matchMedia('(pointer:fine)').matches) {
  stage.addEventListener('pointermove', (e) => {
    const r = stage.getBoundingClientRect();
    const x = (e.clientX-r.left)/r.width-.5;
    const y = (e.clientY-r.top)/r.height-.5;
    object.style.transform = 'rotate(8deg) perspective(900px) rotateY(' + x*7 + 'deg) rotateX(' + y*-7 + 'deg)';
  });
  stage.addEventListener('pointerleave', () => object.style.transform = 'rotate(8deg)');
}

})();


(() => {
  const filters = document.querySelectorAll('.filter');
  const cards = document.querySelectorAll('.product-card');
  filters.forEach((button) => {
    button.addEventListener('click', () => {
      filters.forEach((b) => b.classList.remove('active'));
      button.classList.add('active');
      const category = button.dataset.filter;
      cards.forEach((card) => card.classList.toggle('hidden', category !== 'all' && card.dataset.category !== category));
    });
  });

  const menu = document.querySelector('.menu-button');
  const close = document.querySelector('.menu-close');
  const panel = document.querySelector('.mobile-menu');
  const toggle = (open) => {
    panel.classList.toggle('open', open);
    panel.setAttribute('aria-hidden', String(!open));
    menu?.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  };
  menu?.addEventListener('click', () => toggle(true));
  close?.addEventListener('click', () => toggle(false));
  panel?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => toggle(false)));

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });

  const art = document.querySelector('.hero-art');
  if (art && matchMedia('(pointer:fine)').matches) {
    art.addEventListener('pointermove', (event) => {
      const r = art.getBoundingClientRect();
      const x = (event.clientX-r.left)/r.width-.5;
      const y = (event.clientY-r.top)/r.height-.5;
      art.style.transform = 'translate(' + x*8 + 'px,' + y*8 + 'px)';
    });
    art.addEventListener('pointerleave', () => art.style.transform = '');
  }
})();
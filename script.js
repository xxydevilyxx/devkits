(() => {
  const reveal = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    });
  }, {threshold:0.08});
  reveal.forEach((el,i) => { el.style.transitionDelay = Math.min(i * 35, 220) + 'ms'; io.observe(el); });

  const filters = document.querySelectorAll('.filter');
  const items = document.querySelectorAll('.template');
  const counter = document.querySelector('#count');
  filters.forEach((button) => {
    button.addEventListener('click', () => {
      filters.forEach((b) => b.classList.remove('active'));
      button.classList.add('active');
      const category = button.dataset.filter;
      let shown = 0;
      items.forEach((item) => {
        const show = category === 'all' || item.dataset.category === category;
        item.classList.toggle('hidden', !show);
        if (show) shown++;
      });
      if (counter) counter.textContent = String(shown).padStart(2,'0');
    });
  });

  const header = document.querySelector('.header');
  const menu = document.querySelector('.menu');
  menu?.addEventListener('click', () => {
    const open = header.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
  });
  document.querySelectorAll('.nav a').forEach((link) => link.addEventListener('click', () => {
    header.classList.remove('open');
    menu?.setAttribute('aria-expanded','false');
  }));

  window.addEventListener('pointermove', (e) => {
    document.documentElement.style.setProperty('--mx', e.clientX + 'px');
    document.documentElement.style.setProperty('--my', e.clientY + 'px');
  }, {passive:true});

  const stage = document.querySelector('.hero-object');
  const card = document.querySelector('.object-paper');
  if (stage && card && matchMedia('(pointer:fine)').matches) {
    stage.addEventListener('pointermove', (e) => {
      const r = stage.getBoundingClientRect();
      const x = (e.clientX-r.left)/r.width-.5;
      const y = (e.clientY-r.top)/r.height-.5;
      card.style.transform = 'rotate(7deg) perspective(900px) rotateY(' + x*9 + 'deg) rotateX(' + y*-9 + 'deg)';
    });
    stage.addEventListener('pointerleave', () => card.style.transform = 'rotate(7deg)');
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth',block:'start'});
    });
  });
})();
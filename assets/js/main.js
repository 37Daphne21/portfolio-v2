// Skill bar animation
(function () {
  const bars = document.querySelectorAll('.skill-list i');

  if (!bars.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;

      const bar = entry.target;
      const width = bar.getAttribute('data-width') || '0';

      bar.style.setProperty('--bar-width', width + '%');
      observer.unobserve(bar);
    });
  }, { threshold: 0.25 });

  bars.forEach(function (bar) {
    observer.observe(bar);
  });
}());

// Mobile navigation
(function () {
  const button = document.querySelector('.header__button');
  const nav = document.querySelector('.header__nav');

  if (!button || !nav) return;

  button.addEventListener('click', function () {
    const isOpen = nav.classList.toggle('is-open');

    button.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    button.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
  });

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('is-open');
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-label', '메뉴 열기');
    });
  });
}());
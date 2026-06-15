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


// About - Skill bar animation
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


// Works
(function () {
  const worksIndex = document.querySelector('.works-index');
  const workList = document.querySelector('.works-index__list');
  const workPreview = document.querySelector('.works-preview');
  const workItems = document.querySelectorAll('.works-index__item');
  const workCount = document.querySelector('.works-preview__count');
  const workVisual = document.querySelector('.works-preview__visual');
  const workImage = document.querySelector('.works-preview__image');
  const workVisualText = document.querySelector('.works-preview__visual span');
  const workStatus = document.querySelector('.works-preview__summary-status');
  const workTitle = document.querySelector('.works-preview__summary-title');
  const workType = document.querySelector('.works-preview__summary-desc');
  const workDesc = document.querySelector('.works-preview__desc');
  const workTag = document.querySelector('.works-preview__tag');
  const workLink = document.querySelector('.works-preview__link');

  if (!worksIndex || !workList || !workPreview || !workItems.length || !workCount || !workVisual || !workImage || !workVisualText || !workStatus || !workTitle || !workType || !workDesc || !workTag || !workLink) return;

  const worksData = {
    hanlight: {
      count: '01 / 04',
      visualClass: 'works-preview__visual--hanlight',
      visualImage: './assets/images/works/work_preview_hanlight.jpg',
      visualText: '',
      status: 'Completed Project',
      title: '한빛전기',
      type: '실무형 브랜드 웹사이트',
      desc: '실제 사업체를 위한 전기 서비스 브랜드 사이트 구축',
      tags: ['SEO', 'Responsive', 'Vanilla JS', 'GitHub Pages'],
      link: 'https://37daphne21.github.io/hanlight/',
      linkText: 'View Project →',
      isReady: true
    },
    playful: {
      count: '02 / 04',
      visualClass: 'works-preview__visual--playful',
      visualImage: '',
      visualText: 'PLAYFUL',
      status: 'In Progress',
      title: 'Branding Playful',
      type: '브랜드 경험 웹사이트',
      desc: '감각적인 인터랙션 중심의 브랜드 경험',
      tags: ['Branding', 'Interaction', 'Animation'],
      link: '#',
      linkText: 'Coming Soon',
      isReady: false
    },
    luxury: {
      count: '03 / 04',
      visualClass: 'works-preview__visual--luxury',
      visualImage: '',
      visualText: 'LUXURY',
      status: 'Planned',
      title: 'Branding Luxury',
      type: 'Luxury Brand Website',
      desc: '고급스러운 무드의 럭셔리 브랜드 경험',
      tags: ['Branding', 'Luxury', 'Motion'],
      link: '#',
      linkText: 'Coming Soon',
      isReady: false
    },
    dashboard: {
      count: '04 / 04',
      visualClass: 'works-preview__visual--dashboard',
      visualImage: '',
      visualText: 'DASHBOARD',
      status: 'Planned',
      title: 'Travel Dashboard',
      type: 'Data Visualization',
      desc: '여행 데이터를 직관적으로 탐색하는 대시보드',
      tags: ['Data', 'Chart', 'UI/UX'],
      link: '#',
      linkText: 'Coming Soon',
      isReady: false
    }
  };

  function isMobile() {
    return window.matchMedia('(max-width: 768px)').matches;
  }

  function movePreview(key) {
    const activeItem = document.querySelector(`[data-work="${key}"]`);

    if (!activeItem) return;

    if (isMobile()) {
      activeItem.insertAdjacentElement('afterend', workPreview);
    } else {
      worksIndex.appendChild(workPreview);
    }
  }

  function changeWorkPreview(key) {
    const data = worksData[key];

    if (!data) return;

    workCount.textContent = data.count;
    workVisual.className = `works-preview__visual ${data.visualClass}`;

    if (data.visualImage) {
      workImage.src = data.visualImage;
      workImage.alt = `${data.title} 미리보기`;
      workImage.style.display = 'block';
    } else {
      workImage.removeAttribute('src');
      workImage.alt = '';
      workImage.style.display = 'none';
    }

    workVisualText.textContent = data.visualText;
    workStatus.textContent = data.status;
    workTitle.textContent = data.title;
    workType.textContent = data.type;
    workDesc.textContent = data.desc;
    workTag.innerHTML = data.tags.map(function (tag) {
      return `<span>${tag}</span>`;
    }).join('');
    workLink.href = data.link;
    workLink.textContent = data.linkText;

    if (data.isReady) {
      workLink.removeAttribute('aria-disabled');
      workLink.setAttribute('target', '_blank');
      workLink.setAttribute('rel', 'noopener');
      workLink.classList.remove('is-disabled');
    } else {
      workLink.setAttribute('aria-disabled', 'true');
      workLink.removeAttribute('target');
      workLink.removeAttribute('rel');
      workLink.classList.add('is-disabled');
    }

    workItems.forEach(function (item) {
      item.classList.remove('is-active');
    });

    document.querySelector(`[data-work="${key}"]`).classList.add('is-active');

    movePreview(key);
  }

  workLink.addEventListener('click', function (event) {
    if (workLink.classList.contains('is-disabled')) {
      event.preventDefault();
    }
  });

  workItems.forEach(function (item) {
    item.addEventListener('mouseenter', function () {
      if (!isMobile()) {
        changeWorkPreview(item.dataset.work);
      }
    });

    item.addEventListener('focus', function () {
      changeWorkPreview(item.dataset.work);
    });

    item.addEventListener('click', function () {
      changeWorkPreview(item.dataset.work);
    });
  });

  window.addEventListener('resize', function () {
    const activeItem = document.querySelector('.works-index__item.is-active');

    if (!activeItem) return;

    movePreview(activeItem.dataset.work);
  });

  movePreview('hanlight');
}());


// Lab
(function () {
  const labFilters = document.querySelectorAll('[data-lab-filter]');
  const labItems = document.querySelectorAll('[data-lab-item]');

  if (!labFilters.length || !labItems.length) return;

  labFilters.forEach(function (filter) {
    filter.addEventListener('click', function () {
      const selectedCategory = filter.dataset.labFilter;

      labFilters.forEach(function (button) {
        button.classList.remove('is-active');
      });

      filter.classList.add('is-active');

      labItems.forEach(function (item) {
        const itemCategory = item.dataset.labCategory;
        const isVisible = selectedCategory === 'all' || selectedCategory === itemCategory;

        item.classList.toggle('is-hidden', !isVisible);
      });
    });
  });
}());
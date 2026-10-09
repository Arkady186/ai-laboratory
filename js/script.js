/* ============================================================
   ИИ-Лаборатория — script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  /* ---------- Прелоадер ---------- */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader.classList.add('is-hidden'), 350);
  });
  // страховка: если load долго не срабатывает
  setTimeout(() => preloader.classList.add('is-hidden'), 3000);

  /* ---------- Год в футере ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- Шапка при скролле + прогресс + кнопка наверх ---------- */
  const header = document.getElementById('header');
  const progress = document.getElementById('scrollProgress');
  const toTop = document.getElementById('toTop');

  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 30);
    toTop.classList.toggle('is-visible', y > 600);

    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------- Мобильное меню ---------- */
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');

  burger.addEventListener('click', () => {
    burger.classList.toggle('is-open');
    nav.classList.toggle('is-open');
    document.body.style.overflow = nav.classList.contains('is-open') ? 'hidden' : '';
  });

  nav.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', () => {
      burger.classList.remove('is-open');
      nav.classList.remove('is-open');
      document.body.style.overflow = '';
    })
  );

  /* ---------- Плавный скролл с учётом шапки ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const id = anchor.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = document.querySelector('.header').offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - offset + 1;
      window.scrollTo({ top, behavior: 'smooth' });

      // если клик по карточке возраста — открываем соответствующую вкладку
      const age = anchor.dataset.age;
      if (age) activateTab(age);
    });
  });

  /* ---------- Вкладки возрастных групп ---------- */
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.tab-panel');

  function activateTab(name) {
    tabs.forEach(t => t.classList.toggle('is-active', t.dataset.tab === name));
    panels.forEach(p => p.classList.toggle('is-active', p.id === `panel-${name}`));
  }

  tabs.forEach(tab => tab.addEventListener('click', () => activateTab(tab.dataset.tab)));

  /* ---------- Аккордеон модулей ---------- */
  const modules = document.querySelectorAll('.module');

  function toggleModule(module) {
    const body = module.querySelector('.module__body');
    const isOpen = module.classList.contains('is-open');

    // закрываем остальные в текущей панели
    module.closest('.tab-panel').querySelectorAll('.module.is-open').forEach(m => {
      if (m !== module) {
        m.classList.remove('is-open');
        m.querySelector('.module__body').style.maxHeight = null;
      }
    });

    module.classList.toggle('is-open', !isOpen);
    body.style.maxHeight = isOpen ? null : body.scrollHeight + 'px';
  }

  modules.forEach(m =>
    m.querySelector('.module__head').addEventListener('click', () => toggleModule(m))
  );

  // открываем первый модуль в каждой панели по умолчанию
  panels.forEach(panel => {
    const first = panel.querySelector('.module');
    if (first) {
      first.classList.add('is-open');
      const body = first.querySelector('.module__body');
      requestAnimationFrame(() => {
        if (panel.classList.contains('is-active')) {
          body.style.maxHeight = body.scrollHeight + 'px';
        }
      });
    }
  });

  // пересчёт высоты открытого аккордеона при смене вкладки
  tabs.forEach(tab => tab.addEventListener('click', () => {
    const panel = document.getElementById(`panel-${tab.dataset.tab}`);
    const open = panel.querySelector('.module.is-open .module__body');
    if (open) open.style.maxHeight = open.scrollHeight + 'px';
  }));

  /* ---------- Анимация счётчиков ---------- */
  const counters = document.querySelectorAll('.stat__num');

  const animateCounter = el => {
    const target = +el.dataset.count;
    const duration = 1400;
    const start = performance.now();
    const step = now => {
      const p = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  /* ---------- Reveal при скролле ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      entry.target.querySelectorAll('.stat__num').forEach(c => {
        if (!c.dataset.done) { c.dataset.done = '1'; animateCounter(c); }
      });
      io.unobserve(entry.target);
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // счётчики в hero могут быть выше вьюпорта при загрузке — наблюдаем hero отдельно
  const heroIO = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat__num').forEach(c => {
          if (!c.dataset.done) { c.dataset.done = '1'; animateCounter(c); }
        });
        heroIO.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  const heroSection = document.getElementById('hero');
  if (heroSection) heroIO.observe(heroSection);

  /* ---------- Форма заявки ---------- */
  const form = document.getElementById('signupForm');
  const success = document.getElementById('formSuccess');

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    // Здесь можно подключить отправку на сервер / Telegram-бота / email-сервис
    success.hidden = false;
    form.reset();
    success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    setTimeout(() => (success.hidden = true), 8000);
  });
});

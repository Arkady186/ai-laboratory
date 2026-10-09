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

  const closeMenu = () => {
    burger.classList.remove('is-open');
    nav.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  burger.addEventListener('click', () => {
    burger.classList.toggle('is-open');
    nav.classList.toggle('is-open');
    document.body.style.overflow = nav.classList.contains('is-open') ? 'hidden' : '';
  });

  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

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
    });
  });

  /* ---------- Модальное окно записи ---------- */
  const modal = document.getElementById('signupModal');
  const fab = document.getElementById('fabOpen');

  const openModal = () => {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => modal.querySelector('input[name="name"]')?.focus(), 350);
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  fab.addEventListener('click', openModal);
  document.querySelectorAll('.js-open-modal').forEach(el =>
    el.addEventListener('click', e => {
      e.preventDefault();
      closeMenu();
      openModal();
    })
  );
  modal.querySelectorAll('[data-close]').forEach(el =>
    el.addEventListener('click', closeModal)
  );
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });

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
    setTimeout(() => {
      success.hidden = true;
      closeModal();
    }, 4000);
  });

  /* ---------- Видео ---------- */
  const video = document.getElementById('promoVideo');
  const videoOverlay = document.getElementById('videoOverlay');

  if (video && videoOverlay) {
    videoOverlay.addEventListener('click', () => {
      videoOverlay.classList.add('is-hidden');
      video.play().catch(() => {
        // если файла video/promo.mp4 нет — просто показываем заглушку обратно
        videoOverlay.classList.remove('is-hidden');
      });
    });
    video.addEventListener('ended', () => videoOverlay.classList.remove('is-hidden'));
  }

  /* ---------- Reveal при скролле ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
});

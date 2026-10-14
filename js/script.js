/* ============================================================
   НейроСтарт — script.js
   ============================================================ */

/* ---------- Краткие резюме программ (из docx) ---------- */
const SUMMARIES = {
  '7-10': {
    title: 'Краткое резюме · 7–10 лет',
    groups: [
      {
        icon: '🧠',
        title: 'Когнитивные навыки',
        text: 'Ребёнок учится задавать точные вопросы, проверять информацию, структурировать данные, сравнивать и делать выводы. Это базовые навыки работы с любой информацией — не только с ИИ.'
      },
      {
        icon: '🎨',
        title: 'Творческие навыки',
        text: 'Ребёнок создаёт персонажей, истории, иллюстрации, аудио. ИИ здесь выступает как соавтор, а не как замена: идеи и решения принадлежат ребёнку.'
      },
      {
        icon: '🚀',
        title: 'Проектные навыки',
        text: 'Ребёнок учится планировать, распределять роли, доводить работу до презентабельного результата и получать обратную связь. Это навык, который ценится в любой сфере — от школьного проекта до будущей профессии.'
      }
    ],
    final: 'Главный итог: ребёнок перестаёт быть <b>потребителем</b> контента и становится его <b>создателем</b> — который понимает, как работает инструмент, умеет им управлять и знает, где его пределы.'
  },
  '11-13': {
    title: 'Краткое резюме · 11–13 лет',
    groups: [
      {
        icon: '🧠',
        title: 'Критическое мышление',
        text: 'Подросток учится задавать точные вопросы, проверять информацию, отличать факт от правдоподобной выдумки, видеть шаблоны и ограничения ИИ. Это базовый навык для школы и для жизни в мире, где контента становится больше, а доверия к нему — меньше.'
      },
      {
        icon: '🎨',
        title: 'Творческая самостоятельность',
        text: 'Подросток создаёт комиксы, истории, иллюстрации, музыку. ИИ здесь не замена, а соавтор: идеи, выбор и правки принадлежат подростку. Он понимает разницу между «ИИ нарисовал» и «я придумал и выбрал» — и может это объяснить.'
      },
      {
        icon: '🚀',
        title: 'Проектное мышление',
        text: 'Подросток учится ставить задачу, разбивать её на шаги, выбирать формат, тестировать на аудитории, вносить правки и публично защищать результат. Это навык, который работает везде — от школьного проекта до будущей профессии.'
      }
    ],
    final: 'Главный итог: подросток перестаёт быть <b>потребителем</b> контента и становится его <b>автором</b>. Он понимает, как работает инструмент, умеет им управлять, знает, где его пределы, и может объяснить каждое своё решение.'
  },
  '14-16': {
    title: 'Краткое резюме · 14–16 лет',
    groups: [
      {
        icon: '🔬',
        title: 'Аналитические и исследовательские',
        text: 'Подросток учится ставить точные вопросы, проверять факты в независимых источниках, структурировать данные и делать выводы. Это база для школьных проектов, олимпиад и дальнейшего образования.'
      },
      {
        icon: '📊',
        title: 'Управленческие и проектные',
        text: 'Он разбивает большие задачи на шаги, управляет процессом, распределяет роли, планирует сроки и защищает результаты. Это навык, который ценят в любой сфере — от стартапов до крупных компаний.'
      },
      {
        icon: '🛡',
        title: 'Этические и цифровые',
        text: 'Подросток осознаёт границы ИИ, защищает приватность, распознаёт манипуляции и дипфейки, контролирует тон и стиль коммуникации. Это основа цифровой безопасности и взрослой ответственности.'
      }
    ],
    final: 'Главный итог: подросток перестаёт быть пассивным <b>потребителем</b> контента и становится его <b>создателем и куратором</b>. Он понимает, как работает инструмент, умеет им управлять, знает его пределы — и несёт ответственность за результат. Такой подход формирует не просто «умение пользоваться ИИ», а зрелое отношение к технологиям, которое останется актуальным годами.'
  }
};

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
    if (e.key === 'Escape' && summaryModal.classList.contains('is-open')) closeSummary();
  });

  /* ---------- Модальное окно: краткое резюме ---------- */
  const summaryModal = document.getElementById('summaryModal');
  const summaryTitle = document.getElementById('summaryTitle');
  const summaryContent = document.getElementById('summaryContent');

  const openSummary = key => {
    const data = SUMMARIES[key];
    if (!data) return;
    summaryTitle.textContent = data.title;
    summaryContent.innerHTML =
      data.groups.map(g => `
        <div class="summary-group">
          <span class="summary-group__icon">${g.icon}</span>
          <div>
            <h4>${g.title}</h4>
            <p>${g.text}</p>
          </div>
        </div>
      `).join('') +
      `<div class="summary-final">${data.final}</div>`;
    summaryModal.classList.add('is-open');
    summaryModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeSummary = () => {
    summaryModal.classList.remove('is-open');
    summaryModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.js-open-summary').forEach(btn =>
    btn.addEventListener('click', () => openSummary(btn.dataset.summary))
  );
  summaryModal.querySelectorAll('[data-close-summary]').forEach(el =>
    el.addEventListener('click', closeSummary)
  );

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

// Анимация для секций при прокрутке
document.addEventListener('DOMContentLoaded', function () {
  const sections = document.querySelectorAll('section');

  const animateSections = () => {
    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight * 0.8) {
        section.classList.add('visible');
      }
    });
  };

  // Запуск анимации при загрузке и прокрутке
  animateSections();
  window.addEventListener('scroll', animateSections);
});

// Кнопка "Наверх"
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

// Показываем кнопку при прокрутке
window.addEventListener('scroll', function () {
  if (window.scrollY > 400) {
    scrollToTopBtn.style.display = 'block';
  } else {
    scrollToTopBtn.style.display = 'none';
  }
});

// Прокрутка вверх при клике
scrollToTopBtn.addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
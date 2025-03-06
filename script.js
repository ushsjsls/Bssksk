// Анимация для кнопки CTA
document.addEventListener('DOMContentLoaded', function () {
  const ctaButton = document.querySelector('.cta-button');

  // Плавное появление кнопки
  setTimeout(() => {
    ctaButton.classList.add('visible');
  }, 500);

  // Анимация для секций при прокрутке
  const sections = document.querySelectorAll('.section');

  const animateSections = () => {
    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight * 0.8) {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
      }
    });
  };

  // Запуск анимации при загрузке и прокрутке
  animateSections();
  window.addEventListener('scroll', animateSections);
});
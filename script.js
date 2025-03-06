// Анимация для секций при прокрутке
document.addEventListener('DOMContentLoaded', function () {
  const sections = document.querySelectorAll('section');

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

// Кнопка "Наверх"
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

// Показываем кнопку при прокрутке
window.addEventListener('scroll', function () {
  if (window.scrollY > 300) {
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

// Дані для графіка собівартості
const costLabels = ["Смола", "Форма", "Додаткові матеріали", "Енерговитрати", "Реклама"];
const costData = {
  labels: costLabels,
  datasets: [{
    label: 'Вартість (грн)',
    data: [66, 30, 30, 10, 60],
    backgroundColor: [
      'rgba(255, 99, 132, 0.6)',
      'rgba(54, 162, 235, 0.6)',
      'rgba(75, 192, 192, 0.6)',
      'rgba(153, 102, 255, 0.6)',
      'rgba(255, 206, 86, 0.6)'
    ],
    borderColor: [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 206, 86, 1)'
    ],
    borderWidth: 1
  }]
};

// Налаштування графіка собівартості
const costConfig = {
  type: 'bar',
  data: costData,
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Вартість (грн)'
        }
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Розподіл собівартості виробу'
      }
    }
  }
};

// Створення графіка собівартості
const costChart = new Chart(
  document.getElementById('costChart'),
  costConfig
);

// Дані для графіка прогнозу продаж
const salesLabels = Array.from({ length: 12 }, (_, i) => `Місяць ${i + 1}`);
const salesData = {
  labels: salesLabels,
  datasets: [
    {
      label: 'Продажі (шт)',
      data: [800, 900, 1000, 1100, 1200, 1300, 1200, 1100, 1000, 900, 800, 700],
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
      yAxisID: 'y-sales' // Використовуємо окрему вісь для продаж
    },
    {
      label: 'Дохід (грн)',
      data: [800 * 500, 900 * 500, 1000 * 500, 1100 * 500, 1200 * 500, 1300 * 500, 1200 * 500, 1100 * 500, 1000 * 500, 900 * 500, 800 * 500, 700 * 500],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
      yAxisID: 'y-income' // Використовуємо окрему вісь для доходу
    },
    {
      label: 'Прибуток (грн)',
      data: [800 * (500 - 196), 900 * (500 - 196), 1000 * (500 - 196), 1100 * (500 - 196), 1200 * (500 - 196), 1300 * (500 - 196), 1200 * (500 - 196), 1100 * (500 - 196), 1000 * (500 - 196), 900 * (500 - 196), 800 * (500 - 196), 700 * (500 - 196)],
      backgroundColor: 'rgba(153, 102, 255, 0.6)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1,
      yAxisID: 'y-profit' // Використовуємо окрему вісь для прибутку
    }
  ]
};

// Налаштування графіка прогнозу продаж
const salesConfig = {
  type: 'bar', // Стовпчикова діаграма
  data: salesData,
  options: {
    responsive: true,
    scales: {
      'y-sales': {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Продажі (шт)'
        },
        beginAtZero: true
      },
      'y-income': {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Дохід (грн)'
        },
        beginAtZero: true,
        grid: {
          drawOnChartArea: false // Вимкнення сітки для правої осі
        }
      },
      'y-profit': {
        type: 'linear',
        display: false, // Приховати вісь для прибутку
        beginAtZero: true
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Прогноз продаж, доходу та прибутку на 12 місяців'
      }
    }
  }
};

// Створення графіка прогнозу продаж
const salesChart = new Chart(
  document.getElementById('salesChart'),
  salesConfig
);

// Розрахунок кінцевого прибутку за рік
const totalProfit = salesData.datasets[2].data.reduce((sum, profit) => sum + profit, 0);
document.getElementById('totalProfit').textContent = totalProfit.toLocaleString();
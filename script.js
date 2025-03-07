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

  animateSections();
  window.addEventListener('scroll', animateSections);
});

// Кнопка "Наверх"
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

window.addEventListener('scroll', function () {
  if (window.scrollY > 300) {
    scrollToTopBtn.style.display = 'block';
  } else {
    scrollToTopBtn.style.display = 'none';
  }
});

scrollToTopBtn.addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Обработка формы калькулятора
document.getElementById('calculationForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Отменяем стандартное поведение формы

  // Получаем введенные данные
  const unitCost = parseFloat(document.getElementById('unitCost').value);
  const unitPrice = parseFloat(document.getElementById('unitPrice').value);
  const monthlyExpenses = parseFloat(document.getElementById('monthlyExpenses').value);
  const taxRate = parseFloat(document.getElementById('taxRate').value) / 100;
  const salesVolume = parseFloat(document.getElementById('salesVolume').value);

  // Расчет прибыли с одной коробки
  const profitPerUnit = unitPrice - unitCost;

  // Расчет точки безубыточности
  const breakEvenPoint = Math.ceil(monthlyExpenses / profitPerUnit);

  // Расчет прибыли при введенных продажах
  const profitBeforeTax = salesVolume * profitPerUnit - monthlyExpenses;
  const profitAfterTax = profitBeforeTax * (1 - taxRate);

  // Расчет минимальной цены для прибыли
  const minPrice = (monthlyExpenses / salesVolume) + unitCost;

  // Вывод результатов
  document.getElementById('profitPerUnit').textContent = profitPerUnit.toFixed(2);
  document.getElementById('breakEvenPoint').textContent = breakEvenPoint;
  document.getElementById('profitResult').textContent = profitAfterTax.toFixed(2);
  document.getElementById('minPriceResult').textContent = minPrice.toFixed(2);
});

// Дані для графіка собівартості
const costLabels = ["Смола", "Форма", "Додаткові матеріали", "Енерговитрати", "Реклама"];
const costData = {
  labels: costLabels,
  datasets: [{
    label: 'Вартість (грн)',
    data: [88, 40, 50, 20, 60],
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

const costChart = new Chart(
  document.getElementById('costChart'),
  costConfig
);

// Дані для графіка прогнозу продаж
const salesLabels = Array.from({ length: 12 }, (_, i) => `Місяць ${i + 1}`);
const monthlyExpenses = 51800; // Щомісячні витрати
const unitCost = 258; // Собівартість одиниці
const unitPrice = 800; // Ціна за одиницю
const profitPerUnit = unitPrice - unitCost; // Прибуток з одиниці

const salesData = {
  labels: salesLabels,
  datasets: [
    {
      label: 'Продажі (шт)',
      data: [100, 120, 150, 180, 200, 220, 210, 190, 170, 150, 130, 110],
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
      yAxisID: 'y-sales'
    },
    {
      label: 'Дохід (грн)',
      data: [100 * unitPrice, 120 * unitPrice, 150 * unitPrice, 180 * unitPrice, 200 * unitPrice, 220 * unitPrice, 210 * unitPrice, 190 * unitPrice, 170 * unitPrice, 150 * unitPrice, 130 * unitPrice, 110 * unitPrice],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
      yAxisID: 'y-income'
    },
    {
      label: 'Прибуток (грн)',
      data: [
        100 * profitPerUnit - monthlyExpenses,
        120 * profitPerUnit - monthlyExpenses,
        150 * profitPerUnit - monthlyExpenses,
        180 * profitPerUnit - monthlyExpenses,
        200 * profitPerUnit - monthlyExpenses,
        220 * profitPerUnit - monthlyExpenses,
        210 * profitPerUnit - monthlyExpenses,
        190 * profitPerUnit - monthlyExpenses,
        170 * profitPerUnit - monthlyExpenses,
        150 * profitPerUnit - monthlyExpenses,
        130 * profitPerUnit - monthlyExpenses,
        110 * profitPerUnit - monthlyExpenses
      ],
      backgroundColor: 'rgba(153, 102, 255, 0.6)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1,
      yAxisID: 'y-profit'
    }
  ]
};

const salesConfig = {
  type: 'bar',
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
          drawOnChartArea: false
        }
      },
      'y-profit': {
        type: 'linear',
        display: false,
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

const salesChart = new Chart(
  document.getElementById('salesChart'),
  salesConfig
);

// Розрахунок кінцевого прибутку за рік
const totalProfitBeforeTax = salesData.datasets[2].data.reduce((sum, profit) => sum + profit, 0);

// Податок на прибуток (18%) + воєнний збір (1.5%)
const taxRate = 0.195; // 19.5%
const totalProfitAfterTax = totalProfitBeforeTax * (1 - taxRate);

// Вивід прибутку до та після податків
document.getElementById('profitBeforeTax').textContent = totalProfitBeforeTax.toLocaleString();
document.getElementById('profitAfterTax').textContent = totalProfitAfterTax.toLocaleString();
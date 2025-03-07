// Загрузка Google Charts
google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(() => {
  drawCostChart();
  drawSalesChart();
  drawExpensesChart();
  drawIncomeChart();
});

// Функция для рисования графика себестоимости
function drawCostChart() {
  const data = google.visualization.arrayToDataTable([
    ['Параметр', 'Вартість (грн)'],
    ['Смола', 88],
    ['Форма', 40],
    ['Додаткові матеріали', 50],
    ['Енерговитрати', 20],
    ['Реклама', 60],
  ]);

  const options = {
    title: 'Розподіл собівартості виробу',
    is3D: true,
    backgroundColor: 'transparent',
    titleTextStyle: {
      fontSize: 18,
      bold: true,
    },
    legend: {
      textStyle: {
        fontSize: 14,
      },
    },
    chartArea: {
      width: '80%',
      height: '70%',
    },
  };

  const chart = new google.visualization.PieChart(document.getElementById('costChart'));
  chart.draw(data, options);

  // Перерисовка графика при изменении размера окна
  window.addEventListener('resize', () => chart.draw(data, options));
}

// Функция для рисования графика прогноза продаж
function drawSalesChart() {
  const data = google.visualization.arrayToDataTable([
    ['Місяць', 'Продажі (шт)', 'Дохід (грн)', 'Прибуток (грн)'],
    ['Місяць 1', 100, 80000, 54200],
    ['Місяць 2', 120, 96000, 65040],
    ['Місяць 3', 150, 120000, 81300],
    ['Місяць 4', 180, 144000, 97560],
    ['Місяць 5', 200, 160000, 108400],
    ['Місяць 6', 220, 176000, 119240],
    ['Місяць 7', 210, 168000, 113820],
    ['Місяць 8', 190, 152000, 102980],
    ['Місяць 9', 170, 136000, 92140],
    ['Місяць 10', 150, 120000, 81300],
    ['Місяць 11', 130, 104000, 70460],
    ['Місяць 12', 110, 88000, 59620],
  ]);

  const options = {
    title: 'Прогноз продаж, доходу та прибутку на 12 місяців',
    curveType: 'function',
    legend: { position: 'bottom' },
    backgroundColor: 'transparent',
    titleTextStyle: {
      fontSize: 18,
      bold: true,
    },
    hAxis: {
      title: 'Місяць',
      titleTextStyle: {
        fontSize: 14,
      },
    },
    vAxis: {
      title: 'Гривні',
      titleTextStyle: {
        fontSize: 14,
      },
    },
    chartArea: {
      width: '80%',
      height: '70%',
    },
    colors: ['#1a73e8', '#34a853', '#fbbc05'], // Цвета для линий
    tooltip: { isHtml: true }, // Всплывающие подсказки
  };

  const chart = new google.visualization.LineChart(document.getElementById('salesChart'));
  chart.draw(data, options);

  // Перерисовка графика при изменении размера окна
  window.addEventListener('resize', () => chart.draw(data, options));

  // Расчет прибыли за год
  const totalProfit = data
    .getFilteredRows([{ column: 3, minValue: 0 }]) // Фильтр по столбцу "Прибуток"
    .reduce((sum, row) => sum + data.getValue(row, 3), 0); // Сумма прибыли
  document.getElementById('totalProfit').textContent = totalProfit.toLocaleString() + ' грн';
}

// Функция для рисования графика витрат
function drawExpensesChart() {
  const data = google.visualization.arrayToDataTable([
    ['Категорія', 'Сума (грн)'],
    ['Стартові витрати', 1500 * 38], // Конвертация в гривны
    ['Щомісячні витрати', 51800],
    ['Собівартість виробу', 258 * 1000], // Для 1000 коробок
  ]);

  const options = {
    title: 'Розподіл витрат',
    pieHole: 0.4,
    backgroundColor: 'transparent',
    titleTextStyle: {
      fontSize: 18,
      bold: true,
    },
    legend: {
      textStyle: {
        fontSize: 14,
      },
    },
  };

  const chart = new google.visualization.PieChart(document.getElementById('expensesChart'));
  chart.draw(data, options);
}

// Функция для рисования графика доходів
function drawIncomeChart() {
  const data = google.visualization.arrayToDataTable([
    ['Категорія', 'Сума (грн)'],
    ['Дохід від продажів', 9600000],
    ['Прибуток до податків', 542000],
    ['Прибуток після податків', 436000],
  ]);

  const options = {
    title: 'Розподіл доходів',
    bars: 'horizontal',
    backgroundColor: 'transparent',
    titleTextStyle: {
      fontSize: 18,
      bold: true,
    },
    legend: {
      textStyle: {
        fontSize: 14,
      },
    },
  };

  const chart = new google.visualization.BarChart(document.getElementById('incomeChart'));
  chart.draw(data, options);
}

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
  const footer = document.querySelector('footer');
  const footerTop = footer.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (footerTop < windowHeight) {
    scrollToTopBtn.style.display = 'block';
  } else {
    scrollToTopBtn.style.display = 'none';
  }
});

scrollToTopBtn.addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

// Обработка формы для расчета себестоимости
document.getElementById('costForm').addEventListener('submit', function (e) {
  e.preventDefault();

  // Получаем введенные данные
  const resinCost = parseFloat(document.getElementById('resinCost').value);
  const moldCost = parseFloat(document.getElementById('moldCost').value);
  const additionalCost = parseFloat(document.getElementById('additionalCost').value);
  const energyCost = parseFloat(document.getElementById('energyCost').value);
  const advertisingCost = parseFloat(document.getElementById('advertisingCost').value);

  // Общая себестоимость
  const totalCost = resinCost + moldCost + additionalCost + energyCost + advertisingCost;

  // Обновляем таблицу
  document.getElementById('resin-cost').textContent = resinCost.toLocaleString();
  document.getElementById('mold-cost').textContent = moldCost.toLocaleString();
  document.getElementById('additional-cost').textContent = additionalCost.toLocaleString();
  document.getElementById('energy-cost').textContent = energyCost.toLocaleString();
  document.getElementById('advertising-cost').textContent = advertisingCost.toLocaleString();
  document.getElementById('total-cost').textContent = totalCost.toLocaleString();

  // Обновляем график себестоимости
  drawCostChart();
});

// Обработка формы калькулятора
document.getElementById('calculationForm').addEventListener('submit', function (e) {
  e.preventDefault();

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
  document.getElementById('profitPerUnit').textContent = profitPerUnit.toLocaleString() + ' грн';
  document.getElementById('breakEvenPoint').textContent = breakEvenPoint.toLocaleString() + ' шт/місяць';
  document.getElementById('profitResult').textContent = profitAfterTax.toLocaleString() + ' грн/місяць';
  document.getElementById('minPriceResult').textContent = minPrice.toLocaleString() + ' грн';

  // Обновление графика калькулятора
  drawCalculatorChart(unitCost, unitPrice, monthlyExpenses, salesVolume);
});

// Функция для рисования графика калькулятора
function drawCalculatorChart(unitCost, unitPrice, monthlyExpenses, salesVolume) {
  const data = google.visualization.arrayToDataTable([
    ['Кількість продажів', 'Прибуток'],
    [0, -monthlyExpenses],
    [salesVolume, (unitPrice - unitCost) * salesVolume - monthlyExpenses],
  ]);

  const options = {
    title: 'Залежність прибутку від кількості продажів',
    curveType: 'function',
    legend: { position: 'bottom' },
    backgroundColor: 'transparent',
    titleTextStyle: {
      fontSize: 18,
      bold: true,
    },
    hAxis: {
      title: 'Кількість продажів (шт)',
      titleTextStyle: {
        fontSize: 14,
      },
    },
    vAxis: {
      title: 'Прибуток (грн)',
      titleTextStyle: {
        fontSize: 14,
      },
    },
    chartArea: {
      width: '80%',
      height: '70%',
    },
  };

  const chart = new google.visualization.LineChart(document.getElementById('calculatorChart'));
  chart.draw(data, options);
}
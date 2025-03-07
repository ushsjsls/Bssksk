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
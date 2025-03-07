// Обработка формы
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
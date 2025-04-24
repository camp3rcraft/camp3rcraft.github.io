async function fetchStatus() {
    const statusDiv = document.getElementById('status');
    statusDiv.textContent = 'Загрузка...';

    try {
      // Замените URL на адрес вашего бота с endpoint /status
      const response = await fetch('https://wii5o4-88-135-51-226.ru.tuna.am/status');
      if (!response.ok) {
        statusDiv.textContent = 'Ошибка при загрузке статуса';
        return;
      }
      const data = await response.json();

      statusDiv.innerHTML = `
        <p><strong>Пользователь:</strong> ${data.username}</p>
        <p><strong>Статус:</strong> ${data.status}</p>
        <p><strong>Активность:</strong> ${data.activity || 'Нет активности'}</p>
      `;
    } catch (error) {
      statusDiv.textContent = 'Ошибка сети или сервера';
      console.error(error);
    }
  }

  // Вызываем fetchStatus сразу при загрузке страницы
  fetchStatus();

  // Обновляем статус каждые 5 секунд (5000 миллисекунд)
  setInterval(fetchStatus, 5000);
let lastUpdate = "";
fetch('https://api.github.com/repos/camp3rcraft/camp3rcraft.github.io')
  .then(response => response.json())
  .then(data => {
    const lastUpdateText = document.querySelector("#last-update");

    const rawLastUpdateDate = new Date(data.pushed_at);

    if (isNaN(rawLastUpdateDate.getTime())) {
      lastUpdate = "Последнее обновление: не удалось получить время последнего обновления, чекни консоль (F12)";
    } else {
      const formattedDate = rawLastUpdateDate.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      });
      lastUpdate = "Последнее обновление: " + formattedDate;
    }

    lastUpdateText.innerHTML = lastUpdate;
  })
  .catch(error => {
    console.error("Ошибка при получении данных:", error);
    const lastUpdateText = document.querySelector("#last-update");
    lastUpdate = "Последнее обновление: не удалось получить время последнего обновления, чекни консоль (F12)";
    lastUpdateText.innerHTML = lastUpdate;
  });

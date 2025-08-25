let lastUpdate = "";
fetch('https://api.github.com/repos/camp3rcraft/camp3rcraft.github.io')
  .then(response => response.json())
  .then(data => {
    const lastUpdateText = document.querySelector("#last-update");

    const rawLastUpdateDate = new Date(data.pushed_at);

    if (isNaN(rawLastUpdateDate.getTime())) {
      lastUpdate = "не смогли получить ласт апдейт. гит задушил потому что часто пингуешь";
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
    lastUpdate = "не смогли получить ласт апдейт. гит задушил потому что часто пингуешь";
    lastUpdateText.innerHTML = lastUpdate;
  });

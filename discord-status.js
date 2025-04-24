async function fetchStatus() {
    const errorBox = document.getElementById('errorBox');
    const activityBlock = document.getElementById('activityBlock');

    try {
        const response = await fetch('http://88.135.51.226:3001/status');

        if (!response.ok) {
            throw new Error(`Ошибка сервера: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        // Скрываем ошибку, если запрос успешен
        errorBox.style.display = 'none';

        if (!data.activityName) {
            activityBlock.style.display = 'none';
            return;
        } else {
            activityBlock.style.display = 'block';
        }

        // Заполняем данные активности (как раньше)
        // ...

        // Ваш существующий код заполнения активности здесь
        const activityTitle = document.getElementById('activityTitle');
        const activityText = document.getElementById('activityText');
        const activityIcon = document.getElementById('activityIcon');
        const smallImage = document.getElementById('smallImage');

        activityTitle.textContent = `Играет в ${data.activityName}`;

        if (data.activityDetails && data.activityState) {
            activityText.textContent = `${data.activityDetails} — ${data.activityState}`;
        } else if (data.activityDetails) {
            activityText.textContent = data.activityDetails;
        } else if (data.activityState) {
            activityText.textContent = data.activityState;
        } else {
            activityText.textContent = '';
        }

        if (data.iconURL) {
            activityIcon.src = data.iconURL;
            activityIcon.alt = data.largeText || '';
            activityIcon.title = data.largeText || '';
            activityIcon.style.display = 'inline';
        } else {
            activityIcon.style.display = 'none';
        }

        if (data.smallImageURL) {
            smallImage.src = data.smallImageURL;
            smallImage.alt = data.smallText || '';
            smallImage.title = data.smallText || '';
            smallImage.style.display = 'inline';
        } else {
            smallImage.style.display = 'none';
        }

        let elapsed = 0;
        if (data.startTime) {
            const startTime = new Date(data.startTime);
            const now = new Date();
            elapsed = Math.floor((now - startTime) / 1000);
        }

        const hours = Math.floor(elapsed / 3600);
        const minutes = Math.floor((elapsed % 3600) / 60);
        const seconds = elapsed % 60;
        document.getElementById('elapsedTime').textContent = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    } catch (error) {
        // Показываем ошибку и скрываем активность
        errorBox.textContent = `Ошибка: ${error.message}`;
        errorBox.style.display = 'block';
        activityBlock.style.display = 'none';
    }
}

setInterval(fetchStatus, 1000);
fetchStatus();

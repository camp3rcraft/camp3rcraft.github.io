    const now = new Date();
    let targetYear = now.getFullYear();
    const summerStart = new Date(targetYear, 5, 1, 0, 0, 0); // 1 июня

    if (now >= summerStart) {
        targetYear += 1;
    }
    const targetDate = new Date(targetYear, 5, 1, 0, 0, 0);

    const countdownContainer = document.getElementById('countdown-container');

    // Функция для проверки, наступило ли лето
    function isSummerHere() {
        return now >= summerStart;
    }

    // Функция для отображения сообщения о лете
    function showSummerMessage() {
        countdownContainer.innerHTML = '<h2 class="summer-message">🥳Лето наступило, поздравлямбус!</h2>';
        localStorage.setItem('summerMessageShown', 'true'); // Сохраняем состояние
    }

    function updateCountdown() {
        const now = new Date();
        const remainingTime = targetDate - now;

        if (remainingTime <= 0) {
            // Лето наступило
            showSummerMessage();
            clearInterval(timerInterval);
            return;
        }

        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = days.toString().padStart(2, '0');
        document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
        document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
    }

    // Проверяем, показывали ли сообщение ранее
    if (localStorage.getItem('summerMessageShown') === 'true') {
        showSummerMessage();
    } else {
        // Если нет, запускаем таймер
        const timerInterval = setInterval(updateCountdown, 1000);
        updateCountdown();

        // Проверяем, наступило ли лето при загрузке страницы
        if (isSummerHere()) {
            showSummerMessage();
            clearInterval(timerInterval);
        }
    }

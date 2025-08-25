const now = new Date();
let targetYear = now.getFullYear();

const birthdayDate = new Date(targetYear, 8, 20, 0, 0, 0);

if (now >= birthdayDate) {
    targetYear += 1;
}

const targetDate = new Date(targetYear, 8, 20, 0, 0, 0);

const countdownContainer = document.getElementById('birthday-container');

const savedTargetDate = localStorage.getItem('targetDate');
if (savedTargetDate !== targetDate.toISOString()) {
    localStorage.removeItem('birthdayMessageShown');
    localStorage.setItem('targetDate', targetDate.toISOString());
}

function showBirthdayMessage() {
    countdownContainer.innerHTML = '<h2 class="birthday-message">🥳хапи бёрздай кампер!</h2>';
    localStorage.setItem('birthdayMessageShown', 'true');
}

function updateCountdown() {
    const now = new Date();
    const remainingTime = targetDate - now;

    if (remainingTime <= 0) {
        showBirthdayMessage();
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

if (localStorage.getItem('birthdayMessageShown') === 'true') {
    showBirthdayMessage();
} else {
    const timerInterval = setInterval(updateCountdown, 1000);
    updateCountdown();
}

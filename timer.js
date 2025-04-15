let timerInterval;
let timeLeft = 0;
let runningTimer = false;
let blinking = false;

// Создаём аудио элемент для сигнала
const beepAudio = new Audio('assets/timer.mp3');
beepAudio.loop = true; // зациклить звук

function formatTimerTime(ms) {
  const totalSeconds = Math.ceil(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function startBlinking() {
  if (blinking) return;
  blinking = true;
  const timerDisplay = document.getElementById('timerDisplay');
  timerDisplay.classList.add('blinking');
}

function stopBlinking() {
  blinking = false;
  const timerDisplay = document.getElementById('timerDisplay');
  timerDisplay.classList.remove('blinking');
  timerDisplay.style.color = 'white';
}

function updateTimer() {
  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    runningTimer = false;
    document.getElementById('timerDisplay').textContent = "00:00";
    startBlinking();
    beepAudio.play().catch(e => {
      // В некоторых браузерах звук можно проиграть только после взаимодействия пользователя
      console.log('Ошибка воспроизведения звука:', e);
    });
    return;
  }
  timeLeft -= 1000;
  document.getElementById('timerDisplay').textContent = formatTimerTime(timeLeft);
}

document.getElementById('startTimerBtn').addEventListener('click', () => {
  if (runningTimer) return;
  const inputSeconds = parseInt(document.getElementById('timerInput').value, 10);
  if (isNaN(inputSeconds) || inputSeconds <= 0) {
    alert("Введите положительное число секунд");
    return;
  }
  timeLeft = inputSeconds * 1000;
  document.getElementById('timerDisplay').textContent = formatTimerTime(timeLeft);
  runningTimer = true;
  stopBlinking();
  beepAudio.pause();
  beepAudio.currentTime = 0;
  timerInterval = setInterval(updateTimer, 1000);
});

document.getElementById('stopTimerBtn').addEventListener('click', () => {
  if (!runningTimer) return;
  clearInterval(timerInterval);
  runningTimer = false;
});

document.getElementById('resetTimerBtn').addEventListener('click', () => {
  clearInterval(timerInterval);
  runningTimer = false;
  timeLeft = 0;
  document.getElementById('timerDisplay').textContent = "00:00";
  document.getElementById('timerInput').value = "";
  stopBlinking();
  beepAudio.pause();
  beepAudio.currentTime = 0;
});
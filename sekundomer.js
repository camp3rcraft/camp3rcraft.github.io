let stopwatchInterval;
let startTime = 0;
let elapsedTime = 0;
let running = false;

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  const milliseconds = Math.floor((ms % 1000) / 10).toString().padStart(2, '0'); // сотые доли секунды
  return `${minutes}:${seconds}:${milliseconds}`;
}

function updateStopwatch() {
  elapsedTime = Date.now() - startTime;
  document.getElementById('stopwatch').textContent = formatTime(elapsedTime);
}

document.getElementById('startBtn').addEventListener('click', () => {
  if (!running) {
    running = true;
    startTime = Date.now() - elapsedTime; // чтобы продолжить с текущего времени
    stopwatchInterval = setInterval(updateStopwatch, 10); // обновляем каждые 10 мс
  }
});

document.getElementById('stopBtn').addEventListener('click', () => {
  if (running) {
    running = false;
    clearInterval(stopwatchInterval);
  }
});

document.getElementById('resetBtn').addEventListener('click', () => {
  running = false;
  clearInterval(stopwatchInterval);
  elapsedTime = 0;
  document.getElementById('stopwatch').textContent = "00:00:00";
});
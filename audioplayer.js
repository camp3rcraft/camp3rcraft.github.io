const tracks = [
    "track1.mp3",
    "track2.mp3",
    "track3.mp3",
    "track4.mp3",
    "track5.mp3",
    "track6.mp3",
    "track7.mp3",
    "track8.mp3",
];
const audioFolder = './audio/';
let currentTrackIndex = Math.floor(Math.random() * tracks.length);

const audioElement = document.getElementById('audio');
const playPauseButton = document.getElementById('playPause');
const stopButton = document.getElementById('stop');
const nextTrackButton = document.getElementById('nextTrack');
const volumeInput = document.getElementById('volume');
const currentTimeSpan = document.getElementById('currentTime');
const durationSpan = document.getElementById('duration');

// Функция для загрузки трека
function loadTrack() {
    const track = tracks[currentTrackIndex];
    audioElement.src = audioFolder + track;
    audioElement.play().catch(error => console.error("Ошибка воспроизведения:", error));
}

// Функция для обновления времени
function updateCurrentTime() {
    const currentTime = audioElement.currentTime;
    const duration = audioElement.duration;
    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60);
    currentTimeSpan.textContent = `${padZero(minutes)}:${padZero(seconds)}`;
    if (duration) {
        const durationMinutes = Math.floor(duration / 60);
        const durationSeconds = Math.floor(duration % 60);
        durationSpan.textContent = `${padZero(durationMinutes)}:${padZero(durationSeconds)}`;
    }
}

// Функция для добавления ведущих нулей
function padZero(number) {
    return (number < 10 ? '0' : '') + number;
}

// События
audioElement.addEventListener('timeupdate', updateCurrentTime);
playPauseButton.addEventListener('click', () => {
    if (audioElement.paused) {
        audioElement.play();
        playPauseButton.textContent = '❚❚';
    } else {
        audioElement.pause();
        playPauseButton.textContent = '▶';
    }
});
stopButton.addEventListener('click', () => {
    audioElement.pause();
    audioElement.currentTime = 0;
    playPauseButton.textContent = '▶';
});
nextTrackButton.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack();
});
volumeInput.addEventListener('input', () => {
    audioElement.volume = volumeInput.value;
});

document.addEventListener('DOMContentLoaded', loadTrack);

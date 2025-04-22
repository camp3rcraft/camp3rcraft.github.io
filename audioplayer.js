const tracks = [
    { file: "track1.mp3", title: "SMD", author: "Romanceplanet" },
    { file: "track2.mp3", title: "PLAIN WHITE TEE", author: "Romanceplanet" },
    { file: "track3.mp3", title: "Moonflowers", author: "meganeko" },
    { file: "track4.mp3", title: "God bless you", author: "china" },
    { file: "track5.mp3", title: "Crazy", author: "Creo" },
    { file: "track6.mp3", title: "Miami Hotline - Vol. 3", author: "Demonicity" },
    { file: "track7.mp3", title: "Machina", author: "Dex Arson" },
    { file: "track8.mp3", title: "Supernova", author: "Xtrullor" },
    { file: "track9.mp3", title: "Forsaken Neon", author: "Dimrain47" },
    { file: "track10.mp3", title: "FALL FROM THE SKY PT. 2", author: "Romanceplanet" },
    { file: "track11.mp3", title: "Biome Fest", author: "C418" },
    { file: "track12.mp3", title: "Taswell", author: "C418" },
    { file: "track13.mp3", title: "Strad", author: "C418" },
    { file: "track14.mp3", title: "Dog", author: "C418" },
    { file: "track15.mp3", title: "otherside", author: "Lena Raine" },
];
const audioFolder = './audio/';
let currentTrackIndex = Math.floor(Math.random() * tracks.length);

const audioElement = document.getElementById('audio');
const prevTrackButton = document.getElementById('prevTrack');
const playPauseButton = document.getElementById('playPause');
const stopButton = document.getElementById('stop');
const nextTrackButton = document.getElementById('nextTrack');
const volumeInput = document.getElementById('volume');
const currentTimeSpan = document.getElementById('currentTime');
const durationSpan = document.getElementById('duration');
const trackTitleSpan = document.getElementById('trackTitle');
const trackAuthorSpan = document.getElementById('trackAuthor');
const repeatTrackButton = document.getElementById('repeatTrack');
const playPauseIcon = document.getElementById('playPauseIcon');
let isRepeat = false;


function updateTrackInfo(title, author) {
    const trackTitleSpan = document.getElementById('trackTitle');
    const trackAuthorSpan = document.getElementById('trackAuthor');

    trackTitleSpan.classList.remove('fade-in');
    trackAuthorSpan.classList.remove('fade-in');
    trackTitleSpan.classList.add('fade-out');
    trackAuthorSpan.classList.add('fade-out');

    setTimeout(() => {
        trackTitleSpan.textContent = title;
        trackAuthorSpan.textContent = author;

        trackTitleSpan.classList.add('fade-in');
        trackAuthorSpan.classList.add('fade-in');
    }, 500); // 500 мс — время анимации fade-out
}



// Функция для загрузки трека
function loadTrack() {
    const track = tracks[currentTrackIndex];
    audioElement.src = audioFolder + track.file;
    
    updateTrackInfo(track.title, track.author);
    
    trackTitleSpan.textContent = track.title;
    trackAuthorSpan.textContent = track.author;
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
audioElement.addEventListener('ended', () => {
    if (isRepeat) {
        audioElement.currentTime = 0;
        audioElement.play();
    } else {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        loadTrack();
    }
});
playPauseButton.addEventListener('click', () => {
    if (audioElement.paused) {
        audioElement.play();
        playPauseIcon.src = 'player/pause.svg'; // путь к картинке паузы
    } else {
        audioElement.pause();
        playPauseIcon.src = 'player/play_arrow.svg'; // путь к картинке воспроизведения
    }
});
stopButton.addEventListener('click', () => {
    audioElement.pause();
    audioElement.currentTime = 0;
    playPauseIcon.src = 'player/play_arrow.svg';
});
nextTrackButton.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack();
});
volumeInput.addEventListener('input', () => {
    audioElement.volume = volumeInput.value;
});

document.addEventListener('DOMContentLoaded', loadTrack);

prevTrackButton.addEventListener('click', () => {
    if(audioElement.currentTime > 5 && !audioElement.paused) {
        audioElement.currentTime = 0;
        updateTrackInfo(
            tracks[currentTrackIndex].title, 
            tracks[currentTrackIndex].author
        );
    } 
    else {
        currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
        loadTrack();
    }});

    repeatTrackButton.addEventListener('click', () => {
        isRepeat = !isRepeat;
        repeatTrackButton.classList.toggle('active', isRepeat);
    });
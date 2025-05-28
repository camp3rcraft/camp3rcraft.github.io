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
    { file: "track16.mp3", title: "Still Loving You", author: "Scorpions" },
    { file: "track17.mp3", title: "Lunar Abyss", author: "Lchavasse" },
    { file: "track18.mp3", title: "ЯḄЬ", author: "AXIUS LIИK" },
    { file: "track19.mp3", title: "Noise", author: "Hensonn" },
    { file: "track20.mp3", title: "Tears", author: "Amos Roddy" },
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

// Конфигурация для изменения нескольких CSS-свойств
const colorConfig = {
    specialTracks: [10, 11, 12, 13, 14, 19], // Индексы треков 11-15 (0-based)
    targetClasses: {
        'backgroundGradient': { background: 'radial-gradient(#5406d3, #000)' },
        'bgCircle4': { background: '#5900ff85' },
        'bgCircle3': { background: '#3808e7c7' },
        'bgCircle2': { background: '#740ad8' },
        'bgCircle1': { background: '#4400ff69' },
        'bgCircle5': { border: '15px solid #8c00ff' },
        'player-textTitle': {
            color: '#a963ff',
            textShadow: '0 0 15px #a963ff' 
        },
    }
};

let styleElements = [];
const originalStyles = new Map();

function updateTrackInfo(title, author) {
    trackTitleSpan.classList.remove('fade-in');
    trackAuthorSpan.classList.remove('fade-in');
    trackTitleSpan.classList.add('fade-out');
    trackAuthorSpan.classList.add('fade-out');

    setTimeout(() => {
        trackTitleSpan.textContent = title;
        trackAuthorSpan.textContent = author;

        trackTitleSpan.classList.remove('fade-out');
        trackAuthorSpan.classList.remove('fade-out');
        trackTitleSpan.classList.add('fade-in');
        trackAuthorSpan.classList.add('fade-in');
    }, 500);
}

// Инициализация элементов и сохранение оригинальных стилей
document.addEventListener('DOMContentLoaded', () => {
    styleElements = Object.keys(colorConfig.targetClasses).flatMap(className => {
        return Array.from(document.getElementsByClassName(className));
    });

    styleElements.forEach(element => {
        const className = Array.from(element.classList).find(cls => cls in colorConfig.targetClasses);
        const props = colorConfig.targetClasses[className];
        const original = {};
        for (const prop in props) {
            original[prop] = getComputedStyle(element)[prop];
        }
        originalStyles.set(element, original);

        // Добавляем плавный переход для всех свойств
        const transitionProps = Object.keys(props).join(', ');
        element.style.transition = transitionProps
            .split(', ')
            .map(p => `${p} 2.8s cubic-bezier(0.4, 0, 0.2, 1)`)
            .join(', ');
    });

    loadTrack();
});

function activateSpecialStyles() {
    styleElements.forEach(element => {
        const className = Array.from(element.classList).find(cls => cls in colorConfig.targetClasses);
        const props = colorConfig.targetClasses[className];
        for (const prop in props) {
            element.style[prop] = props[prop];
        }
    });
}

function resetStyles() {
    styleElements.forEach(element => {
        const original = originalStyles.get(element);
        if (original) {
            for (const prop in original) {
                element.style[prop] = original[prop];
            }
        }
    });
}

function loadTrack() {
    const track = tracks[currentTrackIndex];
    audioElement.src = audioFolder + track.file;
    updateTrackInfo(track.title, track.author);

    if (colorConfig.specialTracks.includes(currentTrackIndex)) {
        activateSpecialStyles();
    } else {
        resetStyles();
    }

    audioElement.play().catch(error => console.error("Ошибка воспроизведения:", error));
}

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

function padZero(number) {
    return (number < 10 ? '0' : '') + number;
}

// События
audioElement.addEventListener('timeupdate', updateCurrentTime);

audioElement.addEventListener('ended', () => {
    resetStyles();
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
        playPauseIcon.src = 'player/pause.svg';
    } else {
        audioElement.pause();
        playPauseIcon.src = 'player/play_arrow.svg';
    }
});

stopButton.addEventListener('click', () => {
    audioElement.pause();
    audioElement.currentTime = 0;
    playPauseIcon.src = 'player/play_arrow.svg';
    resetStyles();
});

nextTrackButton.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack();
});

prevTrackButton.addEventListener('click', () => {
    if (audioElement.currentTime > 5 && !audioElement.paused) {
        audioElement.currentTime = 0;
        updateTrackInfo(tracks[currentTrackIndex].title, tracks[currentTrackIndex].author);
    } else {
        currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
        loadTrack();
    }
});

volumeInput.addEventListener('input', () => {
    audioElement.volume = volumeInput.value;
});

repeatTrackButton.addEventListener('click', () => {
    isRepeat = !isRepeat;
    repeatTrackButton.classList.toggle('active', isRepeat);
});

const audioFolder = './audio/';

const audioElement = document.getElementById('audio');
const playPauseButton = document.getElementById('playPause');
const nextTrackButton = document.getElementById('nextTrack');
const previousTrackButton = document.getElementById('previousTrack');

let tracks = [];
let currentTrackIndex = 0;

fetch(audioFolder)
    .then(response => response.json())
    .then(data => {
        tracks = data;
        loadTrack();
    })
    .catch(error => console.error('Ошибка загрузки треков:', error));

function loadTrack() {
    if (tracks.length > 0) {
        const track = tracks[currentTrackIndex];
        audioElement.src = audioFolder + track;
        audioElement.play();
    }
}

playPauseButton.addEventListener('click', () => {
    if (audioElement.paused) {
        audioElement.play();
    } else {
        audioElement.pause();
    }
});

nextTrackButton.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack();
});

previousTrackButton.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack();
});

document.addEventListener('DOMContentLoaded', () => {
    currentTrackIndex = Math.floor(Math.random() * tracks.length);
    loadTrack();
});

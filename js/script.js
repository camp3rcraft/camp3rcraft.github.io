const tracks = ["track1.mp3", "track2.mp3", "track3.mp3"];
const audioFolder = './audio/';
let currentTrackIndex = Math.floor(Math.random() * tracks.length);

const audioElement = document.getElementById('audio');
const playPauseButton = document.getElementById('playPause');
const nextTrackButton = document.getElementById('nextTrack');

function loadTrack() {
    const track = tracks[currentTrackIndex];
    audioElement.src = audioFolder + track;
    audioElement.play().catch(error => console.error("Ошибка воспроизведения:", error));
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

document.addEventListener('DOMContentLoaded', loadTrack);

const tracks = [
    { file: "track1.mp3", title: "SMD", author: "Romanceplanet", explicit: true, cover: "track1.jpg", links: { spotify:"https://open.spotify.com/track/4PaF6SmswulhdBKWWJTLkV?si=4a647545331d48d1", youtube:"https://music.youtube.com/watch?v=V0ou4Vk-I9E&si=ACZNsl8qgA_t1P0S", yandex:"https://music.yandex.ru/track/134946213?utm_source=web&utm_medium=copy_link" } },
    { file: "track2.mp3", title: "PLAIN WHITE TEE", author: "Romanceplanet", explicit: false, cover: "track2.jpg", links: { spotify:"https://open.spotify.com/track/0mS9cDuFWaCYjKf38ujfet?si=39294e9b0e784234", youtube:"https://music.youtube.com/watch?v=SIUFO6BKHc4&si=bq3RvmiaWUwkQace", yandex:"https://music.yandex.ru/track/134824849?utm_source=web&utm_medium=copy_link" } },
    { file: "track3.mp3", title: "Moonflowers", author: "meganeko", explicit: false, cover: "track3.jpg", links: { spotify:"https://open.spotify.com/track/5YVcQX21kwiGJA5j1SbsGI?si=9ccd588faebd4cbb", youtube:"https://music.youtube.com/watch?v=gLB2WxP520s&si=dIZVVIaxhWoPHsnH" } },
    { file: "track4.mp3", title: "God bless you", author: "china" },
    { file: "track5.mp3", title: "Crazy", author: "Creo", explicit: false, cover: "track5.jpg", links: { spotify:"https://open.spotify.com/track/2ex9wWoRG6TpmB3nlOKaXi?si=387c00d55a1f4792", youtube:"https://music.youtube.com/watch?v=_SpzUHZqDOU&si=MQa7-ycvXfPY9cwK", yandex:"https://music.yandex.ru/track/94192879?utm_source=web&utm_medium=copy_link" } },
    { file: "track6.mp3", title: "Miami Hotline - Vol. 3", author: "Demonicity", explicit: false, cover: "track6.jpg" },
    { file: "track7.mp3", title: "Machina", author: "Dex Arson", explicit: false, cover: "track7.jpg", links: { spotify:"https://open.spotify.com/track/59dtbpqYIFogNsDayzyYky?si=3bf359c381354659", youtube:"https://music.youtube.com/watch?v=gP7WJDQ05Qc&si=xO80vr3kD2V9m2rg" } },
    { file: "track8.mp3", title: "Supernova", author: "Xtrullor", explicit: false, cover: "track8.jpg", links: { spotify:"https://open.spotify.com/track/3QRObjsiUeBbV6JXVKaJZT?si=0665fab72bd74810", youtube:"https://music.youtube.com/watch?v=dI51suFmzEk&si=uBSw8vAtx5qj7X-H" } },
    { file: "track9.mp3", title: "Forsaken Neon", author: "Dimrain47", explicit: false, cover: "track9.jpg" },
    { file: "track10.mp3", title: "FALL FROM THE SKY PT. 2", author: "Romanceplanet, STAKILLAZ", explicit: false, cover: "track10.jpg", links: { spotify:"https://open.spotify.com/track/7tBfGvT74zlqZ8RHQkBSz0?si=d54bea6de3704965", youtube:"https://music.youtube.com/watch?v=_j0zh4vmvaQ&si=f07g_pzxlrGrtB4f", yandex:"https://music.yandex.ru/track/138389049?utm_source=web&utm_medium=copy_link" } },
    { file: "track11.mp3", title: "Biome Fest", author: "C418", cover: "track11.jpg", links: { spotify:"https://open.spotify.com/track/7ozOcSZlwhqqdrCVJiwbpp?si=f8f86c9f493c4a0f", youtube:"https://music.youtube.com/watch?v=KcwaDLQ0j_g&si=LoI0ZIdGnYO4RXdH" } },
    { file: "track12.mp3", title: "Taswell", author: "C418", explicit: false, cover: "track12.jpg", links: { spotify:"https://open.spotify.com/track/6PwVnlNwVKGD18lWNCh1It?si=ff31577ef1a04b05", youtube:"https://music.youtube.com/watch?v=Mj6jF7I2s10&si=9kOqggZYQJZw6xUx" } },
    { file: "track13.mp3", title: "Strad", author: "C418", explicit: false, cover: "track13.jpg", links: { spotify:"https://open.spotify.com/track/6jdrVuAbbvcEbUXy1V2HxM?si=0619054eacf944c2", youtube:"https://music.youtube.com/watch?v=zaUEqJEPTOg&si=q004PzQLSt9zX86I" } },
    { file: "track14.mp3", title: "Dog", author: "C418", explicit: false, cover: "track14.jpg", links: { spotify:"https://open.spotify.com/track/4YLXjoYmRGIXstTLtloHf2?si=eacab8b3e1254603", youtube:"https://music.youtube.com/watch?v=PJVvGvPDLWc&si=gHUumb0a0tyDpezT" } },
    { file: "track15.mp3", title: "otherside", author: "Lena Raine", explicit: false, cover: "track15.jpg", links: { spotify:"https://open.spotify.com/track/4PtJNlcpEGyNAkYy44m5fI?si=ceef2458fea94010", youtube:"https://music.youtube.com/watch?v=kK81m-A3qpU&si=neQBscvCTkeHysiV", yandex:"https://music.yandex.ru/track/93189311?utm_source=web&utm_medium=copy_link" } },
    { file: "track16.mp3", title: "Still Loving You", author: "Scorpions", explicit: false, cover: "track16.jpg", links: { spotify:"https://open.spotify.com/track/5ctrWrTwgy5xLZA4OWgY5O?si=22583fb298f442ea", youtube:"https://music.youtube.com/watch?v=vJrYN-_BXws&si=AcKtrtpDAvZXKA3e", yandex:"https://music.yandex.ru/track/28036311?utm_source=web&utm_medium=copy_link" } },
    { file: "track17.mp3", title: "Lunar Abyss", author: "Lchavasse", explicit: false, cover: "track17.jpg", links: { spotify:"https://open.spotify.com/track/6Cl9JID0QVTYAXiyKaj6QN?si=2178d23cc0ca47fc", youtube:"https://music.youtube.com/watch?v=3fSu6NkFhIw&si=XiwDjwEc1TDcm4hn" } },
    { file: "track18.mp3", title: "ЯḄЬ", author: "AXIUS LIИK", explicit: false, cover: "track18.png", links: { spotify:"https://open.spotify.com/track/78FvkNiJX2tETDQUVKwl1b?si=f0873e2e7971494f", youtube:"https://music.youtube.com/watch?v=ifmY_2T722Q&si=YHbwDvm4d9NCxl-I" } },
    { file: "track19.mp3", title: "Noise", author: "Hensonn", explicit: true, cover: "track19.jpg", links: { spotify:"https://open.spotify.com/track/4wh8h1sAISoAh1hmUs18eF?si=1ce64173fd2141c3", yandex:"https://music.yandex.ru/track/116050467?utm_source=web&utm_medium=copy_link" } },
    { file: "track20.mp3", title: "Tears", author: "Amos Roddy", explicit: false, cover: "track20.jpg", links: { spotify:"https://open.spotify.com/track/37Bx2hUjIOvcNwHRpQhquo?si=6d56798dee9f4e01", youtube:"https://music.youtube.com/watch?v=Eo0QjT7mkzs&si=X_wtRyk8KHlgN28b", yandex:"https://music.yandex.ru/track/138956344?utm_source=web&utm_medium=copy_link" } },
    { file: "track21.mp3", title: "Classic Pursuit", author: "cYsmix", explicit: false, cover: "track21.jpg" },
    { file: "track22.mp3", title: "Lay All Your Love On Me", author: "ABBA", explicit: false, cover: "track22.jpg", links: { spotify:"https://open.spotify.com/track/4euAGZTszWPrriggYK0HG9?si=3e130bc724a74b8a", youtube:"https://music.youtube.com/watch?v=5mHzaIehRTE&si=dbGdH9UPJGcygZcH", yandex:"https://music.yandex.ru/track/25790?utm_source=web&utm_medium=copy_link" } },
    { file: "track23.mp3", title: "Intro", author: "The xx", explicit: false, cover: "track23.png", links: { spotify:"https://open.spotify.com/track/2usrT8QIbIk9y0NEtQwS4j?si=f67c5b259f3f45c7", youtube:"https://music.youtube.com/watch?v=xMV6l2y67rk&si=7oPk2CIZnvFaEAKZ", yandex:"https://music.yandex.ru/track/6679078?utm_source=web&utm_medium=copy_link" } },
    { file: "track24.mp3", title: "The Falling Mysts", author: "Dimrain47", explicit: false, cover: "track24.jpg", links: { spotify:"https://open.spotify.com/track/6RzFdHz8KPuFGu2InU4JoL?si=e5636a27f9544071", youtube:"https://music.youtube.com/watch?v=jc1XkEq6MFA&si=VLyJbbfp4oJZB0aS" } },
    { file: "track25.mp3", title: "Children (Dream Version)", author: "Robert Miles", explicit: false, cover: "track25.jpg", links: { spotify:"https://open.spotify.com/track/7cEkyAXkwXCxTR3IKE0XHu?si=dc82d6552239470e", youtube:"https://music.youtube.com/watch?v=z9b09Ljnh0k&si=bko-th52mDk1XZp-", yandex:"https://music.yandex.ru/track/2409491?utm_source=web&utm_medium=copy_link" } },
    { file: "track26.mp3", title: "Precipice", author: "Aaron Cherof", explicit: false, cover: "track26.jpg", links: { spotify:"https://open.spotify.com/track/2I3SfDBpiBZjAqYm547JF3?si=edb27f03b6564485", youtube:"https://music.youtube.com/watch?v=dEgjOyBwIaE&si=ieX-5OIXxijqfX1H", yandex:"https://music.yandex.ru/track/127914292?utm_source=web&utm_medium=copy_link" } }
];

// const playlists = [
//     { id: 'All', name: 'ShampurRadio', img: 'assets/icons/all.png', color: '#ff9900' },
//     { id: 'Liked', name: 'Понравилось', img: 'assets/icons/liked.png', color: '#ff605e' }
//     // Можно добавить другие, если будут
// ];

// ===== CONFIG =====
const audioFolder = './assets/audio/';
let currentTrackIndex = 0;
let currentPlaylist = 'ShampurRadio';
let likedTracks = JSON.parse(localStorage.getItem('likedTracks')) || [];
let playerSettings = {
  skipExplicit: JSON.parse(localStorage.getItem('skipExplicit')) || false,
  vibeMode: JSON.parse(localStorage.getItem('vibeMode')) || true
};

// ===== DOM =====
const settingsButton = document.getElementById("settingsButton");
const settingsModalOverlay = document.querySelector(".settings-modal-overlay");
const settingsCloseButton = document.querySelector(".settings-modal-close");
const skipExplicitCheckbox = document.getElementById('skipExplicitCheckbox');
const vibeModeCheckbox = document.getElementById('vibeModeCheckbox');

const audioElement     = document.getElementById('audio');
const prevTrackButton  = document.getElementById('prevTrack');
const playPauseBtn     = document.getElementById('playPause');
const nextTrackButton  = document.getElementById('nextTrack');
const volumeInput      = document.getElementById('volume');
const currentTimeSpan  = document.getElementById('currentTime');
const durationSpan     = document.getElementById('duration');
const trackTitleSpan   = document.getElementById('trackTitle');
const trackAuthorSpan  = document.getElementById('trackAuthor');
const playPauseIcon    = document.getElementById('playPauseIcon');
const trackIDSpan      = document.getElementById('trackID');
const trackCover       = document.getElementById('trackCover');
const likeButton       = document.getElementById('likeButton');

const modalOverlay     = document.getElementById('musicModalOverlay');
const modalClose       = document.getElementById('musicModalClose');
const modalTrackCover  = document.getElementById('modalTrackCover');
const modalTitle       = document.getElementById('musicModalTitle');
const modalAuthor      = document.getElementById('musicModalAuthor');
const modalLinks       = document.getElementById('musicModalLinks');

// const playlistNameBtn = document.getElementById('playlistName');
// const playlistModal = document.getElementById('playlistModal');
// const playlistModalOverlay = document.getElementById('playlistModalOverlay');
// const playlistModalClose = document.getElementById('playlistModalClose');
// const playlistList = document.getElementById('playlistList');

const explicitWarningOverlay = document.getElementById('explicitWarningOverlay');
const explicitListenFromStartBtn = document.getElementById('explicitListenFromStart');
const explicitListenAnywayBtn = document.getElementById('explicitListenAnyway');

const likeNotification = document.getElementById('likeNotification');
const copyNotification = document.getElementById('copyNotification');

// ===== UTILS =====
function saveSettings(){
  localStorage.setItem('skipExplicit', JSON.stringify(playerSettings.skipExplicit));
  localStorage.setItem('vibeMode', JSON.stringify(playerSettings.vibeMode));
  localStorage.setItem('likedTracks', JSON.stringify(likedTracks));
}

function showNotification(element, text){
  if(!element) return;
  element.textContent = text;
  element.classList.add('show');
  setTimeout(()=>element.classList.remove('show'),2000);
}

function isLiked(index){ return likedTracks.includes(index); }

function getCurrentTrack(){
  // if(currentPlaylist==='Liked'){
  //   const idx = likedTracks[currentTrackIndex];
  //   return tracks[idx] || tracks[0];
  // }
  return tracks[currentTrackIndex];
}

function updateLikeButton(){
  // const img = likeButton.querySelector('img');
  // if(isLiked(currentPlaylist==='Liked'?likedTracks[currentTrackIndex]:currentTrackIndex)){
  //   img.src='assets/icons/heart-minus.svg';
  // } else {
  //   img.src='assets/icons/heart.svg';
  // }
  const img = likeButton.querySelector('img');
  if(isLiked(currentTrackIndex)){
    img.src = 'assets/icons/heart-minus.svg';
  } else {
    img.src = 'assets/icons/heart.svg';
  }
}

function updateTrackInfo(){
  const track = getCurrentTrack();
  trackTitleSpan.textContent = track.title;
  trackAuthorSpan.textContent = track.author || '';
  trackIDSpan.textContent = currentTrackIndex;
  trackCover.src = track.cover ? `assets/covers/${track.cover}` : 'assets/covers/unknown-track.png';

  // explicit badge
  const existingBadge = trackTitleSpan.querySelector('.explicit-badge');
  if(track.explicit && !existingBadge){
    const badge = document.createElement('img');
    badge.className='explicit-badge';
    badge.src='assets/icons/explicit.png';
    badge.style.width='20px';
    badge.style.height='20px';
    badge.style.marginLeft='8px';
    badge.style.verticalAlign='middle';
    trackTitleSpan.appendChild(badge);
  } else if(!track.explicit && existingBadge) {
    existingBadge.remove();
  }

  updateLikeButton();
}

// ===== LIKE BUTTON =====
likeButton.addEventListener('click',()=>{
  // const trackID = currentPlaylist==='Liked'?likedTracks[currentTrackIndex]:currentTrackIndex;
  // if(isLiked(trackID)){
  //   likedTracks = likedTracks.filter(x=>x!==trackID);
  //   showNotification(likeNotification,'Трек удалён из понравившихся!');
  // } else {
  //   likedTracks.push(trackID);
  //   showNotification(likeNotification,'Трек добавлен в понравившиеся!');
  // }
  // saveSettings();
  // updateLikeButton();
  const trackID = currentTrackIndex;
  if (isLiked(trackID)) {
    likedTracks = likedTracks.filter(x => x !== trackID);
    showNotification(likeNotification,'Трек больше не лайкнут');
  } else {
    likedTracks.push(trackID);
    showNotification(likeNotification,'Вы лайкнули трек');
  }
  saveSettings();
  updateLikeButton();
});

// ===== MODAL TRACK =====
function openModal(){
  const track=getCurrentTrack();
  modalTrackCover.src = track.cover?`assets/covers/${track.cover}`:'assets/covers/unknown-track.png';
  modalTitle.textContent = track.title;
  modalAuthor.textContent = track.author || '';
  modalLinks.innerHTML='';
  if(track.links){
    for(const [service,url] of Object.entries(track.links)){
      const btn=document.createElement('a');
      btn.href=url;
      btn.target="_blank";
      btn.className=`music-modal-button ${service}`;
      const img=document.createElement('img');
      img.src=`assets/icons/${service}.png`;
      img.alt=service;
      btn.appendChild(img);
      const span=document.createElement('span');
      span.textContent=service.charAt(0).toUpperCase()+service.slice(1);
      btn.appendChild(span);
      modalLinks.appendChild(btn);
    }
  } else {
    modalLinks.textContent='У этого трека нет ссылок на сервисы';
  }
  modalOverlay.style.display='flex';
  requestAnimationFrame(()=>modalOverlay.classList.add('active'));
}

function closeModal(){
  modalOverlay.classList.remove('active');
  modalOverlay.addEventListener('transitionend',()=>{modalOverlay.style.display='none';},{once:true});
}

trackTitleSpan.addEventListener('click',openModal);
modalClose.addEventListener('click',closeModal);
modalOverlay.addEventListener('click', e=>{if(e.target===modalOverlay) closeModal();});

// ===== SETTINGS MODAL =====
function openSettingsModal(){
  settingsModalOverlay.style.display='flex';
  settingsModalOverlay.offsetHeight; // reflow
  requestAnimationFrame(()=>settingsModalOverlay.classList.add('active'));
}

function closeSettingsModal(){
  settingsModalOverlay.classList.remove('active');
  settingsModalOverlay.addEventListener('transitionend',function handler(){
    settingsModalOverlay.style.display='none';
    settingsModalOverlay.removeEventListener('transitionend', handler);
  });
}

settingsButton.addEventListener('click',openSettingsModal);
settingsCloseButton.addEventListener('click',closeSettingsModal);
settingsModalOverlay.addEventListener('click',e=>{if(e.target===settingsModalOverlay) closeSettingsModal();});

// ===== PLAYLIST MODAL =====
// playlistNameBtn.addEventListener('click', () => {
//   renderPlaylistModal();
//   playlistModalOverlay.style.display = 'flex';
//   requestAnimationFrame(() => playlistModalOverlay.classList.add('active'));
// });

// function closePlaylistModal() {
//   playlistModalOverlay.classList.remove('active');
//   playlistModalOverlay.addEventListener('transitionend', function handler() {
//     playlistModalOverlay.style.display = 'none';
//     playlistModalOverlay.removeEventListener('transitionend', handler);
//   }, { once: true });
// }

// playlistModalClose.addEventListener('click', () => {
//   playlistModalOverlay.classList.remove('active');
//   playlistModalOverlay.addEventListener('transitionend', () => {
//     playlistModalOverlay.style.display = 'none';
//   }, { once: true });
// });

// playlistModalOverlay.addEventListener('click', e => {
//   if (e.target === playlistModalOverlay) {
//     playlistModalOverlay.classList.remove('active');
//     playlistModalOverlay.addEventListener('transitionend', () => {
//       playlistModalOverlay.style.display = 'none';
//     }, { once: true });
//   }
// });

function renderPlaylistModal() {
  if (typeof playlistList === 'undefined' || !playlistList) return;
  playlistList.innerHTML = '';
  (playlists || []).forEach(pl => {
    const item = document.createElement('div');
    item.className = 'playlist-item';
    item.innerHTML = `
      <img src="${pl.img}" alt="${pl.name}">
      <span>${pl.name}</span>
    `;
    item.addEventListener('click', () => {
      currentPlaylist = pl.id;
      currentTrackIndex = 0;
      loadTrack(true);
      if (typeof playlistNameBtn !== 'undefined' && playlistNameBtn) {
        playlistNameBtn.textContent = pl.name + " ▼";
      }
      if (typeof playlistModalOverlay !== 'undefined' && playlistModalOverlay) {
        playlistModalOverlay.classList.remove('active');
        playlistModalOverlay.addEventListener('transitionend', () => {
          playlistModalOverlay.style.display = 'none';
        }, { once: true });
      }
    });
    playlistList.appendChild(item);
  });
}

// ===== COPY LINK =====
trackIDSpan.addEventListener('click',()=>{
  const link=`${window.location.origin}${window.location.pathname}?track=${currentTrackIndex}`;
  navigator.clipboard.writeText(link)
    .then(()=>showNotification(copyNotification,`Ссылка на трек #${currentTrackIndex} скопирована!`));
});

// ===== CORE =====
function loadTrack(autoPlay = false) {
  let track = getCurrentTrack();

  // Скип Explicit (если включён)
  if (playerSettings.skipExplicit && track.explicit) {
    let tries = 0;
    do {
      currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
      track = getCurrentTrack(); // <-- фикс опечатки
      tries++;
      if (tries > tracks.length) {
        console.warn("Все треки explicit, воспроизведение остановлено");
        audioElement.pause();
        return;
      }
    } while (track.explicit);
  }

  const newSrc = audioFolder + track.file;
  const resolved = new URL(newSrc, window.location.href).href;
  if (audioElement.src !== resolved) {
    audioElement.src = newSrc;
  }

  updateTrackInfo();

  if(autoPlay){
    audioElement.play().catch(console.error);
  }

  applyVibeStyles?.();
}

// ===== TIMERS =====
audioElement.addEventListener('timeupdate',()=>{
  const c=audioElement.currentTime, d=audioElement.duration;
  const mc=Math.floor(c/60), sc=Math.floor(c%60);
  currentTimeSpan.textContent=`${mc<10?'0':''}${mc}:${sc<10?'0':''}${sc}`;
  if(d){
    const md=Math.floor(d/60), sd=Math.floor(d%60);
    durationSpan.textContent=`${md<10?'0':''}${md}:${sd<10?'0':''}${sd}`;
  }
});

audioElement.addEventListener('ended', () => {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  loadTrack(true);
});

audioElement.addEventListener('play',()=>playPauseIcon.src='assets/player/pause.svg');
audioElement.addEventListener('pause',()=>playPauseIcon.src='assets/player/play_arrow.svg');

// ===== CONTROLS =====
playPauseBtn.addEventListener('click',()=>{
  if(audioElement.paused) audioElement.play().catch(console.error);
  else audioElement.pause();
});

// nextTrackButton.addEventListener('click', () => {
//   currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
//   loadTrack(true, 1);
// });

// prevTrackButton.addEventListener('click', () => {
//   if (audioElement.currentTime > 5 && !audioElement.paused) {
//     audioElement.currentTime = 0;
//     updateTrackInfo();
//   } else {
//     currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
//     loadTrack(true, -1);
//   }
// });
nextTrackButton.addEventListener('click', () => {
    do {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    } while (playerSettings.skipExplicit && tracks[currentTrackIndex].explicit);
    loadTrack(true);
});

prevTrackButton.addEventListener('click', () => {
    if (audioElement.currentTime > 5 && !audioElement.paused) {
        audioElement.currentTime = 0;
        updateTrackInfo();
    } else {
        do {
            currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
        } while (playerSettings.skipExplicit && tracks[currentTrackIndex].explicit);
        loadTrack(true);
    }
});

volumeInput.addEventListener('input',()=>{audioElement.volume=volumeInput.value;});

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  // Welcome modal (если есть в верстке)
  const welcomeModalOverlay = document.getElementById('welcomeModalOverlay');
  const continueBtn = document.getElementById('continueBtn');
  const dontShowCheckbox = document.getElementById('dontShowCheckbox');

  if (welcomeModalOverlay && localStorage.getItem('hideWelcomeModal') !== 'true') {
    welcomeModalOverlay.style.display = 'flex';
    requestAnimationFrame(() => {
      welcomeModalOverlay.classList.add('active');
    });
    if (continueBtn) {
      continueBtn.addEventListener('click', () => {
        if (dontShowCheckbox && dontShowCheckbox.checked) {
          localStorage.setItem('hideWelcomeModal', 'true');
        }
        welcomeModalOverlay.classList.remove('active');
        welcomeModalOverlay.addEventListener('transitionend', () => {
          welcomeModalOverlay.style.display = 'none';
        }, { once: true });
      });
    }
  }

  // Чтение трека из URL или случайный
  const fromURL = parseInt(new URLSearchParams(window.location.search).get('track'));
  currentTrackIndex = (fromURL >= 0 && fromURL < tracks.length)
    ? fromURL
    : Math.floor(Math.random() * tracks.length);

  const track = getCurrentTrack();

  // Если включён skipExplicit — просто грузим, логика скипа сработает внутри loadTrack
  if (playerSettings.skipExplicit) {
    loadTrack(true);
  } else {
    // skipExplicit выключен — если трек explicit и пришёл из URL, показываем предупреждение
    if (track.explicit && fromURL >= 0 && fromURL < tracks.length && explicitWarningOverlay) {
      explicitWarningOverlay.style.display = 'flex';

      if (explicitListenFromStartBtn) {
        explicitListenFromStartBtn.onclick = () => {
          currentTrackIndex = findFirstNonExplicitTrackIndex();
          explicitWarningOverlay.style.display = 'none';
          loadTrack(true);
        };
      }

      if (explicitListenAnywayBtn) {
        explicitListenAnywayBtn.onclick = () => {
          explicitWarningOverlay.style.display = 'none';
          loadTrack(true);
        };
      }

      return; // ждём выбор пользователя
    } else {
      loadTrack(true);
    }
  }

  // Инициализация чекбоксов
  if (skipExplicitCheckbox) {
    skipExplicitCheckbox.checked = playerSettings.skipExplicit;
    skipExplicitCheckbox.addEventListener('change', (e)=>{
      playerSettings.skipExplicit = !!e.target.checked;
      saveSettings();
      // Если включили скип и текущий трек explicit — перескочим немедленно
      if (playerSettings.skipExplicit && getCurrentTrack().explicit) {
        loadTrack(!audioElement.paused);
      }
    });
  }

  if (vibeModeCheckbox) {
    vibeModeCheckbox.checked = playerSettings.vibeMode;
    vibeModeCheckbox.addEventListener('change', (e)=>{
      playerSettings.vibeMode = !!e.target.checked;
      saveSettings();
      applyVibeStyles?.();
    });
  }
});

// ============= Помощник для поиска первого не explicit трека ===========
function findFirstNonExplicitTrackIndex() {
  for(let i=0; i<tracks.length; i++){
    if(!tracks[i].explicit) return i;
  }
  return 0; // если все explicit — просто 0
}

function getNextTrackIndex(forward = true) {
    let newIndex = currentTrackIndex;
    let tries = 0;

    do {
        newIndex = forward
            ? (newIndex + 1) % tracks.length
            : (newIndex - 1 + tracks.length) % tracks.length;
        tries++;
        if (tries > tracks.length) return currentTrackIndex; // все explicit
    } while (playerSettings.skipExplicit && tracks[newIndex].explicit);

    return newIndex;
}
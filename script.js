// Инициализация SoundCloud API
SC.initialize({
    client_id: "ivyt-gd",
    redirect_uri: "YOUR_CALLBACK_URL"
  });
  
  // Получение данных о треке
  const trackUrl = "https://soundcloud.com/username/complete-url-to-the-track";
  SC.get("/resolve", { url: trackUrl }, function(track) {
    if (track) {
      const cover = document.querySelector(".cover");
      const title = document.querySelector(".title");
      const author = document.querySelector(".author");
      const duration = document.querySelector(".duration");
  
      cover.src = track.artwork_url || track.user.avatar_url;
      title.textContent = track.title;
      author.textContent = track.user.username;
      duration.textContent = formatDuration(track.duration);
    }
  });
  
  // Функция для форматирования продолжительности трека
  function formatDuration(duration) {
    const seconds = Math.floor(duration / 1000);
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }
  
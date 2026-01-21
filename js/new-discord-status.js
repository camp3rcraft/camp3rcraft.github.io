const USER_ID = "870292480631910411";

function getStatusClass(data) {
    let base = "status-badge ";
    if (data.discord_status === "online") base += "status-online";
    else if (data.discord_status === "idle") base += "status-idle";
    else if (data.discord_status === "dnd") base += "status-dnd";
    else base += "status-invisible"; // offline / invisible
    return base;
}

function formatPlatform(activity) {
    if (!activity.platform) return "";
    if (activity.platform === "desktop") return "💻";
    if (activity.platform === "mobile") return "📱";
    if (activity.platform === "web") return "🌐";
    return "";
}

fetch(`https://api.lanyard.rest/v1/users/${USER_ID}`)
    .then(res => res.json())
    .then(res => {
        const data = res.data;

        // Обновляем аватарку
        const avatarEl = document.getElementById("avatar");
        avatarEl.src = `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.png?size=128`;

        // Статус
        const badgeEl = document.getElementById("status-badge");
        badgeEl.className = getStatusClass(data);
        badgeEl.classList.add("visible");

        // Активности
        const activitiesContainer = document.getElementById("activities-container");
        activitiesContainer.innerHTML = "";

        if (data.activities.length === 0) {
            activitiesContainer.textContent = "Нет активностей";
        } else {
            data.activities.forEach(act => {
                const div = document.createElement("div");
                div.className = "activity";
                div.innerHTML = `<div class="activity-name">${act.name} ${formatPlatform(act)}</div>
                                 <div class="activity-details">${act.details || act.state || ""}</div>`;
                activitiesContainer.appendChild(div);
            });
        }

        // Плавное появление блока активностей
        activitiesContainer.classList.add("visible");

    })
    .catch(err => {
        const activitiesContainer = document.getElementById("activities-container");
        activitiesContainer.textContent = "Ошибка загрузки данных";
        activitiesContainer.classList.add("visible");
        console.error(err);
    });

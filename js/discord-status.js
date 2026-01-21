const USER_ID = "870292480631910411";

async function fetchRPC() {
    const errorBox = document.getElementById('errorBox');
    const activityBlock = document.getElementById('activityBlock');

    try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${USER_ID}`);
        if (!res.ok) throw new Error(`Ошибка API: ${res.status} ${res.statusText}`);
        const { data } = await res.json();

        errorBox.style.display = 'none';

        if (!data.activities || data.activities.length === 0) {
            activityBlock.style.display = 'none';
            return;
        }

        activityBlock.style.display = 'block';
        activityBlock.innerHTML = '';

        // Берём максимум 2 активности (самые новые)
        const activities = data.activities.slice(0, 2);

        activities.forEach((activity, index) => {
            // Large image
            let largeURL = '';
            if (activity.assets && activity.assets.large_image) {
                largeURL = activity.assets.large_image.startsWith("spotify:")
                    ? `https://i.scdn.co/image/${activity.assets.large_image.split(":")[1]}`
                    : `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`;
            }

            // Small image
            let smallURL = '';
            if (activity.assets && activity.assets.small_image) {
                smallURL = activity.assets.small_image.startsWith("spotify:")
                    ? `https://i.scdn.co/image/${activity.assets.small_image.split(":")[1]}`
                    : `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.small_image}.png`;
            }

            // Создаём карточку
            const div = document.createElement('div');
            div.className = 'rpc-activity-card presence-card';
            if (index > 0) div.style.marginTop = '15px'; // Отступ между карточками

            div.innerHTML = `
                <div class="activity-header">
                    <div class="icon-container">
                        ${largeURL ? `<img class="activity-icon" src="${largeURL}" alt="${activity.assets?.large_text || ''}" title="${activity.assets?.large_text || ''}">` : ''}
                        ${smallURL ? `<img class="small-image" src="${smallURL}" alt="${activity.assets?.small_text || ''}" title="${activity.assets?.small_text || ''}">` : ''}
                    </div>
                    <div class="activity-info">
                        <h2 class="activity-title">${activity.name}</h2>
                        ${activity.details ? `<p class="content-text" style="font-size: 0.8em">${activity.details}</p>` : ''}
                        ${activity.state ? `<p class="content-text state-text" style="font-size: 0.6em">${activity.state}</p>` : ''}
                    </div>
                </div>
            `;

            // Логика времени (замени только эту часть в цикле forEach)
            if (activity.timestamps?.start) {
                const startTime = activity.timestamps.start;
                const endTime = activity.timestamps.end;
                
                const timeContainer = document.createElement('div');
                timeContainer.className = 'time-container';
                timeContainer.style.cssText = 'margin-top: 8px; font-family: JetBrains Mono; font-size: 15px;';
                
                const updateTime = () => {
                    const now = Date.now();
                    const elapsedMs = now - startTime;
                    
                    // Время прошедшее (всегда ЧЧ:ММ:СС)
                    const elapsedHours = Math.floor(elapsedMs / 3600000);
                    const elapsedMinutes = Math.floor((elapsedMs % 3600000) / 60000);
                    const elapsedSeconds = Math.floor((elapsedMs % 60000) / 1000);
                    const elapsedStr = `${elapsedHours}:${elapsedMinutes.toString().padStart(2,'0')}:${elapsedSeconds.toString().padStart(2,'0')}`;

                    if (endTime) {
                        const totalMs = endTime - startTime;
                        const percent = Math.min(100, (elapsedMs / totalMs) * 100);
                        
                        // ПРОШЕДШЕЕ ВРЕМЯ (без ведущего нуля для часов): 2:29
                        const elapsedHoursDisplay = elapsedHours || '';
                        const elapsedStrDisplay = elapsedHoursDisplay + (elapsedHours ? ':' : '') + `${elapsedMinutes.toString().padStart(2,'0')}:${elapsedSeconds.toString().padStart(2,'0')}`;
                        
                        // ОБЩЕЕ ВРЕМЯ ТРЕКА (только ММ:СС): 03:47
                        const totalMinutes = Math.floor(totalMs / 60000);
                        const totalSeconds = Math.floor((totalMs % 60000) / 1000);
                        const totalStr = `${totalMinutes.toString().padStart(2,'0')}:${totalSeconds.toString().padStart(2,'0')}`;

                        timeContainer.innerHTML = `
                            <div style="display: flex; align-items: center; gap: 12px; color: #ffffff; font-weight: 500; font-family: JetBrains Mono">
                                <span style="min-width: 70px; text-align: right; font-family: JetBrains Mono">${elapsedStrDisplay}</span>
                                <div style="flex: 1; height: 3px; background: rgba(255,255,255,0.15); border-radius: 3px; overflow: hidden; min-width: 200px;">
                                    <div style="height: 100%; width: ${percent}%; background: linear-gradient(90deg, #ffffff, #ffffff); border-radius: 3px; transition: width 0.5s ease; box-shadow: 0 0 8px rgba(56, 150, 80, 0.4);"></div>
                                </div>
                                <span style="min-width: 70px; text-align: left; font-family: JetBrains Mono">${totalStr}</span>
                            </div>
                        `;
                    } else {
                        // Только зелёное время
                        timeContainer.innerHTML = `<p style="color: #3d9e60; margin: 0; font-family: JetBrains Mono">${elapsedStr}</p>`;
                    }
                };
                
                setInterval(updateTime, 1000);
                updateTime();
                
                div.querySelector('.activity-info').appendChild(timeContainer);
            }

            activityBlock.appendChild(div);
        });

    } catch (err) {
        console.error(err);
        errorBox.textContent = `Ошибка: ${err.message}`;
        errorBox.style.display = 'block';
        activityBlock.style.display = 'none';
    }
}

setInterval(fetchRPC, 5000);
fetchRPC();

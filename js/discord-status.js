const USER_ID = "870292480631910411";

async function fetchRPC() {
    const errorBox = document.getElementById('errorBox');
    const activityBlock = document.getElementById('activityBlock');

    try {
        const cacheBust = new Date().getTime();
        const res = await fetch(`https://api.lanyard.rest/v1/users/${USER_ID}?_=${cacheBust}`);
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
        // Large image — БЕЗ прокси!
        let largeURL = '';
        if (activity.assets && activity.assets.large_image) {
            const largeImage = activity.assets.large_image;
            
            if (largeImage.startsWith("spotify:")) {
                largeURL = `https://i.scdn.co/image/${largeImage.split(":")[1]}`;
            } else if (largeImage.startsWith("mp:external/")) {
                const httpsPart = largeImage.split('/https/')[1];
                if (httpsPart) {
                    largeURL = 'https://' + httpsPart.replace(/\/1000x1000$/, '/300x300'); // ПРЯМАЯ!
                }
            } else {
                largeURL = `https://cdn.discordapp.com/app-assets/${activity.application_id}/${largeImage}.png`;
            }
        }

        // Small image
        let smallURL = '';
        if (activity.assets && activity.assets.small_image) {
            const smallImage = activity.assets.small_image;
            
            console.log('🔍 RAW smallImage:', smallImage);   // ДИАГНОСТИКА
            
            if (smallImage.startsWith("spotify:")) {
                smallURL = `https://i.scdn.co/image/${smallImage.split(":")[1]}`;
            } else if (smallImage.startsWith("mp:external/")) {
                const httpsPart = smallImage.split('/https/')[1];
                console.log('🔍 small httpsPart:', httpsPart);  // ДИАГНОСТИКА
                
                if (httpsPart) {
                    let cleanUrl = 'https://' + httpsPart;
                    if (cleanUrl.includes('cdn.discordapp.com')) {
                        smallURL = cleanUrl.split('?')[0];
                    } else {
                        smallURL = `https://media.discordapp.net/external/${encodeURIComponent(cleanUrl)}/60x60.png`;
                    }
                    console.log('✅ FINAL smallURL:', smallURL);  // ДИАГНОСТИКА
                }
            } else {
                smallURL = `https://cdn.discordapp.com/app-assets/${activity.application_id}/${smallImage}.png`;
            }
            
            console.log('🎯 ИТОГ smallURL:', smallURL);       // ДИАГНОСТИКА
        }

            // Создаём карточку
            const div = document.createElement('div');
            div.className = 'rpc-activity-card presence-card';
            if (index > 0) div.style.marginTop = '15px'; // Отступ между карточками

            div.innerHTML = `
                <div class="activity-header">
                    <div class="icon-container">
                        ${largeURL ? `<img class="activity-icon" src="${largeURL}" alt="${activity.assets?.large_text || ''}" title="${activity.assets?.large_text || ''}" onerror="this.src='assets/icons/yandex.jpg'">` : ''}
                        ${smallURL ? `<img class="small-image" src="${smallURL}" alt="${activity.assets?.small_text || ''}" title="${activity.assets?.small_text || ''}">` : ''}
                    </div>
                    <div class="activity-info">
                        <h2 class="activity-title">${activity.name}</h2>
                        ${activity.details ? `<p class="content-text" style="font-size: 0.8em">${activity.details}</p>` : ''}
                        ${activity.state ? `<p class="content-text state-text" style="font-size: 0.6em">${activity.state}</p>` : ''}
                    </div>
                </div>
            `;

            if (activity.timestamps?.start) {
                const startTime = activity.timestamps.start;
                const endTime = activity.timestamps.end;

                const timeContainer = document.createElement('div');
                timeContainer.className = 'time-container';
                timeContainer.style.cssText = `
                    margin-top: 8px;
                    font-family: JetBrains Mono;
                    font-size: 15px;
                    width: 100%;
                `;

                const updateTime = () => {
                    const now = Date.now();
                    const elapsedMs = now - startTime;

                    const elapsedHours = Math.floor(elapsedMs / 3600000);
                    const elapsedMinutes = Math.floor((elapsedMs % 3600000) / 60000);
                    const elapsedSeconds = Math.floor((elapsedMs % 60000) / 1000);

                    if (endTime) {
                        const totalMs = endTime - startTime;
                        const percent = Math.min(100, (elapsedMs / totalMs) * 100);

                        // прошедшее время (без ведущего 0 у часов)
                        const elapsedStr =
                            (elapsedHours ? elapsedHours + ':' : '') +
                            `${elapsedMinutes.toString().padStart(2, '0')}:${elapsedSeconds
                                .toString()
                                .padStart(2, '0')}`;

                        // общее время (ММ:СС)
                        const totalMinutes = Math.floor(totalMs / 60000);
                        const totalSeconds = Math.floor((totalMs % 60000) / 1000);
                        const totalStr = `${totalMinutes
                            .toString()
                            .padStart(2, '0')}:${totalSeconds
                            .toString()
                            .padStart(2, '0')}`;

                        timeContainer.innerHTML = `
                            <div style="
                                display: flex;
                                align-items: center;
                                gap: 8px;
                                color: #ffffff;
                                font-weight: 500;
                                width: 120%;
                                margin-left: -12%;
                            ">
                                <span style="
                                    font-family: JetBrains Mono;
                                    width: 70px;
                                    text-align: right;
                                    flex-shrink: 0;
                                ">
                                    ${elapsedStr}
                                </span>

                                <div style="
                                    flex: 1;
                                    height: 4px;
                                    background: rgba(255,255,255,0.15);
                                    border-radius: 4px;
                                    overflow: hidden;
                                ">
                                    <div style="
                                        height: 100%;
                                        width: ${percent}%;
                                        background: linear-gradient(90deg, #ffffff, #ffffff);
                                        transition: width 0.5s ease;
                                        box-shadow: 0 0 10px rgba(56, 150, 80, 0.5);
                                    "></div>
                                </div>

                                <span style="
                                    font-family: JetBrains Mono;
                                    width: 55px;
                                    text-align: left;
                                    flex-shrink: 0;
                                ">
                                    ${totalStr}
                                </span>
                            </div>
                        `;
                    } else {
                        // если нет endTime — просто таймер
                        const elapsedStr = `${elapsedHours}:${elapsedMinutes
                            .toString()
                            .padStart(2, '0')}:${elapsedSeconds
                            .toString()
                            .padStart(2, '0')}`;

                        timeContainer.innerHTML = `
                            <p style="
                                font-family: JetBrains Mono;
                                color: #3d9e60;
                                margin: 0;
                                font-family: JetBrains Mono;
                                font-weight: 900;
                            ">
                                ${elapsedStr}
                            </p>
                        `;
                    }
                };

                updateTime();
                setInterval(updateTime, 1000);
                
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

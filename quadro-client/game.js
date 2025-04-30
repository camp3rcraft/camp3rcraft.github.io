class Game {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 1200;
        this.canvas.height = 800;
        
        // Инициализация звуков
        this.sounds = {
            chat: new Audio('sounds/chat-send.mp3'),
            join: new Audio('sounds/joined-sound.ogg'),
            leave: new Audio('sounds/left-sound.ogg')
        };
        
        this.players = new Map();
        this.localPlayer = null;
        this.socket = null;
        this.map = null;
        this.showPlayerList = false;
        this.playerMessages = new Map();
        this.messageTimers = new Map();
        
        this.keys = {
            a: false,
            d: false,
            space: false,
            shift: false,
            tab: false
        };
        
        // Для отладки
        this.lastPingTime = 0;
        this.ping = 0;
        this.fps = 0;
        this.lastFpsUpdate = 0;
        this.frameCount = 0;
        
        this.acceleration = 1.2; // ускорение
        this.deceleration = 1.0; // торможение
        this.maxSpeed = 7; // максимальная скорость
        
        this.setupEventListeners();
    }
    
    async loadMap() {
        try {
            const response = await fetch('map.json');
            if (!response.ok) {
                throw new Error('Failed to load map');
            }
            this.map = await response.json();
        } catch (error) {
            // Если не удалось загрузить карту, используем встроенную
            this.map = {
                width: 800,
                height: 600,
                platforms: [
                    { x: 0, y: 550, width: 800, height: 50, color: "#4a4a4a" },
                    { x: 100, y: 400, width: 200, height: 20, color: "#8b4513" },
                    { x: 500, y: 400, width: 200, height: 20, color: "#8b4513" },
                    { x: 300, y: 300, width: 200, height: 20, color: "#8b4513" },
                    { x: 100, y: 200, width: 200, height: 20, color: "#8b4513" },
                    { x: 500, y: 200, width: 200, height: 20, color: "#8b4513" }
                ]
            };
        }
    }
    
    setupEventListeners() {
        document.getElementById('connect-btn').addEventListener('click', () => this.connect());
        document.getElementById('disconnect-btn').addEventListener('click', () => this.disconnect());
        document.getElementById('debug-checkbox').addEventListener('change', (e) => {
            document.getElementById('debug-info').style.display = e.target.checked ? 'block' : 'none';
        });
        
        // Управление чатом
        const chatInput = document.getElementById('chat-input');
        const chatSend = document.getElementById('chat-send');
        const killBtn = document.getElementById('kill-btn');
        if (killBtn) {
            killBtn.addEventListener('click', () => {
                if (this.map && this.map.spawn && this.localPlayer) {
                    this.localPlayer.x = this.map.spawn.x;
                    this.localPlayer.y = this.map.spawn.y;
                    this.localPlayer.velocityX = 0;
                    this.localPlayer.velocityY = 0;
                }
                if (this.socket && this.socket.readyState === WebSocket.OPEN) {
                    this.socket.send(JSON.stringify({ type: 'kill' }));
                }
            });
        }
        chatSend.addEventListener('click', () => this.sendChatMessage(chatInput));
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendChatMessage(chatInput);
            }
        });
        
        document.addEventListener('keydown', (e) => {
            // Не реагируем на управление, если фокус в чате
            if (document.activeElement === chatInput) return;
            // Сброс всех клавиш при смене раскладки
            if (['Shift', 'Alt', 'Control', 'Meta'].includes(e.key)) {
                resetKeys();
                return;
            }
            if (e.code === 'KeyA') this.keys.a = true;
            if (e.code === 'KeyD') this.keys.d = true;
            if (e.code === 'Space') this.keys.space = true;
            if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') this.keys.shift = true;
            if (e.code === 'Tab') {
                e.preventDefault();
                this.keys.tab = true;
                this.showPlayerList = true;
            }
        });
        
        document.addEventListener('keyup', (e) => {
            // Не реагируем на управление, если фокус в чате
            if (document.activeElement === chatInput) return;
            if (e.code === 'KeyA') this.keys.a = false;
            if (e.code === 'KeyD') this.keys.d = false;
            if (e.code === 'Space') this.keys.space = false;
            if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') this.keys.shift = false;
            if (e.code === 'Tab') {
                this.keys.tab = false;
                this.showPlayerList = false;
            }
        });

        // Сброс всех клавиш при завершении композиции (смена раскладки)
        window.addEventListener('compositionend', resetKeys);

        // Сброс всех клавиш при потере фокуса окна или ухода с input чата
        const resetKeys = () => {
            this.keys.a = false;
            this.keys.d = false;
            this.keys.space = false;
            this.keys.shift = false;
            // Сразу отправляем на сервер пустой input
            if (this.socket && this.socket.readyState === WebSocket.OPEN) {
                this.socket.send(JSON.stringify({
                    type: 'input',
                    keys: this.keys
                }));
            }
        };
        window.addEventListener('blur', resetKeys);
        // Сброс только при уходе во вкладку
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                resetKeys();
            }
        });
        // При возвращении во вкладку ничего не делаем
        window.addEventListener('focus', () => {
            // Не сбрасываем клавиши
        });
    }
    
    connect() {
        const nickname = document.getElementById('nickname').value;
        const serverIp = document.getElementById('server-ip').value;
        const color = document.getElementById('player-color').value;
        
        if (!nickname.match(/^[a-zA-Z]+$/)) {
            alert('Nickname should contain only English letters');
            return;
        }
        
        console.log('Connecting to server...');
        this.socket = new WebSocket(`ws://${serverIp}:8080`);
        
        this.socket.onopen = () => {
            console.log('WebSocket connection established');
            console.log('Chat input before connection:', document.getElementById('chat-input').disabled);
            this.socket.send(JSON.stringify({
                type: 'join',
                nickname,
                color
            }));
            
            // Воспроизводим звук подключения
            this.sounds.join.play().catch(e => console.log('Error playing join sound:', e));
            
            // Скрываем экран авторизации и показываем игровой интерфейс
            document.querySelector('.login-screen').style.display = 'none';
            document.getElementById('game-canvas').style.display = 'block';
            document.querySelector('.chat-container').classList.add('connected');
            document.getElementById('disconnect-btn').classList.add('connected');
            
            this.lastPingTime = Date.now();
            this.gameLoop();
        };
        
        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Received message type:', data.type);
            
            if (data.type === 'join') {
                if (data.map) {
                    this.map = data.map;
                }
                if (data.playerId) {
                    this.localPlayerId = String(data.playerId);
                    const chatInput = document.getElementById('chat-input');
                    const chatSend = document.getElementById('chat-send');
                    console.log('Chat input before activation:', chatInput.disabled);
                    if (chatInput) {
                        chatInput.disabled = false;
                        chatInput.removeAttribute('disabled');
                        chatInput.value = '';
                        console.log('Chat input after activation:', chatInput.disabled);
                    }
                    if (chatSend) {
                        chatSend.disabled = false;
                        console.log('Chat send button after activation:', chatSend.disabled);
                    }
                }
            }
            
            if (data.type === 'state') {
                this.players = new Map(Object.entries(data.players));
                if (this.localPlayerId && this.players.has(this.localPlayerId)) {
                    this.localPlayer = this.players.get(this.localPlayerId);
                } else {
                    this.localPlayer = this.players.values().next().value;
                }
            }
            
            if (data.type === 'pong') {
                this.ping = Date.now() - this.lastPingTime;
                this.lastPingTime = Date.now();
            }
            
            // Логика для чата и системных сообщений
            if (data.type === 'chat') {
                const chatMessages = document.getElementById('chat-messages');
                const div = document.createElement('div');
                div.textContent = `[${data.sender}] ${data.message}`;
                chatMessages.appendChild(div);
                chatMessages.scrollTop = chatMessages.scrollHeight;
                // Воспроизвести звук отправки
                if (this.sounds && this.sounds.chat) {
                    this.sounds.chat.play().catch(e => console.log('Error playing chat sound:', e));
                }
                // Показать сообщение над игроком
                if (data.senderId) {
                    this.showMessageAbovePlayer(data.senderId, data.message);
                }
            }
        };
        
        this.socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
        
        this.socket.onclose = () => {
            console.log('[GAME] Disconnected');
            if (window.showDisconnectModal) {
                window.showDisconnectModal('Connection closed');
            } else {
                alert('Connection closed');
                location.reload();
            }
        };

        // Гарантируем рабочие обработчики чата
        const chatInput = document.getElementById('chat-input');
        const chatSend = document.getElementById('chat-send');
        chatSend.addEventListener('click', () => this.sendChatMessage(chatInput));
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') this.sendChatMessage(chatInput);
        });
    }
    
    disconnect() {
        if (this.socket) {
            // Воспроизводим звук отключения
            this.sounds.leave.play().catch(e => console.log('Error playing leave sound:', e));
            this.socket.close();
            // Показываем экран авторизации и скрываем игровой интерфейс
            document.querySelector('.login-screen').style.display = 'flex';
            document.getElementById('game-canvas').style.display = 'none';
            document.querySelector('.chat-container').classList.remove('connected');
            document.getElementById('disconnect-btn').classList.remove('connected');
        }
    }
    
    updateDebugInfo() {
        const debugInfo = document.getElementById('debug-info');
        if (!debugInfo) return;
        
        const now = Date.now();
        this.frameCount++;
        
        if (now - this.lastFpsUpdate >= 1000) {
            this.fps = this.frameCount;
            this.frameCount = 0;
            this.lastFpsUpdate = now;
        }
        
        const serverIp = document.getElementById('server-ip').value;
        const playersCount = this.players.size;
        const x = this.localPlayer ? Math.round(this.localPlayer.x) : 0;
        const y = this.localPlayer ? Math.round(this.localPlayer.y) : 0;
        
        debugInfo.innerHTML = `
            IP: ${serverIp}<br>
            Ping: ${this.ping}ms<br>
            FPS: ${this.fps}<br>
            Players: ${playersCount}<br>
            Position: (${x}, ${y})
        `;
    }
    
    drawPlatforms() {
        if (!this.map || !this.localPlayer) return;
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;

        // Заливка фона
        if (this.map.background) {
            this.ctx.fillStyle = this.map.background;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        } else {
            this.ctx.fillStyle = '#1a1a1a';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }

        this.map.platforms.forEach(platform => {
            if (platform.type === 'text') {
                this.ctx.save();
                this.ctx.font = `${platform.size || 24}px Arial`;
                this.ctx.fillStyle = platform.color || '#fff';
                this.ctx.textAlign = 'center';
                this.ctx.translate(
                    platform.x - this.localPlayer.x + centerX,
                    platform.y - this.localPlayer.y + centerY
                );
                if (platform.angle) this.ctx.rotate(platform.angle * Math.PI / 180);
                this.ctx.fillText(platform.text || '', 0, 0);
                this.ctx.restore();
                return;
            }
            // Используем только platform.color
            this.ctx.fillStyle = platform.color || '#4a4a4a';
            const x = platform.x - this.localPlayer.x + centerX - 16;
            const y = platform.y - this.localPlayer.y + centerY - 16;
            this.ctx.fillRect(x, y, platform.width, platform.height);
            // Тень (опционально)
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            this.ctx.fillRect(x, y + platform.height - 2, platform.width, 2);
        });
    }
    
    drawPlayer(player, centerX, centerY) {
        const x = player.x - this.localPlayer.x + centerX - 16;
        const y = player.y - this.localPlayer.y + centerY - 16;
        this.ctx.fillStyle = player.color;
        this.ctx.fillRect(x, y, 32, 32);
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        this.ctx.fillRect(x, y + 32 - 2, 32, 2);
        this.ctx.font = '12px Arial';
        this.ctx.fillStyle = '#ffffff';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(player.nickname, x + 16, y - 5);

        // Рисуем сообщение над игроком, если оно есть
        if (this.playerMessages.has(player.id)) {
            const message = this.playerMessages.get(player.id);
            this.ctx.font = '14px Arial';
            this.ctx.fillStyle = '#ffffff';
            this.ctx.textAlign = 'center';
            
            // Добавляем тень для лучшей читаемости
            this.ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
            this.ctx.shadowBlur = 2;
            this.ctx.shadowOffsetX = 1;
            this.ctx.shadowOffsetY = 1;
            
            this.ctx.fillText(message, x + 16, y - 25);
            
            // Сбрасываем тень
            this.ctx.shadowColor = 'transparent';
            this.ctx.shadowBlur = 0;
            this.ctx.shadowOffsetX = 0;
            this.ctx.shadowOffsetY = 0;
        }
    }
    
    drawPlayerList() {
        if (!this.showPlayerList) return;

        const canvasWidth = this.canvas.width;
        const barHeight = 60;
        const startY = 40;

        // Фон — полоса во всю ширину
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, startY, canvasWidth, barHeight);

        // Получаем игроков в массив
        const playersArr = Array.from(this.players.values());
        const blockWidth = 260;
        const blockHeight = 40;
        const gap = 30;
        const totalWidth = playersArr.length * blockWidth + (playersArr.length - 1) * gap;
        let startX = (canvasWidth - totalWidth) / 2;
        const blockY = startY + (barHeight - blockHeight) / 2;

        // Заголовок по центру
        this.ctx.font = 'bold 22px Arial';
        this.ctx.fillStyle = '#fff';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Список игроков', canvasWidth / 2, startY - 10);

        // Информация о сервере, игроках и пинге
        const serverIp = document.getElementById('server-ip')?.value || '';
        const playersCount = this.players.size;
        const ping = this.ping;
        const infoText = `IP: ${serverIp}    |    Игроков: ${playersCount}    |    Ваш пинг: ${ping}мс`;
        this.ctx.font = '16px Arial';
        this.ctx.fillStyle = '#bbb';
        this.ctx.fillText(infoText, canvasWidth / 2, startY + barHeight + 25);

        // Рисуем каждого игрока
        playersArr.forEach((player, idx) => {
            const x = startX + idx * (blockWidth + gap);
            // Блок
            this.ctx.fillStyle = 'rgba(30,30,30,0.95)';
            this.ctx.fillRect(x, blockY, blockWidth, blockHeight);
            // Цветной квадратик
            this.ctx.fillStyle = player.color;
            this.ctx.fillRect(x + 15, blockY + 10, 20, 20);
            // Ник и пинг
            this.ctx.font = 'bold 18px Arial';
            this.ctx.fillStyle = '#fff';
            this.ctx.textAlign = 'left';
            this.ctx.fillText(player.nickname, x + 45, blockY + 27);
            this.ctx.font = '14px Arial';
            this.ctx.fillStyle = '#aaa';
            const ping = player.id === this.localPlayerId ? this.ping + 'ms' : '?ms';
            this.ctx.fillText(ping, x + blockWidth - 50, blockY + 27);
        });
    }
    
    drawMapBorder() {
        if (!this.map || !this.map.width || !this.map.height || !this.localPlayer) return;
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        // Смещение камеры
        const offsetX = this.localPlayer.x - centerX + 16;
        const offsetY = this.localPlayer.y - centerY + 16;
        // Анимация цвета: плавное мигание между белым и красным
        const t = (performance.now() / 700) % (2 * Math.PI);
        const r = Math.floor(255 * (0.5 + 0.5 * Math.sin(t)));
        const g = Math.floor(255 * (0.5 + 0.5 * Math.cos(t)));
        const b = Math.floor(255 * (0.5 + 0.5 * Math.sin(t + Math.PI)));
        // Микс белого и красного
        const color = `rgb(${255},${g},${g})`;
        this.ctx.save();
        this.ctx.lineWidth = 6;
        this.ctx.strokeStyle = color;
        this.ctx.shadowColor = color;
        this.ctx.shadowBlur = 10;
        this.ctx.strokeRect(-offsetX, -offsetY, this.map.width, this.map.height);
        this.ctx.restore();
    }
    
    gameLoop() {
        // ОТКЛЮЧЕНО: Локальная физика и обработка джампадов/гравипадов
        // Теперь клиент только отображает localPlayer по данным сервера

        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify({
                type: 'input',
                keys: this.keys
            }));
        }

        this.drawPlatforms();
        this.drawPlayerList();

        // Белый border по краю карты
        this.ctx.strokeStyle = '#fff';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.localPlayer) {
            const centerX = this.canvas.width / 2;
            const centerY = this.canvas.height / 2;
            // Гарантируем, что localPlayer всегда отрисовывается
            this.drawPlayer(this.localPlayer, centerX, centerY);
            // Остальные игроки (если есть)
            this.players.forEach((player, id) => {
                if (id !== this.localPlayerId) {
                    this.drawPlayer(player, centerX, centerY);
                }
            });
            this.drawMapBorder();
        }

        this.updateDebugInfo();
        
        // Коллизии между игроками
        for (const player of this.players.values()) {
            if (player.id === this.localPlayerId) continue;
            const dx = this.localPlayer.x - player.x;
            const dy = this.localPlayer.y - player.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 32) { // 32 = 16 + 16 (радиусы игроков)
                const angle = Math.atan2(dy, dx);
                const overlap = 32 - distance;
                this.localPlayer.x += Math.cos(angle) * overlap * 0.5;
                this.localPlayer.y += Math.sin(angle) * overlap * 0.5;
                player.x -= Math.cos(angle) * overlap * 0.5;
                player.y -= Math.sin(angle) * overlap * 0.5;
            }
        }
        
        requestAnimationFrame(() => this.gameLoop());
    }

    sendChatMessage(chatInput) {
        const message = chatInput.value.trim();
        if (message && this.socket && this.socket.readyState === WebSocket.OPEN) {
            // Ограничение длины сообщения
            const maxLength = 30;
            const shortMessage = message.length > maxLength ? message.substring(0, maxLength) + '...' : message;
            this.socket.send(JSON.stringify({
                type: 'chat',
                message: shortMessage
            }));
            chatInput.value = '';
            // Воспроизвести звук отправки
            if (this.sounds && this.sounds.chat) {
                this.sounds.chat.play().catch(e => console.log('Error playing chat sound:', e));
            }
            // Показать сообщение над игроком
            if (this.localPlayerId) {
                this.showMessageAbovePlayer(this.localPlayerId, shortMessage);
            }
        }
    }

    showMessageAbovePlayer(playerId, message) {
        // Ограничиваем длину сообщения
        const maxLength = 30;
        const shortenedMessage = message.length > maxLength ? 
            message.substring(0, maxLength) + '...' : message;
        
        // Устанавливаем сообщение
        this.playerMessages.set(playerId, shortenedMessage);
        
        // Очищаем предыдущий таймер, если он есть
        if (this.messageTimers.has(playerId)) {
            clearTimeout(this.messageTimers.get(playerId));
        }
        
        // Устанавливаем новый таймер для удаления сообщения через 5 секунд
        this.messageTimers.set(playerId, setTimeout(() => {
            this.playerMessages.delete(playerId);
            this.messageTimers.delete(playerId);
        }, 5000));
    }

    render() {
        // Заливка фона
        if (this.map.background) {
            this.ctx.fillStyle = this.map.background;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        } else {
            this.ctx.fillStyle = '#1a1a1a';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }

        // Отрисовка платформ
        for (const platform of this.map.platforms) {
            this.ctx.save();
            if (platform.type === 'text') {
                this.ctx.font = `${platform.size || 16}px Arial`;
                this.ctx.fillStyle = platform.color || '#fff';
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.save();
                this.ctx.translate(platform.x, platform.y);
                this.ctx.rotate((platform.angle || 0) * Math.PI / 180);
                this.ctx.fillText(platform.text || '', 0, 0);
                this.ctx.restore();
            } else {
                this.ctx.fillStyle = platform.color || '#4a4a4a';
                this.ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
            }
            this.ctx.restore();
        }
    }
}

window.onload = () => {
    window.gameInstance = new Game();
}; 